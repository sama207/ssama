import { React, Fragment, useState } from 'react';
import AddCompanyBtn from './AddCompanyBtn';
import jsonData from './mock-data.json';
import './Style.css';
import { BsFillBackspaceFill, BsFillPenFill,BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import Table1 from './Table1';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
function AddCompany() {
	const [editFormData, setEditFormData] = useState({
		compname: "",
		email: "",
		address: "",
		phone: "",
		comptype: ""
	})
	const [companyData, setCompanyData] = useState(jsonData);
	const [EditcompanyDataId, setEditcompanyDataId] = useState(null);
	const [companyDataLength, setCompanyDataLength] = useState(companyData.length + 1);
	const [search, setSearch] = useState('');
	const [order, setOrder] = useState("ASC");


	const handleDeleteClick = (companyDataId) => {
		const newCompanyData = [...companyData];

		const index = companyData.findIndex((companyData) => companyData.id === companyDataId);

		newCompanyData.splice(index, 1);

		setCompanyData(newCompanyData);

	}
	const sorting = (col) => {
		if (order === "ASC") {
			const sorted = [...companyData].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setCompanyData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...companyData].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setCompanyData(sorted);
			setOrder("ASC");
		}
	}
	const handleEditFromSubmit = (event) => {
		event.preventDefault();
		const editedCompanyData = {
			id: EditcompanyDataId,
			compname: editFormData.compname,
			email: editFormData.email,
			address: editFormData.address,
			phone: editFormData.phone,
			comptype: editFormData.comptype
		};
		if (editFormData.compname === "") alert("enter company name");
		else if (editFormData.email === "") alert("enter company email");
		else if (editFormData.address === "") alert("enter company address");
		else if (editFormData.phone === "") alert("enter company phone");
		else if (editFormData.comptype === "") alert("enter company type");
		else {
			const newCompanyData = [...companyData]
			const index = companyData.findIndex((companyData) => companyData.id === EditcompanyDataId);
			newCompanyData[index] = editedCompanyData;
			setCompanyData(newCompanyData);
			setEditcompanyDataId(null);
		}
	}
	const handleCancelClick = () => {
		setEditcompanyDataId(null);
	}
	const handleEditFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		setEditFormData(newFormData);
	}
	const handleEditClick = (event, companyData) => {
		event.preventDefault();

		setEditcompanyDataId(companyData.id);
		const formValues = {
			compname: companyData.compname,
			email: companyData.email,
			address: companyData.address,
			phone: companyData.phone,
			comptype: companyData.comptype
		}

		setEditFormData(formValues)
	};
	const tableRows = companyData.filter
		((item) => {
			return (search.toLowerCase() === '') ||
				(search.toUpperCase() === '') ? item :
				(item.compname.toLowerCase().includes(search)) ||
				(item.compname.toUpperCase().includes(search))
		}
		).map((companyData) => {
			return (
				<>
					<Fragment>
						{EditcompanyDataId === companyData.id
							? (
								
								<tr>
									<td> <input type="text" name="compname" defaultValue={editFormData.compname} onChange={handleEditFormChange} /></td>
					
					
									<td> <input type="text" name="email" defaultValue={editFormData.email} onChange={handleEditFormChange} /></td>
					
					
									<td> <input type="text" name="address" defaultValue={editFormData.address} onChange={handleEditFormChange} /></td>
					
					
									<td> <input type="text" name="phone" defaultValue={editFormData.phone} onChange={handleEditFormChange} /></td>
					
									<td> <input type="text" name="comptype" defaultValue={editFormData.comptype} onChange={handleEditFormChange} /></td>
					
									<td className="TD2">
										<BsFillBookmarkCheckFill onClick={handleEditFromSubmit} />
									</td>
					
									<td className="TD2">
										<MdCancel onClick={handleCancelClick} />
									</td>
					
								</tr>
							)
							: (
								<tr key={companyData.id}>
									<td data-table="compname" >{companyData.compname}</td>
									<td data-table="email" >{companyData.email}</td>
									<td data-table="address" >{companyData.address}</td>
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
					</Fragment>
				</>
			);
		});
	const addRows = (data) => {
		setCompanyDataLength(companyDataLength + 1);
		data.id = companyDataLength;
		const updatedcompanyData = [...companyData];
		updatedcompanyData.push(data);
		setCompanyData(updatedcompanyData);
	};
	return (
		<div className='list'>
			<Card className='tableCard'>
				<Card.Header>
					<h1>
						Companies
					</h1>
					<br />
					<section className='listbar'>
						<div className='container-fluclassName Btns' >
							<div className='row'>

								<div className='col lg-4 md-4  sm-4 addPro'>
									<AddCompanyBtn name="Add Company" func={addRows} />
								</div>
								<div className='col lg-8 md-8 sm-8 searchForm'>
									<Form.Control
										type="search"
										placeholder="search for a company by its name"
										className="me-2"
										aria-label="Search"
										onChange={(e) => setSearch(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</section>
					<br />
				</Card.Header>
				<Card.Body>
					<Table1 th1="Name" th2="Email" th3="Address" th4="Phone" th5="Comptype"
						TableRowsFunc={tableRows}
					/>
				</Card.Body>
			</Card>
		</div>
	);
};
export default AddCompany;
