import { React } from 'react'
import { Table } from 'react-bootstrap';
import { TbSortAscendingLetters, TbSortAscendingNumbers } from "react-icons/tb";
const Table1 = (props, { Col1,Col2, Col3, Col4, Col5, Sorting }) => {
 
  return (
    <Table striped className="tab">
      <thead>
        <th>{props.th1}<TbSortAscendingLetters className='icon' onClick={() =>  Sorting(Col1) } /></th>
        <th>{props.th2}<TbSortAscendingLetters className='icon' onClick={() => { Sorting(Col2) }} /></th>
        <th>{props.th3}<TbSortAscendingLetters className='icon' onClick={() => { Sorting(Col3) }} /></th>
        <th>{props.th4}<TbSortAscendingNumbers className='icon' onClick={() => { Sorting(Col4) }} /></th>
        <th>{props.th5}<TbSortAscendingLetters className='icon' onClick={() => { Sorting(Col5) }} /></th>
        <th></th>
        <th></th>
      </thead>
      <tbody>{props.TableRowsFunc}</tbody>
    </Table>
  )
}
export default Table1;