import { useState } from "react"

interface ModalResponse {
  show: boolean
  message: string
}

const INITIAL_STATE: ModalResponse = {
  show: false,
  message: "",
}

interface UseErrorModalActions {
  resetState: () => void
  startModalResponse: (message: string) => void
}

type UseModalResponseData = [
  state: ModalResponse,
  actions: UseErrorModalActions
]

export const useResponseModal = (): UseModalResponseData => {
  const [modalData, setModalErrorData] = useState<ModalResponse>(INITIAL_STATE)

  const resetState = () => {
    setModalErrorData(INITIAL_STATE)
  }

  const startModalResponse = (message: string) => {
    setModalErrorData({
      message,
      show: true,
    })
  }

  return [modalData, { resetState, startModalResponse }]
}
