import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import moment from 'moment';
const defaultProductImage = "/assets/img/default-avatar.jpg";
const initialFieldValues = {
    productId: 0,
    productCode: '',
    productName: '',
    productDescription: '',
    productImage: '',
    imageSrc: defaultProductImage,
    imageFile: null,
    availableItems: 0,
    soldItems: 0,
    totalItems: 0,
    status: true,
    createdDate: moment().format(),
    updatedDate: moment().format(),
    userId: 1,
    rating: 0,
    totalReviews: 0,
    purchasePrice: 0,
    salePrice: 0,
    discount: 0,
    tax: 0,
    bottleId: 0,
    categoryId: 0,
    collectionId: 0,
    brandId: 0,
    topNote: '',
    heartNote: '',
    baseNote: '',
    topNoteImage: '',
    heartNoteImage: '',
    baseNoteImage: '',
    topImageSrc: defaultProductImage,
    heartImageSrc: defaultProductImage,
    baseImageSrc: defaultProductImage,
    topImageFile: null,
    heartImageFile: null,
    baseImageFile: null,
    tag: '0'
}
export default function PerfumeDetails(props) {
    const [categoryList, setCategoryList] = useState([])
    const [collectionList, setCollectionList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [bottleList, setBottleList] = useState([])
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

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
    const showTopPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let topImageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    topImageFile,
                    topImageSrc: x.target.result
                })
            }
            reader.readAsDataURL(topImageFile)
        }
        else {
            setValues({
                ...values,
                topImageFile: null,
                topImageSrc: defaultProductImage
            })
        }
    }
    const showHeartPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let heartImageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    heartImageFile,
                    heartImageSrc: x.target.result
                })
            }
            reader.readAsDataURL(heartImageFile)
        }
        else {
            setValues({
                ...values,
                heartImageFile: null,
                heartImageSrc: defaultProductImage
            })
        }
    }
    const showBasePreview = e => {
        if (e.target.files && e.target.files[0]) {
            let baseImageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    baseImageFile,
                    baseImageSrc: x.target.result
                })
            }
            reader.readAsDataURL(baseImageFile)
        }
        else {
            setValues({
                ...values,
                baseImageFile: null,
                baseImageSrc: defaultProductImage
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
        temp.productName = values.productName == "" ? false : true;
        temp.tag = values.tag == '0' ? false : true;
        temp.categoryId = values.categoryId == 0 ? false : true;
        temp.brandId = values.brandId == 0 ? false : true;
        temp.collectionId = values.collectionId == 0 ? false : true;
        temp.bottleId = values.bottleId == 0 ? false : true;
        temp.imageSrc = values.imageSrc == defaultProductImage ? false : true;
        temp.topImageSrc = values.topImageSrc == defaultProductImage ? false : true;
        temp.heartImageSrc = values.heartImageSrc == defaultProductImage ? false : true;
        temp.baseImageSrc = values.baseImageSrc == defaultProductImage ? false : true;
        temp.productDescription = values.productDescription == "" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData()
            formData.append('productId', values.productId)
            formData.append('productCode', values.productCode)
            formData.append('productName', values.productName)
            formData.append('productDescription', values.productDescription)
            formData.append('productImage', values.productImage)
            formData.append('imageFile', values.imageFile)
            formData.append('createdDate', values.createdDate)
            formData.append('updatedDate', values.updatedDate)
            formData.append('userId', parseInt(values.userId))
            formData.append('status', values.status)
            formData.append('productCode', values.productCode)
            formData.append('purchasePrice', values.purchasePrice)
            formData.append('salePrice', values.salePrice)
            formData.append('tax', values.tax)
            formData.append('discount', values.discount)
            formData.append('availableItems', values.availableItems)
            formData.append('soldItems', values.soldItems)
            formData.append('totalItems', values.totalItems)
            formData.append('bottleId', values.bottleId)
            formData.append('categoryId', parseInt(values.categoryId))
            formData.append('collectionId', parseInt(values.collectionId))
            formData.append('brandId', parseInt(values.brandId))
            formData.append('topImageFile', values.topImageFile)
            formData.append('heartImageFile', values.heartImageFile)
            formData.append('baseImageFile', values.baseImageFile)
            formData.append('topNoteImage', values.topNoteImage)
            formData.append('heartNoteImage', values.heartNoteImage)
            formData.append('baseNoteImage', values.baseNoteImage)
            formData.append('topNote', values.topNote)
            formData.append('heartNote', values.heartNote)
            formData.append('baseNote', values.baseNote)
            formData.append('tag', values.tag)

            addOrEdit(formData, resetForm)
        }
        else{
            alert("Please Enter Highlighted Values");
        }
    }

    const applicationAPI = (url = 'https://perfumeapi.azurewebsites.net/api/product/') => {
        return {
            fetchProductDetails: () => axios.get('https://perfumeapi.azurewebsites.net/api/product/getbyid/'+props.match.params["productId"]),
            fetchBrands: () => axios.get('https://perfumeapi.azurewebsites.net/api/brand/get'),
            fetchBottles: () => axios.get('https://perfumeapi.azurewebsites.net/api/bottle/get'),
            fetchCategories: () => axios.get('https://perfumeapi.azurewebsites.net/api/category/get'),
            fetchCollections: () => axios.get('https://perfumeapi.azurewebsites.net/api/collection/get'),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord)
        }
    }
    const addOrEdit = (formData) => {
            applicationAPI().update(formData.get('productId'), formData)
                .then(res => {
                    if (res.data.status == "Success") {
                        handleSuccess("Product Details Updated");
                    }
                    else {
                        handleError("Product Update Failed")
                    }
                    resetForm();
                })
            }
    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        document.getElementById('imagetopuploader').value = null;
        document.getElementById('imageheartuploader').value = null;
        document.getElementById('imagebaseuploader').value = null;
    }
    function refreshBrandList() {
        applicationAPI().fetchBrands()
            .then(res => setBrandList(res.data))
            .catch(err => console.log(err))
    }
    function refreshCollectionList() {
        applicationAPI().fetchCollections()
            .then(res => setCollectionList(res.data))
            .catch(err => console.log(err))
    }
    function refreshCategoryList() {
        applicationAPI().fetchCategories()
            .then(res => setCategoryList(res.data))
            .catch(err => console.log(err))
    }
    function refreshBottleList() {
        applicationAPI().fetchBottles()
            .then(res => setBottleList(res.data))
            .catch(err => console.log(err))
    }
    function refreshProductDetails() {
        applicationAPI().fetchProductDetails()
            .then(res => setValues(res.data[0]))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshCategoryList();
        refreshCollectionList();
        refreshBrandList();
        refreshBottleList();
        refreshProductDetails();
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
                <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Product Details</span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                        {/*Product Listing*/}
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Update Product Details</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                    <Link to={"/perfumeslist"} className="btn btn-round btn-theme"><i className="fa fa-list mr-2" /> Products List</Link>
                                </div>
                            </div>
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>                    
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">New Product</h6>
                                    <div className="form-group row">
                                        <div className="col-sm-3 col-12">
                                            <div className="picture-container">
                                                <div className="picture">
                                                    <img src={values.imageSrc} className="picture-src" width="200px" height="200px" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-12">
                                            <div className="picture-container">
                                                <div className="picture">
                                                    <img src={values.topImageSrc} className="picture-src" width="200px" height="200px" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-12">
                                            <div className="picture-container">
                                                <div className="picture">
                                                    <img src={values.heartImageSrc} className="picture-src" width="200px" height="200px" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-12">
                                            <div className="picture-container">
                                                <div className="picture">
                                                    <img src={values.baseImageSrc} className="picture-src" width="200px" height="200px" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-3 col-12">
                                            <input id="image-uploader" className={"form-control-file" + applyErrorClass('imageSrc')} type="file" accept="image/*" onChange={showPreview} />
                                            <label htmlFor="tag">Product Image</label>
                                        </div>
                                        <div className="col-sm-3 col-12">
                                            <input id="imagetopuploader" className={"form-control-file" + applyErrorClass('topImageSrc')} type="file" accept="image/*" onChange={showTopPreview} />
                                            <label htmlFor="tag">Top Image</label>
                                        </div>
                                        <div className="col-sm-3 col-12">
                                            <input id="imageheartuploader" className={"form-control-file" + applyErrorClass('heartImageSrc')} type="file" accept="image/*" onChange={showHeartPreview} />
                                            <label htmlFor="tag">Heart Image</label>
                                        </div>
                                        <div className="col-sm-3 col-12">
                                            <input id="imagebaseuploader" className={"form-control-file" + applyErrorClass('baseImageSrc')} type="file" accept="image/*" onChange={showBasePreview} />
                                            <label htmlFor="tag">Base Image</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <select value={values.tag} onChange={handleInputChange} className={"form-control" + applyErrorClass('tag')} name="tag">
                                                <option value="0">Please Select</option>
                                                <option value="General">General</option>
                                                <option value="New">New</option>
                                                <option value="Hot">Hot</option>
                                                <option value="BestSeller">Best Seller</option>
                                            </select>
                                            <label htmlFor="tag">Tag</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('productCode')} name="productCode" type="text" value={values.productCode} onChange={handleInputChange} />
                                            <label htmlFor="productCode">Product BarCode</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('topNote')} name="topNote" type="text" value={values.topNote} onChange={handleInputChange} />
                                            <label htmlFor="topNote">Top Note</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('heartNote')} name="heartNote" type="text" value={values.heartNote} onChange={handleInputChange} />
                                            <label htmlFor="heartNote">Heart Note</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('baseNote')} name="baseNote" type="text" value={values.baseNote} onChange={handleInputChange} />
                                            <label htmlFor="baseNote">Base Note</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('productName')} name="productName" type="text" value={values.productName} onChange={handleInputChange} />
                                            <label htmlFor="productName">Product Name</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <select value={values.status} onChange={handleInputChange} className="form-control" name="status">
                                                <option value="true">active</option>
                                                <option value="false">inactive</option>
                                            </select>
                                            <label htmlFor="status">Status</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <select value={values.bottleId} onChange={handleInputChange} className={"form-control" + applyErrorClass('bottleId')} name="bottleId">
                                                <option value="0">Please Select</option>
                                                {bottleList.map(bottle =>
                                                    <option key={bottle.bottleId} value={bottle.bottleId}>{bottle.bottleName}</option>
                                                )}
                                            </select>
                                            <label htmlFor="size">Size</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <select value={values.collectionId} onChange={handleInputChange} className={"form-control" + applyErrorClass('collectionId')} name="collectionId">
                                                <option value="0">Please Select</option>
                                                {collectionList.map(collection =>
                                                    <option key={collection.collectionId} value={collection.collectionId}>{collection.collectionName}</option>
                                                )}
                                            </select>
                                            <label htmlFor="status">Collection</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <select value={values.brandId} onChange={handleInputChange} className={"form-control" + applyErrorClass('brandId')} name="brandId">
                                                <option value="0">Please Select</option>
                                                {brandList.map(brand =>
                                                    <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                                                )}
                                            </select>
                                            <label htmlFor="status">Brand</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <select value={values.categoryId} onChange={handleInputChange} className={"form-control" + applyErrorClass('categoryId')} name="categoryId">
                                                <option value="0">Please Select</option>
                                                {categoryList.map(category =>
                                                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                                )}
                                            </select>
                                            <label htmlFor="status">Category</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('availableItems')} name="availableItems" type="text" value={values.availableItems} onChange={handleInputChange} />
                                            <label htmlFor="availableItems">Available Items</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('soldItems')} name="soldItems" type="text" value={values.soldItems} onChange={handleInputChange} />
                                            <label htmlFor="soldItems">Sold Items</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('totalItems')} name="totalItems" type="text" value={values.totalItems} onChange={handleInputChange} />
                                            <label htmlFor="totalItems">Total Items</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('purchasePrice')} name="purchasePrice" type="text" value={values.purchasePrice} onChange={handleInputChange} />
                                            <label htmlFor="totalItems">Purchase Price</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('tax')} name="tax" type="text" value={values.tax} onChange={handleInputChange} />
                                            <label htmlFor="totalItems">Tax</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('salePrice')} name="salePrice" type="text" value={values.salePrice} onChange={handleInputChange} />
                                            <label htmlFor="totalItems">Sale Price</label>
                                        </div>
                                    </div>
                                    <div className="form-group floating-label">
                                        <div className="col-sm-12 col-12">
                                            <input className={"form-control" + applyErrorClass('productDescription')} name="productDescription" type="text" value={values.productDescription} onChange={handleInputChange} />
                                            <label htmlFor="productDescription">Product Description</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary mr-2">Update Product</button>
                                        <Link to={"/perfumeslist"} className="btn btn-danger">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    </form>
                    </div>
            </div></div></div></div>
    )
}