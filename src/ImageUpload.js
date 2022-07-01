import { Button } from "@mui/material";
import React, { useState } from "react";
import "./ImageUpload.css";
import { storage } from "./firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import { getDatabase, set } from "firebase/database";

function ImageUpload() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const writeData = (caption, imageUrl, username) => {
    const db = getDatabase();
    set(ref(db, `posts/`), {
      caption: caption,
      imageUrl: imageUrl,
      username: username,
    });
  };

  const handleUpload = () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    // uploadBytes(imageRef, image).then((snapshot) => {
    //   console.log(snapshot);
    // });

    const uploadTask = uploadBytesResumable(
      imageRef,
      `images/${image.name + v4()}`
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + "%done");
        switch (snapshot.state) {
          case "paused":
            console.log();
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // writeData("some random text", `${downloadURL}`, "marek");
        });
      }
    );
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
