import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Style/Form.css";

const ResetPasswordPage = () => {
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramsToken = searchParams.get("token");
  const email = searchParams.get("email");

  const validateToken = async () => {
    try {
      let res = await axios.get(
        "https://markdownpreview-backend.onrender.com/api/user/listallusers"
      );

      if (res.data && res.data.users) {
        const reqUser = res.data.find((user) => user.email === email);
        if (reqUser) {
          const tokenCheck = reqUser.token === paramsToken;
          if (!tokenCheck) {
            navigate("/error");
          }
        } else {
          console.log("User not found for email:", email);
        }
      } else {
        console.log("Invalid response data:", res.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const initialValues = { password: "", confirmPassword: "" };

  const validationSchema = Yup.object({
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword: Yup.string()
      .min(8)
      .required("Confirm password is required"),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.put(
        "https://markdownpreview-backend.onrender.com/api/user/resetpassword",
        { ...values, email }
      );

      setResponseMsg(res.data.message);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setResponseMsg(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  useEffect(() => {
    validateToken();
  }, []);
  const toggleMode = () => {
    navigate("/login");
  };

  return (
    <div className="container ">
      <div class="forms-container">
        <div class="signin-signup">
          <form class="sign-in-form" onSubmit={formik.handleSubmit}>
            <h2 class="title">Reset Password</h2>
            <div className="input-field">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter New password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="errors">
                <span className="text-danger">{formik.errors.password}</span>
              </div>
            </div>
            <div className="input-field">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <div className="errors">
                <span className="text-danger">
                  {formik.errors.confirmPassword}
                </span>
              </div>
            </div>
            <button type="submit" className="btn-success btn">
              Set Password
            </button>
          </form>
        </div>
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Set Password</h3>
              <p>Set a new password for your account.</p>
            </div>
            <img src="/reset.svg" class="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;