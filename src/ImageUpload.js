import { Button } from "@mui/material";
import React, { useState } from "react";
import "./ImageUpload.css";
import { storage } from "./firebase";
import { ref } from "firebase/storage";

function ImageUpload() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a caption"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
