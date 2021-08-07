import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from './Header';
import Sidebar from './Sidebar';


const initialFieldValues = {
    bottleId: 0,
    bottleName: '',
    status: true,
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString(),
    userId: 1
}
export default function Bottles(props) {
    const [bottleList, setBottleList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])


    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const validate = () => {
        let temp = {}
        temp.bottleName = values.bottleName == "" ? false : true;
        temp.status = values.status == "0" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData()
            formData.append('bottleId', values.bottleId)
            formData.append('bottleName', values.bottleName)
            formData.append('createdDate', values.createdDate)
            formData.append('updatedDate', values.updatedDate)
            formData.append('userId', parseInt(values.userId))
            formData.append('status', values.status)
            console.log(values)
            addOrEdit(formData, resetForm)
        }
    }
    const applicationAPI = (url = 'https://papi.perfumatory.shop/api/bottle/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            create: newRecord => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('bottleId') == "0") {
            applicationAPI().create(formData)
                .then(res => {
                    console.log(res);
                    handleSuccess("New Bottle Size Added");
                    resetForm();
                    refreshCategoryList();
                })
        }
        else {
            applicationAPI().update(formData.get('bottleId'), formData)
                .then(res => {
                    handleSuccess("Bottle Size Details Updated");
                    resetForm();
                    refreshCategoryList();
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
                    handleSuccess("Bottle Size Deleted Succesfully");
                    refreshCategoryList()
                })
                .catch(err => handleError("Bottle Size Deleted Failed"))
    }
    const resetForm = () => {
        setValues(initialFieldValues)
    }
    function refreshCategoryList() {
        applicationAPI().fetchAll()
            .then(res => setBottleList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshCategoryList();
    }, [])
    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' form-control-danger' : '')
    return (
        <div className="container-fluid">
        <Header />
        <div className="row main-content">
            <div className="col-sm-3 col-xs-6 sidebar pl-0">
                <Sidebar />
            </div>
            <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                    <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Bottles Size List</span>
                    <div className="row mt-3">
                        <div className="col-sm-12">
                            <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                <h6 className="mb-3">Bottle Size Details</h6>                                
                                <div className="form-group row floating-label">
                                    <div className="col-sm-4 col-12">
                                    <input className={"form-control" + applyErrorClass('bottleName')} name="bottleName" type="text" value={values.bottleName} onChange={handleInputChange} />
                                    <label htmlFor="bottleName">Bottle Size</label>
                                    </div>
                                    <div className="col-sm-4">
                                        <select value={values.status} onChange={handleInputChange} className="form-control">
                                            <option value="true">active</option>
                                            <option value="false">inactive</option>
                                        </select>
                                        <label htmlFor="status">Status</label>
                                    </div>
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
                    <table className="table table-bordered table-striped mt-3" id="categoryList">
                        <thead>
                            <tr>
                                <th>Bottle Size</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bottleList.map(bottle =>
                                <tr key={bottle.bottleId}>
                                    <td>{bottle.bottleName}</td>
                                    <td>{bottle.status ? "active" : "inactive"}</td>
                                    <td>
                                        <button className="btn btn-success mr-2" onClick={() => { showEditDetails(bottle) }}><i className="fa fa-pencil" /></button>
                                        <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(bottle.bottleId))}><i className="fas fa-trash" /></button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
                <div className="row mt-5 mb-4 footer">
                    <div className="col-sm-8">
                        <span>All rights reserved ©  2020 by Perfumatory</span>
                    </div>
                    <div className="col-sm-4 text-right">
                        <a href="#" className="ml-2">Contact Us</a>
                        <a href="#" className="ml-2">Support</a>
                    </div>
                </div>
                {/*Footer*/}
            </div>
    )
}