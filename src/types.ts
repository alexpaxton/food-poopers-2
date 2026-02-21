export type ToastType = 'success' | 'info' | 'error'

export type ToastCore = {
  type: ToastType
  dismissable: boolean
  heading: string
  body?: string
  fullScreen?: boolean
  emoji?: string
}

export type StatefulToast = ToastCore & {
  dismissed: boolean
}
