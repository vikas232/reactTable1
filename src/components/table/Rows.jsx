import React from 'react'
import './style.css'
import { TableCell, TableRow } from './style'
const Rows = ({ rowsdata, headerdata }) => {
  return (
    <TableRow  >
      {
        headerdata.map(item => (
          <TableCell even key={item.id}> {rowsdata[item.header]} </TableCell>
        ))
      }
    </TableRow>
  )
}

export default Rows