import React, { useState, useEffect } from 'react';
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



const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [markdownList, setMarkdownList] = useState([]);
  const [newMarkdownContent, setNewMarkdownContent] = useState("# Markdown Viewer");


  useEffect(() => {
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
                newMarkdownContent={newMarkdownContent}
                setNewMarkdownContent={setNewMarkdownContent}
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
                <NavBar
                  newMarkdownContent={newMarkdownContent}
                  setNewMarkdownContent={setNewMarkdownContent}
                />
                <CreateMarkdown
                  newMarkdownContent={newMarkdownContent}
                  setNewMarkdownContent={setNewMarkdownContent}
                />
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