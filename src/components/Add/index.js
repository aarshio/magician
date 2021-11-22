import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";

import { Button, TextField } from "@mui/material";

import "react-quill/dist/quill.snow.css";

import { addPost } from "../../api";

const Add = ({ symbol, setValue }) => {
  const [content, setContent] = useState("");
  const [secret, setSecret] = useState("");
  useEffect(() => {
    setContent(localStorage.getItem(`magician/${symbol}`));
  }, [symbol]);

  const handleChange = (value) => {
    console.log(value);
    setContent(value);
    setSecret(value);
    // store into localsorage
    localStorage.setItem(`magician/${symbol}`, value);
  };
  const handleSubmit = () => {
    addPost({ symbol: symbol, secret: secret, data: content }).then((res) => {
      console.log(res);
      setContent("");
      setValue(0);
      localStorage.setItem(`magician/${symbol}`, "");
    });
  };

  return (
    <>
      <ReactQuill
        style={{ height: 400, marginBottom: 70 }}
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
      />
      <TextField
        size="small"
        id="filled-basic"
        label="Secret"
        variant="filled"
        onChange={(e) => setSecret(e.target.value)}
      />
      <Button
        disabled={secret.trim() === ""}
        style={{ margin: "0.5rem" }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default Add;
