import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
const initialFieldValues = {
  privacyPolicyId: 0,
  title: "",
  paraGraph: "",
  paraGraph1: ""
};
export default function PrivacyPolicy(props) {
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
    temp.title = values.title === "" ? false : true;
    temp.subTitle = values.subTitle === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("privacyPolicyId", values.privacyPolicyId);
      formData.append("title", values.title);
      formData.append("paraGraph", values.paraGraph);
      formData.append("paraGraph1", values.paraGraph1);
      console.log(values);
      addOrEdit(formData);
    }
  };
  const applicationAPI = (url = "https://localhost:44373/api/privacypolicy/") => {
    return {
      fetchAll: () => axios.get(url + "get"),
      update: (id, updateRecord) =>
        axios.put(url + "update/" + id, updateRecord)
    };
  };
  const addOrEdit = (formData) => {
    applicationAPI()
      .update(formData.get("privacyPolicyId"), formData)
      .then((res) => {
        handleSuccess("Privacy Policy Updated");
        refreshPrivacyPolicylist();
      });
  };
  function refreshPrivacyPolicylist() {
    applicationAPI()
      .fetchAll()
      .then(
        res => setValues(res.data[0])
      )
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    refreshPrivacyPolicylist();
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
              Dashboard <i className="fa fa-angle-right" /> Privacy Policy
            </span>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                  <h6 className="mb-3">Privacy Policy</h6>
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
                        className={
                          "form-control" + applyErrorClass("paraGraph")
                        }
                        name="paraGraph"
                        type="text"
                        value={values.paraGraph}
                        onChange={handleInputChange}
                        placeholder="ParaGraph"
                      />
                      <label htmlFor="paraGraph">ParaGraph</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <input
                        className={
                          "form-control" + applyErrorClass("paraGraph1")
                        }
                        name="paraGraph1"
                        type="text"
                        value={values.paraGraph1}
                        onChange={handleInputChange}
                        placeholder="ParaGraph1"
                      />
                      <label htmlFor="paraGraph1">ParaGraph1</label>
                    </div>
                  </div>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
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
