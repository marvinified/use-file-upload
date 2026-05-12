import { useState } from 'react'
import { useFileUpload } from 'use-file-upload'

const DEFAULT_AVATAR =
  'https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png'

const TABS = [
  { id: 'single', label: 'Single file' },
  { id: 'multiple', label: 'Multiple files' },
  { id: 'images', label: 'Images only' },
  { id: 'cancel', label: 'Cancel handling' }
]

function normalizeFiles(value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function formatSize(sizeInBytes) {
  if (typeof sizeInBytes !== 'number') return '-'
  if (sizeInBytes < 1024) return `${sizeInBytes} B`
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function App() {
  const [activeTab, setActiveTab] = useState('single')
  const [statusText, setStatusText] = useState('')

  const [singleFile, pickSingleFile, clearSingleFile] = useFileUpload()
  const [multipleFiles, pickMultipleFiles, clearMultipleFiles] = useFileUpload()
  const [imageFiles, pickImageFiles, clearImageFiles] = useFileUpload()
  const [cancelFile, pickWithCancel, clearCancelFile] = useFileUpload()

  const filesByTab = {
    single: normalizeFiles(singleFile),
    multiple: normalizeFiles(multipleFiles),
    images: normalizeFiles(imageFiles),
    cancel: normalizeFiles(cancelFile)
  }

  const uploadedFiles = filesByTab[activeTab]
  const previewImage = uploadedFiles[0]?.source || DEFAULT_AVATAR

  const uploadByTab = {
    single: () => {
      setStatusText('')
      pickSingleFile({}, (file) => {
        setStatusText(file ? '1 file selected' : 'No file selected')
      })
    },
    multiple: () => {
      setStatusText('')
      pickMultipleFiles({ multiple: true }, (files) => {
        const selectedCount = normalizeFiles(files).length
        setStatusText(`${selectedCount} files selected`)
      })
    },
    images: () => {
      setStatusText('')
      pickImageFiles({ accept: 'image/*', multiple: true }, (files) => {
        const selectedCount = normalizeFiles(files).length
        setStatusText(`${selectedCount} image files selected`)
      })
    },
    cancel: () => {
      setStatusText('')
      pickWithCancel(
        {
          accept: 'image/*',
          onCancel: () => setStatusText('File picker closed without selection')
        },
        (file) => setStatusText(file ? `Selected: ${file.name}` : 'No file selected')
      )
    }
  }

  const clearByTab = {
    single: clearSingleFile,
    multiple: clearMultipleFiles,
    images: clearImageFiles,
    cancel: clearCancelFile
  }

  const descriptionByTab = {
    single: 'Default config: select one file',
    multiple: 'Config: { multiple: true }',
    images: 'Config: { accept: "image/*", multiple: true }',
    cancel: 'Config: { accept: "image/*", onCancel }'
  }

  return (
    <main className='app'>
      <h1 className='title'>use-file-upload examples</h1>
      <div className='tabs'>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id)
              setStatusText('')
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <img className='preview' src={previewImage} alt='preview avatar' />

      <div className='actions'>
        <button className='button' onClick={uploadByTab[activeTab]}>
          Select files
        </button>
        <button className='button button-secondary' onClick={clearByTab[activeTab]}>
          Clear
        </button>
      </div>

      <div className='meta'>
        <p className='config'>{descriptionByTab[activeTab]}</p>
        {statusText ? <p className='status'>{statusText}</p> : null}
        {uploadedFiles.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <ul className='file-list'>
            {uploadedFiles.map((file, index) => (
              <li key={`${file.name}-${index}`} className='file-item'>
                <span className='file-name'>{file.name}</span>
                <span className='file-size'>{formatSize(file.size)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
