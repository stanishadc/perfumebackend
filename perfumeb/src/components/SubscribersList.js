import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from './Header';
import Sidebar from './Sidebar';
import moment from 'moment';
const initialFieldValues = {
    subscribeId: 0,
    subscribeEmail: '',    
    status: true,
    createdDate: moment().format(),
    updatedDate: moment().format(),
}
export default function SubscribersList(props) {
    const [subscriberList, setSubscriberList] = useState([])
    const [values, setValues] = useState(initialFieldValues)
    const [loading, setLoading] = useState(false);
    const applicationAPI = (url = 'https://perfumeapi.azurewebsites.net/api/subscribe/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            delete: id => axios.delete(url + "delete/" + id),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord)
        }
    }
    const onDelete = (e, id) => {
        if (window.confirm('Are you sure to delete this record?'))
            applicationAPI().delete(id)
                .then(res => {
                    if (res.data.status == "Success") {
                        handleSuccess("Subscriber Deleted Succesfully");
                    }
                    else {
                        handleError("Subscriber Delete Failed")
                    }
                    refreshSubscriberList()
                })
                .catch(err => handleError("Subscriber Delete Failed"))
    }
    const onUpdate = (e, subscribe) => {
        if (window.confirm('Are you sure want to change the status?'))
        {
            const formData = new FormData()
            formData.append('subscribeId', subscribe.subscribeId)
            formData.append('subscribeEmail', subscribe.subscribeEmail)
            formData.append('createdDate', subscribe.createdDate)
            formData.append('updatedDate', new Date().toLocaleString())
            formData.append('status', !subscribe.status)
            updateSubscriber(formData)
        }
    }
    const updateSubscriber = (formData) => {
        applicationAPI().update(formData.get('subscribeId'), formData)
        .then(res => {
            if (res.data.status == "Success") {
                handleSuccess("Subscriber Updated Succesfully");
            }
            else {
                handleError("Subscriber Delete Failed")
            }
            refreshSubscriberList()
        })
        .catch(err => handleError("Subscriber Delete Failed"))
    }
    function refreshSubscriberList() {
        applicationAPI().fetchAll()
            .then(res => (setSubscriberList(res.data), setValues(res.data),setLoading(true)))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshSubscriberList();
    }, [])
    const loadingdiv = (<div className="mfp-preloader"><h3>Loading...</h3></div>);
    if (!loading) {
        return (loadingdiv)
    }
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Subscribers List</span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                        {/*Product Listing*/}
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Subscribers listing</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                    
                                </div>
                            </div>
                            <div className="table-responsive product-list">
                                <table className="table table-bordered table-striped mt-3" id="productList">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Date Joined</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscriberList.map(subs =>
                                            <tr key={subs.subscribeId}>
                                                <td>{subs.subscribeEmail}</td>
                                                <td>{subs.createdDate}</td>
                                                <td>{subs.status ? "active" : "inactive"}</td>
                                                <td>
                                                    <button className="btn btn-theme mr-2" onClick={e => onUpdate(e, subs)}><i className="fa fa-lock" /></button>
                                                    <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(subs.subscribeId))}><i className="fas fa-trash" /></button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div></div></div></div>
    )
}