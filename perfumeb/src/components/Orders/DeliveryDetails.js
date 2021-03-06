import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../Header';
import Sidebar from '../Sidebar';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import DeliverySidebar from './DeliverySidebar';
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
export default function DeliveryDetails(props) {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const applicationAPI = () => {
        return {
            fetchOrder: () => axios.get('https://perfumeapi.azurewebsites.net/api/order/GetOrderDetails/' + props.match.params["orderNo"]),
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
        applicationAPI().UpdateDeliveryDate(formData.get('orderId'), formData)
            .then(res => {
                alert("Order Details Updated")
            })
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
                    <DeliverySidebar />
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
                                            <label htmlFor="orderNo">Order No : {values.orderNo}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="productName">Product Name : {values.productName}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="productName">Quantity : {values.quantity}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="brandName">Brand : {values.brandName}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="collectionName">Collection : {values.collectionName}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="categoryName">Category : {values.categoryName}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="price">Product Price : {values.price}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="tax">Tax : {values.tax}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="total">Total : {values.total}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="customerName">Customer Name : {values.customerName}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="customerMobile">Customer PhoneNo : {values.customerMobile}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="customerEmail">Customer Email : {values.customerEmail}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="customerCity">Customer City : {values.customerCity}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="customerState">Customer State : {values.customerState}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="customerCountry">Customer Country : {values.customerCountry}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="orderDate">Order Date : {moment(new Date(values.orderDate)).format("DD-MM-YYYY hh:mm A")}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="orderDate">Delivered Date : {moment(new Date(values.deliveryDate)).format("DD-MM-YYYY hh:mm A")}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="orderStatus">Order Status : {values.orderStatus}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-12 col-12">
                                            <label>Customer Address : {values.customerAddress}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="paymentStatus">Payment Status : {values.paymentStatus}</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <label htmlFor="paymentMode">Payment Mode : {values.paymentMode}</label>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <Link type="button" className="btn btn-danger" to={"/deliverylist"}>Back to Orders</Link>
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
