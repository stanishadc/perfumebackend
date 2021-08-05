import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const defaultProductImage = "/assets/img/default-avatar.jpg";
const initialFieldValues = {
    productImageId: 0,
    productId: 0,
    productImageName: '',
    imageSrc: defaultProductImage,
    imageFile: null,
    status: true,
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString(),
    userId: 1
}
export default function ProductImages(props) {
    const [imagesList, setImagesList] = useState([])
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const [recordForEdit, setRecordForEdit] = useState(null)
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
            formData.append('productImageId', values.productImageId)
            formData.append('productId', props.match.params["productId"])
            formData.append('productImageName', values.productImageName)
            formData.append('imageFile', values.imageFile)
            formData.append('createdDate', values.createdDate)
            formData.append('updatedDate', values.updatedDate)
            formData.append('userId', parseInt(values.userId))
            formData.append('status', values.status)
            addOrEdit(formData)
        }
        else {
            alert("Please Enter Highlighted Values");
        }
    }

    const applicationAPI = (url = 'https://api.perfumatory.shop/api/productImage/') => {
        return {
            fetchProductImages: () => axios.get(url + 'GetByProduct/' + props.match.params["productId"]),
            create: newRecord => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    const addOrEdit = (formData) => {
        if (formData.get('productImageId') == "0") {
            applicationAPI().create(formData)
                .then(res => {
                    if (res.data.status == "Success") {
                        handleSuccess("Product Image Added")
                        refreshProductImages();
                        resetForm();
                    }
                    else {
                        handleError("Product Image Adding Failed")
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            applicationAPI().update(formData.get('productImageId'), formData)
                .then(res => {
                    if (res.data.status == "Success") {
                        handleSuccess("Product Details Updated");
                    }
                    else {
                        handleError("Product Update Failed")
                    }
                    refreshProductImages();
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
                    console.log(res);
                    if (res.data.status == "Success") {
                        handleSuccess("Product Image Deleted Succesfully");
                    }
                    else {
                        handleError("Product Image Delete Failed")
                    }
                    refreshProductImages()
                })
                .catch(err => handleError("Product Delete Failed"))
    }
    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
    }
    function refreshProductImages() {
        applicationAPI().fetchProductImages()
            .then(res => 
                setImagesList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshProductImages();
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
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                        {/*Product Listing*/}
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Product listing</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                    <Link to={"/perfumeslist"} className="btn btn-round btn-theme mr-2"><i className="fa fa-list mr-2" />Product Images</Link>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                                <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Product Images</span>
                                <div className="row mt-3">
                                    <div className="col-sm-12">
                                        <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                            <h6 className="mb-3">Product Image</h6>
                                            <div className="form-group row">
                                                <div className="col-sm-3 col-12">
                                                    <div className="picture-container">
                                                        <div className="picture">
                                                            <img src={values.imageSrc} className="picture-src" width="200px" height="200px" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-3 col-12">
                                                    <input id="image-uploader" className={"form-control-file" + applyErrorClass('imageSrc')} type="file" accept="image/*" onChange={showPreview} />
                                                    <label htmlFor="tag">Product Image</label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                                <Link to={"/perfumeslist"} type="button" className="btn btn-danger">Cancel</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="table-responsive product-list">
                            <table className="table table-bordered table-striped mt-3" id="productList">
                                <thead>
                                    <tr>
                                        <th width="10%">Image</th>
                                        <th width="45%">Status</th>
                                        <th width="45%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {imagesList.map(image =>
                                        <tr key={image.productImageId}>
                                            <td width="10%"><img src={image.imageSrc} width="80px" /></td>
                                            <td width="45%">{image.status ? "active" : "inactive"}</td>
                                            <td width="45%">
                                                <button className="btn btn-success mr-2" onClick={() => { showEditDetails(image) }}><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(image.productImageId))}><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div></div></div></div>
    )
}