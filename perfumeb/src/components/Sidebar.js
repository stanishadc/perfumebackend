import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar(props) {
    return (
        <div className="inner-sidebar mr-3">
            {/*Image Avatar*/}
            <div className="avatar text-center">
                <br />
                <p><strong>Welcome Admin</strong></p>
            </div>
            {/*Image Avatar*/}
            {/*Sidebar Navigation Menu*/}
            <div className="sidebar-menu-container">
                <ul className="sidebar-menu mt-4 mb-4">
                    <li className="parent">
                        <Link to={"/dashboard"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Dashboard<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/orders/orderslist"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Orders<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/customers/customerslist"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Customers<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/category/categorylist"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Categories<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/brand/brandslist"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Brands<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/collection/collectionlist"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Collections<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/perfumeslist"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Products<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>                    
                    <li className="parent">
                        <Link to={"/products/bottlesize"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Bottle Size<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/homeslider"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Home Slider<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/subscribers"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Subscribers<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/aboutus"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">AboutUS<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/privacypolicy"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">PrivacyPloicy<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/termsandconditions"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">TermsAndConditions<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/contactus"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">ContactUs<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    
                </ul>
            </div>
            {/*Sidebar Naigation Menu*/}
        </div>
    )
}
