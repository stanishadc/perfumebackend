import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from './Header';
import Sidebar from './Sidebar';

const userId=localStorage.getItem("userId");
const initialFieldValues = {
    collectionId: 0,
    collectionName: '',
    status: true,
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString(),
    userId: userId
}
export default function CollectionList(props) {
    const [collectionList, setCollectionList] = useState([])
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
        temp.collectionName = values.collectionName == "" ? false : true;
        temp.status = values.status == "0" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData()
            formData.append('collectionId', values.collectionId)
            formData.append('collectionName', values.collectionName)
            formData.append('createdDate', values.createdDate)
            formData.append('updatedDate', values.updatedDate)
            formData.append('userId', parseInt(userId))
            formData.append('status', values.status)
            console.log(values.status)
            addOrEdit(formData, resetForm)
        }
    }
    const applicationAPI = (url = 'http://www.api.perfumatory.shop/api/collection/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            create: newRecord => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('collectionId') == "0") {
            applicationAPI().create(formData)
                .then(res => {
                    handleSuccess("New Collection Added");
                    refreshCollectionList();
                    resetForm();
                })
        }
        else {
            applicationAPI().update(formData.get('collectionId'), formData)
                .then(res => {
                    handleSuccess("Collection Details Updated");
                    refreshCollectionList();
                    resetForm();
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
                    if (res.data.status == "Success") {
                        handleSuccess("Collection Deleted Succesfully");
                    }
                    else {
                        handleError("Collection Delete Failed")
                    }
                    refreshCollectionList()
                })
                .catch(err => handleError("Collection Deleted Failed"))
    }
    const resetForm = () => {
        setValues(initialFieldValues)
    }
    function refreshCollectionList() {
        applicationAPI().fetchAll()
            .then(res => setCollectionList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshCollectionList();
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
                    <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Collection List</span>
                    <div className="row mt-3">
                        <div className="col-sm-12">
                            <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                <h6 className="mb-3">Collection Details</h6>
                                <div className="form-group row floating-label">
                                    <div className="col-sm-4 col-12">
                                        <input className={"form-control" + applyErrorClass('collectionName')} name="collectionName" type="text" value={values.collectionName} onChange={handleInputChange} />
                                        <label htmlFor="collectionName">Collection Name</label>
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
                    <table className="table table-bordered table-striped mt-3" id="collectionList">
                        <thead>
                            <tr>
                                <th>Collection Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collectionList.map(collection =>
                                <tr key={collection.collectionId}>
                                    <td>{collection.collectionName}</td>
                                    <td>{collection.status ? "active" : "inactive"}</td>
                                    <td>
                                        <button className="btn btn-success mr-2" onClick={() => { showEditDetails(collection) }}><i className="fa fa-pencil" /></button>
                                        <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(collection.collectionId))}><i className="fas fa-trash" /></button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                </div>
</div></div>
    )
}