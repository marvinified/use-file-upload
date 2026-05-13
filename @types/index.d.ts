declare module 'use-file-upload' {
  type FileUpload = {
    source: string
    name: string
    size: number
    file: File
  }

  type Callback = (file: FileUpload | FileUpload[] | null) => void
  type CancelCallback = () => void

  type UploadOptions = {
    accept?: string
    multiple?: boolean
    onCancel?: CancelCallback
  }

  export const useFileUpload: () => [
    FileUpload | FileUpload[] | null,
    (options?: UploadOptions, callback?: Callback) => void,
    () => void
  ]
}
