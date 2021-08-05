import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Header from '../Header';
import Sidebar from '../Sidebar';

export default function OrdersList(props) {
    const [ordersList, setOrdersList] = useState([])
    const applicationAPI = (url = 'https://api.perfumatory.shop/api/order/') => {
        return {
            fetchAll: () => axios.get(url + 'get')
        }
    }
    function refreshOrdersList() {
        applicationAPI().fetchAll()
            .then(res =>
                (setOrdersList(res.data)))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshOrdersList();
    }, [])

    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Orders List</span>
                    <div className="row mt-3">
                        <div className="col-sm-12">
                            <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                <div className="table-responsive product-list">
                                    <table className="table table-bordered table-striped mt-3" id="categoryList">
                                        <thead>
                                            <tr>
                                                <th>Order No</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Product Price</th>
                                                <th>Total</th>
                                                <th>Payment Status</th>
                                                <th>Order Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ordersList.map(order =>
                                                <tr key={order.orderId}>
                                                    <td>{order.orderNo}</td>
                                                    <td>{order.productName}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>{order.price}</td>
                                                    <td>{order.total}</td>
                                                    <td><label className="badge badge-danger badge-pill">{order.paymentStatus}</label></td>
                                                    <td><label className="badge badge-danger badge-pill">{order.orderStatus}</label></td>                                                    
                                                    <td>
                                                        <Link className="btn btn-success mr-2" to={"/orders/" + order.orderNo}><i className="fa fa-eye" /></Link></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 mb-4 footer">
                <div className="col-sm-8">
                    <span>All rights reserved ©  2020 by Perfumatory</span>
                </div>
            </div>
            {/*Footer*/}
        </div>
    )
}