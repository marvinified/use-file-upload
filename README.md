# 📂 use-file-upload

React hooks library to add highly customisable file uploads into your react application.

[![NPM](https://img.shields.io/npm/v/use-file-upload.svg)](https://www.npmjs.com/package/use-file-upload) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add use-file-upload
# or
npm install --save use-file-upload
```

## Compatibility

- Node.js `>=18`
- React `>=16.8.0 <20`

## Fork Demo on Codesandbox

[![Edit usestate-useeffect](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/use-file-upload-jrbe2)


## Basic Usage

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [file, selectFile, clearFile] = useFileUpload()

  return (
    <div>
      <button onClick={selectFile}>Click to Upload</button>
      <button onClick={clearFile}>Clear</button>

      {file && !Array.isArray(file) ? (
        <div>
          <img src={file.source} alt='preview' />
          <span>Name: {file.name}</span>
          <span>Size: {file.size}</span>
        </div>
      ) : (
        <span>No file selected</span>
      )}
    </div>
  )
}

export default App
```

## Detect cancel and clear selected files

You can detect when users close the picker without selecting a file and clear state manually.

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [file, selectFile, clearFile] = useFileUpload()

  return (
    <div>
      <button
        onClick={() =>
          selectFile(
            { accept: 'image/*', onCancel: () => console.log('Selection cancelled') },
            (selectedFile) => console.log(selectedFile)
          )
        }
      >
        Pick file
      </button>
      <button onClick={clearFile}>Clear</button>
    </div>
  )
}
```

## Working with selected file

If you want to perform other tasks with the selected file, pass a callback. The callback can receive `null` when no file is selected.

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [file, selectFile] = useFileUpload()

  return (
    <button
      onClick={() =>
        selectFile({ accept: 'image/*' }, (selectedFile) => {
          if (!selectedFile || Array.isArray(selectedFile)) return

          const { source, name, size, file } = selectedFile
          console.log({ source, name, size, file })
        })
      }
    >
      Click to Upload
    </button>
  )
}
```

## Multiple Files Upload

Select multiple files at once.

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [files, selectFiles] = useFileUpload()

  return (
    <div>
      <button
        onClick={() =>
          selectFiles({ multiple: true }, (selectedFiles) => {
            if (!Array.isArray(selectedFiles)) return

            selectedFiles.forEach(({ source, name, size, file }) => {
              console.log({ source, name, size, file })
            })
          })
        }
      >
        Click to Upload
      </button>

      {Array.isArray(files) && files.length > 0 ? (
        files.map((file) => (
          <div key={file.source}>
            <img src={file.source} alt='preview' />
            <span>Name: {file.name}</span>
            <span>Size: {file.size}</span>
          </div>
        ))
      ) : (
        <span>No files selected</span>
      )}
    </div>
  )
}

export default App
```

## Setting allowed file types

Restrict what types of files can be selected using the `accept` option. It supports file extensions and MIME types.

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [file, selectFile] = useFileUpload()

  return (
    <button
      onClick={() =>
        selectFile({ accept: '.png,.jpg,image/*' }, (selectedFile) => {
          if (!selectedFile || Array.isArray(selectedFile)) return
          console.log(selectedFile)
        })
      }
    >
      Click to Upload
    </button>
  )
}
```

## License

MIT © [Marvinified](https://github.com/Marvinified)
