import React from 'react'
import Modal from '../uiComponents/Modal'
import AddressForm from './AddressForm'

const AddressFormContainer = () => {
  return (
    <Modal addressForm>
        <AddressForm />
    </Modal>
  )
}

export default AddressFormContainer