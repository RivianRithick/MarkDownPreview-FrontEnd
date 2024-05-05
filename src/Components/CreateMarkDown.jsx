import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import './Style/CreateMarkDown.css'
import { ToastContainer, toast } from "react-toastify";
import { marked } from "marked";

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

  const downloadHtml = () => {
    const element = document.createElement("a");
    const htmlContent = marked(newMarkdownContent);
    const file = new Blob([htmlContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "markdownFile.html";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
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
      <div className="button-container">
        <button onClick={() => SaveData(data, email)}>Save</button>
        <button onClick={downloadHtml}>Download</button>
      </div>
    </main>
  );
}

export default CreateMarkdown;
