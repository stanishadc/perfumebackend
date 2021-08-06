import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

export default function PerfumessList(props) {
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false);
    const applicationAPI = (url = 'https://service.perfumatory.shop/api/product/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            delete: id => axios.delete(url + "delete/" + id),
            deleteimage: id => axios.delete("https://service.perfumatory.shop/api/productimage/delete/" + id)
        }
    }
    const onDelete = (e, id) => {
        if (window.confirm('Are you sure to delete this record?'))
            applicationAPI().delete(id)
                .then(res => {
                    if (res.data.status == "Success") {
                        applicationAPI().deleteimage(id)
                        .then(res => {
                            if (res.data.status == "Success") {
                                handleSuccess("Product Deleted Succesfully");
                        }})
                    }
                    else {
                        handleError("Product Delete Failed")
                    }
                    refreshProductList()
                })
                .catch(err => handleError("Product Delete Failed"))
    }

    function refreshProductList() {
        applicationAPI().fetchAll()
            .then(res => (setProductList(res.data), setLoading(true)))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshProductList();
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
                    <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Products List</span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                        {/*Product Listing*/}
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Product listing</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                    <Link to={"/addperfume"} className="btn btn-round btn-theme"><i className="fa fa-plus" /> Add Product</Link>
                                </div>
                            </div>
                            <div className="table-responsive product-list">
                                <table className="table table-bordered table-striped mt-3" id="productList">
                                    <thead>
                                        <tr>
                                            <th width="6%">Image</th>
                                            <th width="10%">ProductCode</th>
                                            <th width="54%">ProductName</th>
                                            <th width="4%">Stock</th>
                                            <th width="6%">Status</th>
                                            <th width="20%">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productList.map(product =>
                                            <tr key={product.productId}>
                                                <td width="6%"><img src={product.imageSrc} width="80px" alt={product.productName} /></td>
                                                <td width="10%">{product.productCode}</td>
                                                <td width="54%"><h6><strong>{product.productName}</strong></h6>
                                                    <p>{product.productDescription}</p></td>
                                                <td width="4%">{product.availableItems}</td>
                                                <td width="6%">{product.status ? "active" : "inactive"}</td>
                                                <td width="20%">
                                                    <Link to={"/productimages/" + product.productId} className="btn btn-theme mr-2"><i className="fa fa-image" /></Link>
                                                    <Link to={"/perfumedetails/" + product.productId} className="btn btn-success mr-2"><i className="fa fa-pencil" /></Link>
                                                    <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(product.productId))}><i className="fas fa-trash" /></button>
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