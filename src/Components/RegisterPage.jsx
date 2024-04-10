import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Style/Form.css";

const Registerpage = () => {
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .matches(/^[A-Za-z][A-Za-z0-9_]{3,29}$/g, "Invalid Username")
      .required("Firstname is Required"),
    lastname: Yup.string()
      .matches(/^[A-Za-z][A-Za-z0-9_]{3,29}$/g, "Invalid Username")
      .required("Lastname is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email address")
      .required("Email is Required"),
    password: Yup.string().min(8).required("Password is Required"),
  });

  const onSubmit = async (values) => {
    console.log("Register Api Payloads", values);
    try {
      // If user doesn't exist, proceed with registration
      const registerRes = await axios.post(
        "http://localhost:4000/api/user/register",
        values
      );
      setResponseMsg(registerRes.data.message);
      toast.success(registerRes.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response) {
        setResponseMsg(err.response.data.message);
        toast.error(err.response.data.message);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const [signUpMode, setSignUpMode] = useState(false);
  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
    navigate("/login");
  };

  return (
    <div>
      <div class={`container  ${signUpMode ? "sign-up-mode" : ""}`}>
        <div class="forms-container">
          <div class="signin-signup">
            <form onSubmit={formik.handleSubmit}>
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  aria-describedby="emailHelp"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  placeholder="Firstname"
                />
                <div className="errors">
                  <span className="text-danger">{formik.errors.firstname}</span>
                </div>
              </div>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  aria-describedby="emailHelp"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  placeholder="Lastname"
                />
                <div className="errors">
                  <span className="text-danger">{formik.errors.lastname}</span>
                </div>
              </div>
              <div className="input-field">
                <i class="fas fa-envelope"></i>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                />
                <div className="errors">
                  <span className="text-danger">{formik.errors.email}</span>
                </div>
              </div>
              <div className="input-field">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Password"
                />
                <div className="errors">
                  <span className="text-danger">{formik.errors.password}</span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Already Registered?</h3>
              <br />
              <button
                class="btn transparent"
                id="sign-in-btn"
                onClick={toggleMode}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;