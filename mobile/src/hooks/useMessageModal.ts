import { useState } from 'react'

interface ModalError {
  show: boolean
  message: string
}

const INITIAL_STATE: ModalError = {
  show: false,
  message: '',
}

interface UseErrorModalActions {
  resetState: () => void
  startMessageModal: (message: string) => void
}

type UseErrorModalData = [state: ModalError, actions: UseErrorModalActions]

export const useMessageModal = (): UseErrorModalData => {
  const [modalData, setModalMessageData] = useState<ModalError>(INITIAL_STATE)

  const resetState = () => {
    setModalMessageData(INITIAL_STATE)
  }

  const startMessageModal = (message: string) => {
    setModalMessageData({
      message,
      show: true,
    })
  }

  return [modalData, { resetState, startMessageModal }]
}
