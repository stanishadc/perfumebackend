import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from './Header';
import Sidebar from './Sidebar';
import moment from 'moment';
const defaultProductImage = "/assets/img/default-avatar.jpg";
const initialFieldValues = {
    brandId: 0,
    brandName: '',
    brandWebsite: '',
    brandImage: '',
    imageSrc: defaultProductImage,
    imageFile: null,
    status: true,
    createdDate: moment().format(),
    updatedDate: moment().format(),
    userId: 1
}
export default function BrandsList(props) {
    const [brandList, setBrandList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultProductImage
            })
        }
    }
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const validate = () => {
        let temp = {}
        temp.brandName = values.brandName == "" ? false : true;
        temp.imageSrc = values.imageSrc == defaultProductImage ? false : true;
        temp.status = values.status == "0" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }
    const handleSubmit = e => {
        e.preventDefault();

        if (validate()) {
            console.log(values.createdDate);
            const formData = new FormData()
            formData.append('brandId', values.brandId)
            formData.append('brandName', values.brandName)
            formData.append('brandWebsite', values.brandWebsite)
            formData.append('brandImage', values.brandImage)
            formData.append('createdDate', values.createdDate)
            formData.append('updatedDate', values.updatedDate)
            formData.append('userId', parseInt(values.userId))
            formData.append('status', values.status)
            formData.append('imageFile', values.imageFile)

            addOrEdit(formData, resetForm)
        }
    }
    const applicationAPI = (url = 'https://perfumeapi.azurewebsites.net/api/brand/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            create: newRecord => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    const addOrEdit = (formData, onSuccess) => {

        if (formData.get('brandId') == "0") {
            applicationAPI().create(formData)
                .then(res => {
                    console.log(res);
                    if (res.data.status == "Success") {
                        handleSuccess("New Brand Added");
                    }
                    else {
                        handleError("Brand Adding Failed")
                    }
                    refreshBrandList();
                    resetForm();
                })
                .catch(err => console.log(err))
        }
        else {
            applicationAPI().update(formData.get('brandId'), formData)
                .then(res => {console.log(res)
                    if (res.data.status == "Success") {
                        handleSuccess("Brand Details Updated");
                    }
                    else {
                        handleError("Brand Update Failed")
                    }
                    refreshBrandList();
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
                        handleSuccess("Brand Deleted Succesfully");
                    }
                    else {
                        handleError("Brand Delete Failed")
                    }
                    refreshBrandList()
                })
                .catch(err => handleError("Brand Deleted Failed"))
    }
    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
    }
    function refreshBrandList() {
        applicationAPI().fetchAll()
            .then(res => setBrandList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshBrandList();
    }, [])
    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' form-control-danger' : '')
    return (
        <div>
            <div className="container-fluid">
                <Header />
                <div className="row main-content">
                    <div className="col-sm-3 col-xs-6 sidebar pl-0">
                        <Sidebar />
                    </div>
                    <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                            <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Brands List</span>
                            <div className="row mt-3">
                                <div className="col-sm-12">
                                    <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                        <h6 className="mb-3">Brands Details</h6>
                                        <div className="form-group">
                                            <div className="col-sm-4 col-12">
                                                <div className="picture-container">
                                                    <div className="picture">
                                                        <img src={values.imageSrc} className="picture-src" width="200px" height="200px" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-4 col-12">
                                                <input id="image-uploader" className={"form-control-file" + applyErrorClass('imageSrc')} type="file" accept="image/*" onChange={showPreview} />
                                            </div>
                                        </div>
                                        <div className="form-group row floating-label">
                                            <div className="col-sm-4 col-12">
                                                <input className={"form-control" + applyErrorClass('brandName')} name="brandName" type="text" value={values.brandName} onChange={handleInputChange} />
                                                <label htmlFor="brandName">Brand Name</label>
                                            </div>
                                            <div className="col-sm-4 col-12">
                                                <input className={"form-control" + applyErrorClass('brandWebsite')} name="brandWebsite" type="text" value={values.brandWebsite} onChange={handleInputChange} />
                                                <label htmlFor="brandWebsite">Brand Website</label>
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
                            <table className="table table-bordered table-striped mt-3" id="brandsList">
                                <thead>
                                    <tr>
                                        <th width="6%">Image</th>
                                        <th>Brand Name</th>
                                        <th>Brand Website</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brandList.map(brand =>
                                        <tr key={brand.brandId}>
                                            <td><img src={brand.imageSrc} width="80px" alt={brand.brandName} /></td>
                                            <td>{brand.brandName}</td>
                                            <td>{brand.brandWebsite}</td>
                                            <td>{brand.status ? "active" : "inactive"}</td>
                                            <td>
                                                <button className="btn btn-success mr-2" onClick={() => { showEditDetails(brand) }}><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(brand.brandId))}><i className="fas fa-trash" /></button></td>
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
            </div>
        </div>
    )
}