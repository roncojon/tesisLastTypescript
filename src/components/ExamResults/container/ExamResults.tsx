import React from 'react'
import ExamsResultsTable from '../components/ExamResultsTable'

const ExamResults = ({data,onClose}) => {
  return (
    <ExamsResultsTable data={data } onClose={onClose}/>
  )
}

export default ExamResults
