import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Registerpage from './Components/RegisterPage';
import ForgotPasswordPage from './Components/ForgotPasswordPage';
import ResetPasswordPage from './Components/ResetPasswordPage';
import LoginPage from './Components/LoginPage'
import HomePage from './Components/HomePage'
import NavBar from './Components/Navbar';
import CreateMarkdown from './Components/CreateMarkDown';
import MarkDownList from './Components/MarkDownList';
import Chart from './Components/Chart';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [markdownList, setMarkdownList] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/markdown-list")
      .then((response) => {
        setMarkdownList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Markdown list:", error);
      });
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
  }, [token, username, email]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registerpage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                SetUserName={setUsername}
                SetEmail={setEmail}
                SetToken={setToken}
              />
            }
          />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />
          <Route
            path="/home"
            element={
              <>
                <NavBar />
                <HomePage username={username} email={email} />
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <NavBar />
                <CreateMarkdown
                  markdownList={markdownList}
                  setMarkdownList={setMarkdownList}
                />
              </>
            }
          />
          <Route
            path="/list"
            element={
              <>
                <NavBar />
                <MarkDownList
                  markdownList={markdownList}
                  setMarkdownList={setMarkdownList}
                />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <NavBar />
                <Chart />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;