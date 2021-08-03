import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
const initialFieldValues = {
  aboutUsId: 0,
  title: "",
  paraGraph: "",
  paraGraph1: "",
  subTitle: "",
  subTitle1: "",
  subTitle2: "",
  subParaGraph: "",
  subParaGraph1: "",
  subParaGraph2: "",
};
export default function AboutUs(props) {
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
    temp.subTitle = values.subTitle === "0" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("aboutUsId", values.aboutUsId);
      formData.append("title", values.title);
      formData.append("paraGraph", values.paraGraph);
      formData.append("paraGraph1", values.paraGraph1);
      formData.append("subTitle", values.subTitle);
      formData.append("subTitle1", values.subTitle1);
      formData.append("subTitle2", values.subTitle2);
      formData.append("subParaGraph", values.subParaGraph);
      formData.append("subParaGraph1", values.subParaGraph1);
      formData.append("subParaGraph2", values.subParaGraph2);
      console.log(values);
      addOrEdit(formData);
    }
  };
  const applicationAPI = (url = "https://localhost:44373/api/aboutus/") => {
    return {
      fetchAll: () => axios.get(url + "get"),
      create: (newRecord) => axios.post(url + "insert", newRecord),
      update: (id, updateRecord) =>
        axios.put(url + "update/" + id, updateRecord)
    };
  };
  const addOrEdit = (formData) => {
    applicationAPI()
      .update(formData.get("aboutUsId"), formData)
      .then((res) => {
        handleSuccess("AboutUs Updated");
        refreshAboutUsList();
      });
  };
  function refreshAboutUsList() {
    applicationAPI()
      .fetchAll()
      .then(
        res => setValues(res.data[0])
      )
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    refreshAboutUsList();
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
              Dashboard <i className="fa fa-angle-right" /> About Us
            </span>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                  <h6 className="mb-3">About Us</h6>
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
                        type="paraGraph1"
                        value={values.paraGraph1}
                        onChange={handleInputChange}
                        placeholder="ParaGraph1"
                      />
                      <label htmlFor="paraGraph1">ParaGraph1</label>
                    </div>
                  </div>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <input
                        className={"form-control" + applyErrorClass("subTitle")}
                        name="subTitle"
                        type="text"
                        value={values.subTitle}
                        onChange={handleInputChange}
                        placeholder="SubTitle"
                      />
                      <label htmlFor="subTitle">SubTitle</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <input
                        className={
                          "form-control" + applyErrorClass("subTitle1")
                        }
                        name="subTitle1"
                        type="text"
                        value={values.subTitle1}
                        onChange={handleInputChange}
                        placeholder="SubTitle1"
                      />
                      <label htmlFor="subTitle1">SubTitle1</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <input
                        className={
                          "form-control" + applyErrorClass("subTitle2")
                        }
                        name="subTitle2"
                        type="text"
                        value={values.subTitle2}
                        onChange={handleInputChange}
                        placeholder="SubTitle2"
                      />
                      <label htmlFor="subTitle2">SubTitle2</label>
                    </div>
                  </div>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <input
                        className={
                          "form-control" + applyErrorClass("subParaGraph")
                        }
                        name="subParaGraph"
                        type="text"
                        value={values.subParaGraph}
                        onChange={handleInputChange}
                        placeholder="SubParaGraph"
                      />
                      <label htmlFor="subParaGraph">SubParaGraph</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <input
                        className={
                          "form-control" + applyErrorClass("subParaGraph1")
                        }
                        name="subParaGraph1"
                        type="text"
                        value={values.subParaGraph1}
                        onChange={handleInputChange}
                        placeholder="SubParaGraph1"
                      />
                      <label htmlFor="subParaGraph1">SubParaGraph1</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <input
                        className={
                          "form-control" + applyErrorClass("subParaGraph2")
                        }
                        name="subParaGraph2"
                        type="text"
                        value={values.subParaGraph2}
                        onChange={handleInputChange}
                        placeholder="SubParaGraph2"
                      />
                      <label htmlFor="subParaGraph2">SubParaGraph2</label>
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
