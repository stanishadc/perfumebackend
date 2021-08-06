import React, { useState } from 'react';
import axios from 'axios';
import auth from '../Auth'
import { handleSuccess, handleError } from '../CustomAlerts'
const initialLoginValues = {
  email: '',
  password: ''
}
export default function Home(props) {
  const [values, setValues] = useState(initialLoginValues)
  const [errors, setErrors] = useState({})
  const applyErrorClass = field => ((field in errors && errors[field] == false) ? 'form-control-danger' : '')
  const applicationAPI = (url = "https://service.perfumatory.shop/api/user/") => {
    return {
      checklogin: newRecord => axios.post(url + "adminlogin", newRecord)
    }
  }
  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }
  const validate = () => {
    let temp = {}
    temp.email = values.email == "" ? false : true;
    temp.password = values.password == "" ? false : true;
    setErrors(temp)
    return Object.values(temp).every(x => x == true)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      try {
        initialLoginValues.email = values.email
        initialLoginValues.password = values.password
        checkUser(initialLoginValues)
      } catch (err) {
        console.log(err);
      }
    }
  }
  const checkUser = (loginData) => {
    applicationAPI().checklogin(loginData)
      .then(result => {
        console.log(result.data)
        if (result.data.status === "Success") {
          if (result.data.userId === 1) {
            auth.login(() => {
              localStorage.setItem('perfumeUserId', result.userId);
              props.history.push("/dashboard");
            });
          }
          else if (result.data.userId === 4) {
            auth.login(() => {
              localStorage.setItem('perfumeDeliveryId', result.userId);
              props.history.push("/dispatchlist");
            });
          }
        }
        else {
          alert("Invalid credentails");
        }
      })
  }

  return (
    <div className="login-body">
      <div className="container-fluid login-wrapper">
        <div className="login-box">
          <h1 className="text-center mb-5">WELCOME</h1>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12 login-box-info">
              <h3 className="mb-4">ECOMMERCE LOGIN</h3>
              <p className="mb-4">Only office staff able to login in to the system</p>
              <p className="text-center"></p>
            </div>
            <div className="col-md-6 col-sm-6 col-12 login-box-form p-4">
              <h3 className="mb-2">Login</h3>
              <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-user" /></span>
                </div>
                <input className={"form-control" + applyErrorClass('email')} name="email" type="text" value={values.email} onChange={handleInputChange} placeholder="Email" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock" /></span>
                </div>
                <input className={"form-control" + applyErrorClass('password')} name="password" type="password" value={values.password} onChange={handleInputChange} placeholder="Password" />
              </div>
              <div className="form-group">
                <button className="btn btn-theme btn-block p-2 mb-1" type="submit">Login</button>
              </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
