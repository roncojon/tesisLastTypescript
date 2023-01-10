import { Modal } from '@mui/material'
import React from 'react'
import ExamsResultsTable from '../components/ExamResultsTable'

const ExamResultsModal = ({open,data,onClose, /* children , */ ...rest}) => {
  
  return (
    <Modal 
    open={open} 
    onClose={onClose}
    {...rest}
    >
    <ExamsResultsTable data={data } onClose={onClose}/>
    </Modal>
  )
}

export default ExamResultsModal
