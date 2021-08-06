import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar';
import {handleSuccess, handleError} from '../../CustomAlerts';
const initialFieldValues = {
    userId: 0,
    password: '',
    name: '',
    email: '',
    emailConfirmed : false,
    phoneNumber: '',
    phoneNumberConfirmed : false,
    status: true,
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString(),
    roleId: 3
}
export default function DeliveryUserList(props) {
    const [deliveryUserList, setDeliveryUserList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (recordForEdit !== null)
            setValues(recordForEdit);
    }, [recordForEdit])

    const handleInputChange = e => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    const validate = () => {
        let temp = {}
        temp.name = values.name === "" ? false : true;
        temp.email = values.email === "" ? false : true;
        temp.password = values.password === "" ? false : true;
        temp.status = values.status === "0" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData()
            formData.append('userId', values.userId)
            formData.append('password', values.password)
            formData.append('name', values.name)
            formData.append('email', values.email)
            formData.append('emailConfirmed', values.emailConfirmed)
            formData.append('phoneNumber', values.phoneNumber)
            formData.append('phoneNumberConfirmed', values.phoneNumberConfirmed)
            formData.append('createdDate', values.createdDate)
            formData.append('updatedDate', values.updatedDate)
            formData.append('roleId', parseInt(values.roleId))
            formData.append('status', values.status)
            console.log(values)
            console.log(1)
            addOrEdit(formData, resetForm)
        }
    }
    const applicationAPI = (url = 'https://service.perfumatory.shop/api/user/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            create: newRecord => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('userId') === "0") {
            applicationAPI().create(formData)
                .then(res => {
                    handleSuccess("New User Added");
                    resetForm();
                    refreshDeliveryUserList();
                })
        }
        else {
            applicationAPI().update(formData.get('userId'), formData)
                .then(res => {
                     handleSuccess("User Details Updated");
                    resetForm();
                    refreshDeliveryUserList();
                })
        }
    }
    const showEditDetails = data => {
        setRecordForEdit(data)
    }
    const onDelete = (e, id) => {
        if (window.confirm('Are you sure to delete this record?'))
            applicationAPI().delete(id)
                .then(res => {
                     handleSuccess("User Deleted Succesfully");
                    refreshDeliveryUserList()
                })
                .catch(err => handleError("User Deleted Failed"))
    }
    const resetForm = () => {
        setValues(initialFieldValues)
    }
    function refreshDeliveryUserList() {
        applicationAPI().fetchAll()
            .then(res => setDeliveryUserList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshDeliveryUserList();
    })
    const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' form-control-danger' : '')
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Users List</span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">User Details</h6>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('name')} name="name" type="text" value={values.name} onChange={handleInputChange} />
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('email')} name="email" type="text" value={values.email} onChange={handleInputChange} />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('phoneNumber')} name="phoneNumber" type="text" value={values.phoneNumber} onChange={handleInputChange} />
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('password')} name="password" type="password" value={values.password} onChange={handleInputChange} />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <select value={values.status} onChange={handleInputChange} className="form-control" name="status">
                                                <option value="true">active</option>
                                                <option value="false">inactive</option>
                                            </select>
                                            <label htmlFor="status">Status</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4">
                                            <button type="submit" className="btn btn-primary mr-3">Submit</button>
                                            <button type="button" className="btn btn-danger" onClick={resetForm}>Cancel</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="table-responsive product-list">
                        <table className="table table-bordered table-striped mt-3" id="deliveryUserList">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveryUserList.map(duser =>
                                    <tr key={duser.userId}>
                                        <td>{duser.name}</td>
                                        <td>{duser.email}</td>
                                        <td>{duser.phoneNumber}</td>
                                        <td>{duser.status ? "active" : "inactive"}</td>
                                        <td>
                                            <button className="btn btn-success mr-2" onClick={() => { showEditDetails(duser) }}><i className="fa fa-pencil" /></button>
                                            <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(duser.userId))}><i className="fas fa-trash" /></button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}   
    