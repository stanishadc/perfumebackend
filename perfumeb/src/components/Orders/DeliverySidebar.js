import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function DeliverySidebar(props) {
    return (
        <div className="inner-sidebar mr-3">
            {/*Image Avatar*/}
            <div className="avatar text-center">
                <br />
                <p><strong>Welcome</strong></p>
            </div>
            {/*Image Avatar*/}
            {/*Sidebar Navigation Menu*/}
            <div className="sidebar-menu-container">
                <ul className="sidebar-menu mt-4 mb-4">                    
                    <li className="parent">
                        <Link to={"/dispatchlist"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Dispatched Orders<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/deliverylist"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Delivery Orders<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                </ul>
            </div>
            {/*Sidebar Naigation Menu*/}
        </div>
    )
}
