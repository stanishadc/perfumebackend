import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import { Grid } from 'gridjs-react';

export default function CustomersList(props) {
    const [customersList, setCustomersList] = useState([])
    const applicationAPI = (url = 'http://www.api.perfumatory.shop/api/customer/') => {
        return {
            fetchAll: () => axios.get(url + 'get')
        }
    }
    function refreshCustomersList() {
        applicationAPI().fetchAll()
            .then(res =>
                (setCustomersList(res.data)))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshCustomersList();
    }, [])

    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Customers List</span>
                    <div className="row mt-3">
                        <div className="col-sm-12">
                            <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                <div className="table-responsive product-list">  
                                    <table className="table table-bordered table-striped mt-3" id="categoryList">
                                        <thead>
                                            <tr>
                                                <th>Customer Name</th>
                                                <th>Email</th>
                                                <th>Phone No</th>
                                                <th>City</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customersList.map(customer =>
                                                <tr key={customer.customerId}>
                                                    <td>{customer.customerName}</td>
                                                    <td>{customer.email}</td>
                                                    <td>{customer.mobileNo}</td>
                                                    <td>{customer.city}</td>                                                 
                                                    <td>
                                                        <Link className="btn btn-success mr-2" to={"/customerorders/" + customer.customerId}><i className="fa fa-eye" /></Link></td>
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