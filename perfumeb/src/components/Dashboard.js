import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
export default function OrdersList(props) {
    const [ordersList, setOrdersList] = useState([])
    const applicationAPI = (url = 'https://perfumeapi.azurewebsites.net/api/order/') => {
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
    function confirmedCount() {
        const confirmedOrders = ordersList.filter(order => order.orderStatus === 'Ordered');
        return confirmedOrders.length;
    }
    function deliverCount() {
        const deliveredOrders = ordersList.filter(order => order.orderStatus === 'Delivered');
        return deliveredOrders.length;
    }
    function cancelCount() {
        const cancelledOrders = ordersList.filter(order => order.orderStatus === 'Cancelled');
        return cancelledOrders.length;
    }
    useEffect(() => {
        refreshOrdersList();
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <Header />
                <div className="row main-content">
                    <div className="col-sm-3 col-xs-6 sidebar pl-0">
                        <Sidebar />
                    </div>
                    <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                        <h5 className="mb-3"><strong>Dashboard</strong></h5>
                        {/*Dashboard widget*/}
                        <div className="mt-1 mb-3 button-container">
                            <div className="row pl-0">
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                    <div className="bg-theme border shadow rounded">
                                        <div className="p-2 text-center">
                                            <h5 className="mb-0 mt-2 text-light"><small><strong>Confirmed Orders</strong></small></h5>
                                            <h1>{confirmedCount()}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                    <div className="bg-success border shadow rounded">
                                        <div className="p-2 mb-1 text-center">
                                            <h5 className="mb-0 mt-2 text-light"><small><strong>Delivered Orders</strong></small></h5>
                                            <h1 className="text-white">{deliverCount()}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                    <div className="bg-danger border shadow rounded">
                                        <div className="p-2 text-center">
                                            <h5 className="mb-0 mt-2 text-light"><small><strong>Cancelled Orders</strong></small></h5>
                                            <h1 className="text-white">{cancelCount()}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*/Dashboard widget*/}
                        <div className="row mt-3">
                            <div className="col-sm-12">                                
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                <h4>New Orders</h4>
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
                                            {ordersList && ordersList.filter(order => order.orderStatus === 'Ordered').map(order =>
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
                    <div className="col-sm-12 row mt-5 mb-4 footer">
                        <div className="col-sm-12">
                            <span>All rights reserved ©  2020 by Perfumatory</span>
                        </div>
                    </div>
                    {/*Footer*/}
                </div>
            </div></div>
    )
}
