import { Modal } from '@mui/material'
import React from 'react'
import ExamsResultsTable from '../components/ExamResultsTable'

const ExamResultsModal = ({ open, data, onClose, /* children , */ ...rest }) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      {...rest}
    >
      {data ?
        <ExamsResultsTable data={data} onClose={onClose} />
        :
        <h2>No se encuentran usuarios en este examen</h2>
      }
    </Modal>
  )
}

export default ExamResultsModal
