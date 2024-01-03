import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [name, setName] = useState("")
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    console.log(selectedFile)
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", name)
    try {
      const response = await fetch("http://localhost:8080/img/upload", {
        method: "POST",
        body: formData,
      });

      // Handle the response from the server
      console.log("File uploaded successfully", response);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };
  return (
    <div>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Input required type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      <Button onClick={handleUpload}>Submit</Button>
    </div>
  );
};

export default UploadImage;
