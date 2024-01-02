import { Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const UploadImage = () => {
     const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange =  (event) => {
    setSelectedFile(event.target.files[0]);
  };

    const handleUpload = async () =>{
        const formData = new FormData();
       formData.append('image', selectedFile);

       try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle the response from the server
      console.log('File uploaded successfully', response);
    } catch (error) {
      console.error('Error uploading file', error);
    }

    }
  return (
    <div>
        <Input type="file" onChange={handleFileChange}  />
        <Button onClick={handleUpload} >Submit</Button>
    </div>
  )
}

export default UploadImage