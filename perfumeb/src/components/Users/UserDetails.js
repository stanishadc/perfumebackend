import React, { Component } from 'react'

export default class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: '',
            UserName: '',
            Password: '',
            Name: '',
            Email: '',
            EmailConfirmed: false,
            PhoneNumber: '',
            PhoneNumberConfirmed: false,
            Status: true,
            RoleId: 0
        }
        this.state = { roles: [], loading: true };
        this.initialize();
        this.UserId = this.UserId.bind(this);
        this.UserName = this.UserName.bind(this);
        this.Password = this.Password.bind(this);
        this.Name = this.Name.bind(this);
        this.Email = this.Email.bind(this);
        this.EmailConfirmed = this.EmailConfirmed.bind(this);
        this.PhoneNumber = this.PhoneNumber.bind(this);
        this.PhoneNumberConfirmed = this.PhoneNumberConfirmed.bind(this);
        this.Status = this.Status.bind(this);
        this.RoleId = this.RoleId.bind(this);
        this.createuser = this.createuser.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        console.log(this.state.Name);
    }
    componentDidMount() {
        this.bindroles();
    }
    async bindroles(event) {
        const response = await fetch('api/role/get');
        const data = await response.json();
        this.setState({ roles: data, loading: false });
    }
    UserId(event) {
        this.setState({ UserId: event.target.value })
    }
    UserName(event) {
        this.setState({ UserName: event.target.value })
    }
    Password(event) {
        this.setState({ Password: event.target.value })
    }
    Name(event) {
        this.setState({ Name: event.target.value })
    }
    Email(event) {
        this.setState({ Email: event.target.value })
    }
    PhoneNumber(event) {
        this.setState({ PhoneNumber: event.target.value })
    }
    EmailConfirmed(event) {
        this.setState({ EmailConfirmed: event.target.value })
    }
    PhoneNumberConfirmed(event) {
        this.setState({ PhoneNumberConfirmed: event.target.value })
    }
    Status(event) {
        this.setState({ Status: event.target.value })
    }
    RoleId(event) {
        this.setState({ RoleId: event.target.value })
    }
    async initialize() {

        var userId = this.props.match.params["userId"];
        if (userId > 0) {
            const response = await fetch('api/user/edit/' + userId);
            const data = await response.json();
            this.state = {
                UserId: data.userId,
                UserName: data.userName,
                Password: data.password,
                Name: data.name,
                Email: data.email,
                EmailConfirmed: data.emailConfirmed,
                PhoneNumber: data.phoneNumber,
                PhoneNumberConfirmed: data.phoneNumberConfirmed,
                Status: data.status,
                RoleId: data.roleId
            }
            console.log(this.state.Name);
        }
        else {
            this.state = {
                UserId: '',
                UserName: '',
                Password: '',
                Name: '',
                Email: '',
                EmailConfirmed: false,
                PhoneNumber: '',
                PhoneNumberConfirmed: false,
                Status: true,
                RoleId: 0
            }
        }
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/users/userlist');
    }
    
    createuser(event) {
        event.preventDefault();
        if (this.state.userId) {
            fetch('api/user/update/' + this.state.userId, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserId: this.state.UserId,
                    UserName: this.state.UserName,
                    Password: this.state.Password,
                    Name: this.state.Name,
                    Email: this.state.Email,
                    EmailConfirmed: this.state.EmailConfirmed,
                    PhoneNumber: this.state.PhoneNumber,
                    PhoneNumberConfirmed: this.state.PhoneNumberConfirmed,
                    Status: this.state.Status,
                    RoleId: this.state.RoleId
                })
            }).then((Response) => Response.json())
                .then((Result) => {
                    console.log(Result);
                    if (Result.Status === 'Success')
                        this.props.history.push("/users/userslist");
                    else
                        alert('Sorrrrrry !!!! Un-authenticated User !!!!!')
                })
        }
        else {
            fetch('api/user/insert', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: this.state.UserName,
                    Password: this.state.Password,
                    Name: this.state.Name,
                    Email: this.state.Email,
                    EmailConfirmed: this.state.EmailConfirmed,
                    PhoneNumber: this.state.PhoneNumber,
                    PhoneNumberConfirmed: this.state.PhoneNumberConfirmed,
                    Status: this.state.Status,
                    RoleId: this.state.RoleId
                })
            }).then((Response) => Response.json())
                .then((Result) => {
                    console.log(Result);
                    if (Result.Status === 'Success')
                        this.props.history.push("/users/userslist");
                    else
                        alert('Sorrrrrry !!!! Un-authenticated User !!!!!')
                })
        }
    }
    renderRolesddl(roles) {
        return (
            <select className="form-control" onChange={this.Role} required>
                {roles.map(role => (
                    <option key={role.roleId} value={role.roleId}>
                        {role.roleName}
                    </option>
                ))}
            </select>)
    }
    render() {
        let rolecontents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderRolesddl(this.state.roles);
        return (
            <div>
                <span className="text-secondary">Users <i className="fa fa-angle-right" /> User Details</span>
                <div className="row mt-3">
                    <div className="col-sm-12">
                        <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                            <div className="form-group floating-label">
                                <input className="form-control" name="Name" type="text" onChange={this.Name} value={this.state.Name} required />
                                <label htmlFor="Name">Name</label>
                            </div>
                            <div className="form-group floating-label">
                                <input className="form-control" name="Email" type="text" onChange={this.Email} required />
                                <label htmlFor="Email">Email</label>
                            </div>
                            <div className="form-group floating-label">
                                <input className="form-control" name="PhoneNumber" type="text" onChange={this.PhoneNumber} required />
                                <label htmlFor="PhoneNumber">PhoneNumber</label>
                            </div>
                            <div className="form-group floating-label">
                                <input className="form-control" name="userName" type="text" onChange={this.UserName} required />
                                <label htmlFor="userName">UserName</label>
                            </div>
                            <div className="form-group floating-label">
                                <input className="form-control" name="Password" type="password" onChange={this.Password} required />
                                <label htmlFor="Password">Password</label>
                            </div>
                            <div className="form-group floating-label">
                                {rolecontents}
                                <label htmlFor="Role">Role</label>
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={this.createuser} className="btn btn-primary">Create User</button>
                                <button type="button" className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div></div>
            </div>
        )
    }
}
