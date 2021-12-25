import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../Header';
import Sidebar from '../Sidebar';
import * as moment from 'moment';
const initialFieldValues = {
    orderId: 0,
    orderNo: '',
    productId: 0,
    orderDate: new Date().toLocaleString(),
    customerId: localStorage.getItem('customerId'),
    orderStatus: '',
    shippingDate: new Date().toLocaleString(),
    quantity: 0,
    price: 0,
    discount: 0,
    tax: 0,
    total: 0,
    paymentMode: 'Pending',
    paymentStatus: 'Pending',
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString(),
    comments: '',
    rating: 0,
    review: '',
    brandName: '',
    collectionName: '',
    categoryName: '',
    customerName: '',
    customerMobile: '',
    customerEmail: '',
    customerCity: '',
    customerState: '',
    customerCountry: '',
    customerAddress: '',
    deliveryDate: new Date().toLocaleString(),
    returnDate: new Date().toLocaleString(),
}
export default function OrderDetails(props) {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const applicationAPI = () => {
        return {
            fetchOrder: () => axios.get('https://perfumeapi.azurewebsites.net/api/order/GetOrderDetails/' + props.match.params["orderNo"]),
            update: (id, updateRecord) => axios.put("https://perfumeapi.azurewebsites.net/api/order/update/" + id, updateRecord),
            UpdateShippingDate: (id, updateRecord) => axios.put("https://perfumeapi.azurewebsites.net/api/order/UpdateShippingDate/" + id, updateRecord),
            UpdateDeliveryDate: (id, updateRecord) => axios.put("https://perfumeapi.azurewebsites.net/api/order/UpdateDeliveryDate/" + id, updateRecord)
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
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData()
            formData.append('orderId', values.orderId)
            formData.append('orderStatus', values.orderStatus)
            formData.append('paymentMode', values.paymentMode)
            formData.append('paymentStatus', values.paymentStatus)
            console.log(values)
            updateOrder(formData);
        }
    }
    const updateOrder = (formData) => {
        if (formData.get('orderStatus') === "Dispatched") {
            applicationAPI().UpdateShippingDate(formData.get('orderId'), formData)
                .then(res => {
                    alert("Order Details Updated")
                })
        }
        else if (formData.get('orderStatus') === "Delivered") {
            applicationAPI().UpdateDeliveryDate(formData.get('orderId'), formData)
                .then(res => {
                    alert("Order Details Updated")
                })
        }
        else {
            applicationAPI().update(formData.get('orderId'), formData)
                .then(res => {
                    alert("Order Details Updated")
                })
        }
    }
    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' form-control-danger' : '')
    useEffect(function effectFunction() {
        async function fetchOrder() {
            const response = await fetch('https://perfumeapi.azurewebsites.net/api/order/GetOrderDetails/' + props.match.params["orderNo"])
            const json = await response.json();
            setValues(json[0]);
            setLoading(true);
        }
        fetchOrder();
    }, []);
    if (!loading) {
        return ("Loading...")
    }
    return (
        <div>
            <Header></Header>
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Order Details</span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">Order Details</h6>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('orderNo')} name="orderNo" type="text" value={values.orderNo} onChange={handleInputChange} />
                                            <label htmlFor="orderNo">Order No</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('productName')} name="productName" type="text" value={values.productName} onChange={handleInputChange} />
                                            <label htmlFor="productName">Product Name</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('quantity')} name="quantity" type="text" value={values.quantity} onChange={handleInputChange} />
                                            <label htmlFor="productName">Quantity</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control"} name="brandName" type="text" value={values.brandName} onChange={handleInputChange} />
                                            <label htmlFor="brandName">Brand</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control"} name="collectionName" type="text" value={values.collectionName} onChange={handleInputChange} />
                                            <label htmlFor="collectionName">Collection</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control"} name="categoryName" type="text" value={values.categoryName} onChange={handleInputChange} />
                                            <label htmlFor="categoryName">Category</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <select value={values.orderStatus} onChange={handleInputChange} className="form-control" name="orderStatus">
                                                <option value="0">Please Select</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Placed">Placed</option>
                                                <option value="Ordered">Ordered</option>
                                                <option value="Dispatched">Dispatched</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <label htmlFor="orderStatus">Order Status</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <select value={values.paymentStatus} onChange={handleInputChange} className="form-control" name="paymentStatus">
                                                <option value="0">Please Select</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Success">Success</option>
                                                <option value="Refunded">Refunded</option>
                                            </select>
                                            <label htmlFor="paymentStatus">Payment Status</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('paymentMode')} name="paymentMode" type="text" value={values.paymentMode} onChange={handleInputChange} />
                                            <label htmlFor="paymentMode">Payment Mode</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('price')} name="price" type="text" value={values.price} onChange={handleInputChange} />
                                            <label htmlFor="price">Product Price</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('tax')} name="tax" type="text" value={values.tax} onChange={handleInputChange} />
                                            <label htmlFor="tax">Tax</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('total')} name="total" type="text" value={values.total} onChange={handleInputChange} />
                                            <label htmlFor="total">Total</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerName')} name="customerName" type="text" value={values.customerName} onChange={handleInputChange} />
                                            <label htmlFor="customerName">Customer Name</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerMobile')} name="customerMobile" type="text" value={values.customerMobile} onChange={handleInputChange} />
                                            <label htmlFor="customerMobile">Customer PhoneNo</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerEmail')} name="customerEmail" type="text" value={values.customerEmail} onChange={handleInputChange} />
                                            <label htmlFor="customerEmail">Customer Email</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerCity')} name="customerCity" type="text" value={values.customerCity} onChange={handleInputChange} />
                                            <label htmlFor="customerCity">Customer City</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerState')} name="customerState" type="text" value={values.customerState} onChange={handleInputChange} />
                                            <label htmlFor="customerState">Customer State</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerCountry')} name="customerCountry" type="text" value={values.customerCountry} onChange={handleInputChange} />
                                            <label htmlFor="customerCountry">Customer Country</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('orderDate')} name="orderDate" type="text" value={moment(new Date(values.orderDate)).format("DD-MM-YYYY hh:mm A")} onChange={handleInputChange} />
                                            <label htmlFor="orderDate">Order Date</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('rating')} name="rating" type="text" value={values.rating} onChange={handleInputChange} />
                                            <label htmlFor="rating">Customer Rating</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('review')} name="review" type="text" value={values.review} onChange={handleInputChange} />
                                            <label htmlFor="review">Customer Review</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-12 col-12">
                                            <input className={"form-control" + applyErrorClass('customerAddress')} name="customerAddress" type="text" value={values.customerAddress} onChange={handleInputChange} />
                                            <label htmlFor="customerAddress">Customer Address</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Update</button>
                                        <button type="button" className="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
