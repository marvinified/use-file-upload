declare module 'use-file-upload' {
  type FileUpload = {
    source: string
    name: string
    size: number
    file: File
  }

  type Callback = (file: FileUpload | FileUpload[]) => void

  type UploadOptions = {
    accept?: string
    multiple?: boolean
  }

  export const useFileUpload: () => [
    FileUpload | FileUpload[] | null,
    (options?: UploadOptions, callback?: Callback) => void
  ]
}
