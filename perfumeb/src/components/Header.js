import React, { Component } from 'react'
import auth from '../Auth'
import { createHashHistory } from 'history'
export const history = createHashHistory()
export default class Header extends Component {
    constructor(props)
    {
        super(props);
        console.log(this.props)
    }
    render() {
        return (
            <div className="row header shadow-sm">
                {/*Logo*/}
                <div className="col-sm-3 pl-0 text-center header-logo">
                    <div className="bg-theme mr-3 pt-3 pb-2 mb-0">
                        <h3 className="logo"><a href="#" className="text-secondary logo"><i className="fa fa-cart" /><span className="small">Perfumatory</span></a></h3>
                    </div>
                </div>
                {/*Logo*/}
                {/*Header Menu*/}
                <div className="col-sm-9 header-menu pt-2 pb-0">
                    <div className="row">
                        {/*Menu Icons*/}
                        <div className="col-sm-4 col-8 pl-0">
                            {/*Toggle sidebar*/}
                            <span className="menu-icon">
                                <span id="sidebar-toggle-btn" />
                            </span>
                            {/*Toggle sidebar*/}

                            {/*Inbox icon*/}
                        </div>
                        {/*Menu Icons*/}
                        {/*Search box and avatar*/}
                        <div className="col-sm-8 col-4 text-right flex-header-menu justify-content-end">

                            <div className="mr-4">
                                <button onClick={() => {
                                    auth.logout(() => {
                                        history.push("/")
                                    })
                                }}>Logout</button>
                            </div>
                        </div>
                        {/*Search box and avatar*/}
                    </div>
                </div>
                {/*Header Menu*/}
            </div>
        )
    }
}
