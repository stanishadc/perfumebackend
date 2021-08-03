import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Header from '../Header';
export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };
    }
    componentDidMount() {
        this.populateUserData();
    }
    async populateUserData() {
        const response = await fetch('api/user/get');
        const data = await response.json();
        console.log(data);
        this.setState({ users: data, loading: false });
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUserTable(this.state.users);

        return (
            <div>
                <Header></Header>
                    <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Users</span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Users</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                    <Link to={"/users/adduser"} className="btn btn-round btn-theme"><i className="fa fa-plus" /> Create User</Link>
                                </div>
                            </div>
                            <div className="table-responsive product-list">
                                {contents}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 mb-4 footer">
                    <div className="col-sm-8">
                        <span>All rights reserved ©  2020 by Perfumatory</span>
                    </div>
                    <div className="col-sm-4 text-right">
                        <a href="#" className="ml-2">Contact Us</a>
                        <a href="#" className="ml-2">Support</a>
                    </div>
                </div>
            </div>
        );
    }
    renderUserTable(users) {
        return (
            <table className="table table-bordered table-striped mt-3" id="productList">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.status ? "active" : "inactive"}</td>
                            <td>
                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo"><i className="fa fa-eye" /></button>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(user.userId)}><i className="fa fa-pencil" /></button>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(user.userId)}><i className="fas fa-trash" /></button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    handleEdit(id) {
        this.props.history.push("edit/" + id);
    }
    handleDelete(id) {
        if (!window.confirm("Do you want to delete the user")) {
            return false;
        }
        else {
            fetch('api/user/delete/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        data: this.state.users.filter((user) => {
                            return user.userId !== id;
                        })
                    });
                });
        }
    }
}
