import React from 'react'
import { BaseModal, BaseModalProps } from './BaseModal'

interface ModalProps extends BaseModalProps { }

export const Modal: React.FC<ModalProps> = (props) => {
  return (
    <BaseModal {...props} />
  )
}