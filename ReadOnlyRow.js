import React from 'react'
import './Style.css'
import { BsFillBackspaceFill, BsFillPenFill } from "react-icons/bs";
const ReadOnlyRow = ({ Data, handleEditClick, handleDeleteClick }) => {
    return (
        <tr key={companyData.id}>
            <td data-table="compname" >{Data.compname}</td>
            <td data-table="email" >{Data.email}</td>
            <td data-table="address" >{Data.address}</td>
            <td data-table="phone" >{companyData.phone}</td>
            <td data-table="comptype" >{companyData.comptype}</td>
            <td data-table="actions" className="TD2">
                <BsFillPenFill onClick={(event) => handleEditClick(event, companyData)} />
            </td>
            <td data-table="actions" className="TD2">
                <BsFillBackspaceFill onClick={() => handleDeleteClick(companyData.id)} />
            </td>
        </tr>
    )
}
export default ReadOnlyRow;
