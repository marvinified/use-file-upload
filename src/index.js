import { useState } from 'react'
// import styles from './styles.module.css'

function createInputComponent({ multiple, accept }) {
  const el = document.createElement('input')
  // set input config
  el.type = 'file'
  el.accept = accept
  el.multiple = multiple
  // return file input element
  return el
}

export const useFileUpload = () => {
  const [files, setFiles] = useState(null)
  const clearFiles = () => setFiles(null)

  // Handle upload
  const uploadFile = (
    { accept = '', multiple = false, onCancel } = {
      accept: '',
      multiple: false,
      onCancel: undefined
    },
    cb
  ) => {
    const userCallback = typeof cb === 'function' ? cb : () => {}
    const cancelCallback = typeof onCancel === 'function' ? onCancel : () => {}
    let isSelectionMade = false
    let focusTimeout

    // create virtual input element
    const inputEL = createInputComponent({ multiple, accept })

    const cleanup = () => {
      inputEL.removeEventListener('change', onChange)
      window.removeEventListener('focus', onFocus, true)
      if (focusTimeout) {
        clearTimeout(focusTimeout)
      }
      inputEL.remove()
    }

    const onChange = (e) => {
      isSelectionMade = true
      const target = e.target
      const selectedFiles = Array.from(target.files || [])
      const parsedFiles = selectedFiles.map((file) => ({
        source: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file // original file object
      }))

      cleanup()

      if (target.multiple) {
        setFiles(parsedFiles)
        userCallback(parsedFiles)
        return
      }

      setFiles(parsedFiles[0] || null)
      userCallback(parsedFiles[0] || null)
    }

    const onFocus = () => {
      // Allow the file picker change event to fire before treating focus as cancel.
      focusTimeout = setTimeout(() => {
        if (!isSelectionMade) {
          cleanup()
          cancelCallback()
        }
      }, 300)
    }

    // add event listener
    inputEL.addEventListener('change', onChange)
    window.addEventListener('focus', onFocus, true)
    inputEL.click()
  }

  return [files, uploadFile, clearFiles]
}
