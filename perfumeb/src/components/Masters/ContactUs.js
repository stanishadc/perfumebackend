import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
const initialFieldValues = {
    contactUsId: 0,
    title: "",
    paraGraph: "",
    email: "",
    mobile: "",
    address: "",
    googleMapUrl: ""
};
export default function ContactUs(props) {
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (recordForEdit !== null) setValues(recordForEdit);
    }, [recordForEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const validate = () => {
        let temp = {};
        temp.contactUsId = values.contactUsId === "" ? false : true;
        setErrors(temp);
        return Object.values(temp).every((x) => x === true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("contactUsId", values.contactUsId);
            formData.append("title", values.title);
            formData.append("paraGraph", values.paraGraph);
            formData.append("email", values.email);
            formData.append("mobile", values.mobile);
            formData.append("address", values.address);
            formData.append("googleMapUrl", values.googleMapUrl);
            console.log(values);
            addOrEdit(formData);
        }
    };
    const applicationAPI = (
        url = "https://localhost:44373/api/contactus/"
    ) => {
        return {
            fetchAll: () => axios.get(url + "get"),
            create: (newRecord) => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) =>
                axios.put(url + "update/" + id, updateRecord),
        };
    };
    const addOrEdit = (formData) => {
        applicationAPI()
            .update(formData.get("contactUsId"), formData)
            .then((res) => {
                handleSuccess("ContactUs Updated");
                refreshContactUsList();
            });
    };
    function refreshContactUsList() {
        applicationAPI()
            .fetchAll()
            .then(res => setValues(res.data[0])
            )
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        refreshContactUsList();
    }, []);
    const applyErrorClass = (field) =>
        field in errors && errors[field] === false ? " form-control-danger" : "";
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <span className="text-secondary">
                            Dashboard <i className="fa fa-angle-right" /> ContactUs
                        </span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">ContactUs Details</h6>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input
                                                className={"form-control" + applyErrorClass("title")}
                                                name="title"
                                                type="text"
                                                value={values.title}
                                                onChange={handleInputChange}
                                                placeholder="Title"
                                            />
                                            <label htmlFor="title">Title</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input
                                                className={"form-control" + applyErrorClass("email")}
                                                name="email"
                                                type="text"
                                                value={values.email}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input
                                                className={"form-control" + applyErrorClass("mobile")}
                                                name="mobile"
                                                type="text"
                                                value={values.mobile}
                                                onChange={handleInputChange}
                                                placeholder="Mobile"
                                            />
                                            <label htmlFor="mobile">Mobile</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-12 col-12">
                                            <input
                                                className={"form-control" + applyErrorClass("paraGraph")}
                                                name="paraGraph"
                                                type="text"
                                                value={values.paraGraph}
                                                onChange={handleInputChange}
                                                placeholder="ParaGraph"
                                            />
                                            <label htmlFor="paraGraph">ParaGraph</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-12 col-12">
                                            <input
                                                className={"form-control" + applyErrorClass("address")}
                                                name="address"
                                                type="text"
                                                value={values.address}
                                                onChange={handleInputChange}
                                                placeholder="Address"
                                            />
                                            <label htmlFor="address">Address</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-12 col-12">
                                            <input
                                                className={"form-control" + applyErrorClass("googleMapUrl")}
                                                name="googleMapUrl"
                                                type="text"
                                                value={values.googleMapUrl}
                                                onChange={handleInputChange}
                                                placeholder="GoogleMapUrl"
                                            />
                                            <label htmlFor="googleMapUrl">GoogleMapUrl</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4">
                                            <button type="submit" className="btn btn-primary mr-3">
                                                Submit
                                             </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}