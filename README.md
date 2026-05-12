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

# Usage

## Basic File Upload

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [file, selectFile, clearFile] = useFileUpload()

  return (
    <div>
      <button
        onClick={() => {
          // Single File Upload
          selectFile()
        }}
      >
        Click to Upload
      </button>
      <button onClick={clearFile}>Clear</button>

      {file ? (
        <div>
          <img src={file.source} alt='preview' />
          <span> Name: {file.name} </span>
          <span> Size: {file.size} </span>
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
  )
}
```

## Working with selected file

If you want to perform other tasks with the selected file you can pass the callback which returns `{source, name, size, file }`.

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [file, selectFile] = useFileUpload()

  return (
    <div>
      <button
        onClick={() => {
          // Single File Upload
          selectFile({}, ({ source, name, size, file }) => {
            // file - is the raw File Object
            console.log({ source, name, size, file })
            // Todo: Upload to cloud.
          })
        }}
      >
        Click to Upload
      </button>

      {file ? (
        <div>
          <img src={file.source} alt='preview' />
          <span> Name: {file.name} </span>
          <span> Size: {file.size} </span>
        </div>
      ) : (
        <span>No file selected</span>
      )}
    </div>
  )
}

export default App
```

## Multiple Files Upload

Select multiple files at a go.

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [files, selectFiles] = useFileUpload()

  return (
    <div>
      <button
        onClick={() => {
          // Single File Upload
          selectFiles({ multiple: true }, (files) => {
            // Note callback return an array
              files.map(({ source, name, size, file }) =>{
                console.log({ source, name, size, file })
              })
            // Todo: Upload to cloud.
          }))
        }}
      >
        Click to Upload
      </button>

      {files ? (
        files.map((file) => (
          <div>
            <img src={file.source} alt='preview' />
            <span> Name: {file.name} </span>
            <span> Size: {file.size} </span>
          </div>
        ))
      ) : (
        <span>No file selected</span>
      )}
    </div>
  )
}

export default App
```

> Note: `callback` and `files` return an array for multiple files select.

<br/>

## Setting Allowed File type

Restrict what types of files can be selected using the `accept` option.It Support all file extensions or MIME types

```jsx
import React from 'react'
import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [file, selectFile] = useFileUpload()

  return (
    <div>
      <button
        onClick={() => {
          // Single File Upload accepts only images
          selectFile({ accept: 'image/*' }, ({ source, name, size, file }) => {
            // file - is the raw File Object
            console.log({ source, name, size, file })
            // Todo: Upload to cloud.
          })
        }}
      >
        Click to Upload
      </button>

      {file ? (
        <div>
          <img src={file.source} alt='preview' />
          <span> Name: {file.name} </span>
          <span> Size: {file.size} </span>
        </div>
      ) : (
        <span>No file selected</span>
      )}
    </div>
  )
}

export default App
```

## License

MIT © [Marvinified](https://github.com/Marvinified)
