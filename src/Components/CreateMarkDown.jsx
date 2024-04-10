import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import './Style/CreateMarkDown.css'
import { ToastContainer, toast } from "react-toastify";

function CreateMarkdown({ newMarkdownContent, setNewMarkdownContent }) {

  const data = newMarkdownContent;
  const email = localStorage.getItem("email");
  const SaveData = async (data, email) => {
    try {
      const users = await axios.post(
        `https://markdownpreview-backend.onrender.com/api/user/save/${email}`,
        {
          data: data,
        }
      );
      console.log(data);
      toast.success(users.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <main>
      <section className="markdown">
        <textarea
          value={newMarkdownContent}
          onChange={(e) => setNewMarkdownContent(e.target.value)}
          required
          className="input"
        />
        <article className="result">
          <ReactMarkdown>{newMarkdownContent}</ReactMarkdown>
        </article>
      </section>
      <button onClick={() => SaveData(data, email)}>Save</button>
    </main>
  );
}

export default CreateMarkdown;
