import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from './Header';
import Sidebar from './Sidebar';

const defaultProductImage = "/assets/img/default-avatar.jpg";
const initialFieldValues = {
    homeSliderId: 0,
    imageName: '',
    imageSrc: defaultProductImage,
    imageFile: null
}
export default function BrandsList(props) {
    const [homeSliderList, setHomeSliderList] = useState([])
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
        temp.imageSrc = values.imageSrc == defaultProductImage ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }
    const handleSubmit = e => {
        e.preventDefault();

        if (validate()) {
            const formData = new FormData()
            formData.append('homeSliderId', values.homeSliderId)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)

            addOrEdit(formData, resetForm)
        }
    }
    const applicationAPI = (url = 'https://papi.perfumatory.shop/api/homeslider/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            create: newRecord => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    const addOrEdit = (formData, onSuccess) => {

        if (formData.get('homeSliderId') == "0") {
            applicationAPI().create(formData)
                .then(res => {
                    console.log(res);
                    if (res.data.status == "Success") {
                        handleSuccess("New Image Added");
                    }
                    else {
                        handleError("Image Adding Failed")
                    }
                    refreshImageList();
                    resetForm();
                })
                .catch(err => console.log(err))
        }
        else {
            applicationAPI().update(formData.get('homeSliderId'), formData)
                .then(res => {
                    if (res.data.status == "Success") {
                        handleSuccess("Image Details Updated");
                    }
                    else {
                        handleError("Image Update Failed")
                    }
                    refreshImageList();
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
                        handleSuccess("Image Deleted Succesfully");
                    }
                    else {
                        handleError("Image Delete Failed")
                    }
                    refreshImageList()
                })
                .catch(err => handleError("Image Deleted Failed"))
    }
    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
    }
    function refreshImageList() {
        applicationAPI().fetchAll()
            .then(res => setHomeSliderList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshImageList();
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
                            <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Images List</span>
                            <div className="row mt-3">
                                <div className="col-sm-12">
                                    <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                        <h6 className="mb-3">Home Slider</h6>
                                        <div className="form-group">
                                            <div className="col-sm-4 col-12">
                                                <div className="picture-container">
                                                    <div className="picture">
                                                        <img src={values.imageSrc} className="picture-src" width="200px" height="200px" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-4">
                                                <input id="image-uploader" className={"form-control-file" + applyErrorClass('imageSrc')} type="file" accept="image/*" onChange={showPreview} />
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
                                        <th width="70%">Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {homeSliderList.map(slider =>
                                        <tr key={slider.homeSliderId}>
                                            <td><img src={slider.imageSrc} width="80px" alt={slider.brandName} /></td>
                                            <td>
                                                <button className="btn btn-success mr-2" onClick={() => { showEditDetails(slider) }}><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(slider.homeSliderId))}><i className="fas fa-trash" /></button></td>
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
                </div>
            </div>
        </div>
    )
}