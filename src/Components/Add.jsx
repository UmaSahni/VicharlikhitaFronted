// NoteForm.jsx
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  Switch,
  Heading,
} from "@chakra-ui/react";
import { baseUrl } from "../Urls";
import { Authcontext } from "../Context/AuthContext";
import { FaPlus } from "react-icons/fa";
import "../App.css"

const NoteForm = ({ handleStateFromChild }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [myTag, setMyTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { token , userID } = useContext(Authcontext);

 

   
    // Handle image file change
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImageFile(file);
    };

  // x -> button to delete a perticular tag
  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  // Add Note in DB
  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(imageFile)

   const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    formData.append("isPrivate", isPrivate);
     // Check if an image file is selected
    if (imageFile) {
      formData.append("image", imageFile, imageFile.name);
    }
    formData.append("userId", userID )

    setLoading(true);

    // fetch(`${baseUrl}/notes/add`, {
    //   method: "POST",
    //   headers : {
    //     "Content-Type": "application/json",
    //     'Authorization': `Bearer ${token}`,
    //   },
    //   body : JSON.stringify(noteData)
    // }).then((res)=>res.json()).then((data)=>console.log(data)).catch((err)=>console.log(err))

    axios({
      method: "POST",
      url: `${baseUrl}/notes/add`,
      headers: {
         "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data:  formData,
    })
      .then((res) => {
        console.log(res);
        if (res.data.msg == "Token did not found") {
          toast(<b> Please Login! </b>);
        }
        setLoading(false);
        console.log(res);

        if (res.data.msg == "New note added") {
          handleStateFromChild(res.data.msg);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err, error);
      });

    console.log("Submitted Note:", formData);
    setTags([]);
    setTitle("");
    setDescription("");
    setIsPrivate(false);
    setImageFile(null)
  };

  // add tag in tags array
  const handleTag = (event) => {
    event.preventDefault();

    if (!tags.includes(myTag)) {
      setTags([...tags, myTag]);

      console.log(tags);
    }
    setMyTags("");
  };

  return (
    <Box borderRadius={"10px"} minH={"85vh"} m={4}  p={4} color={"white"} bgColor={"#1f2a37aa"} >
      <Toaster />
      <Box m={5}>
       <Heading textAlign={"center"} >Create Note</Heading>
          <FormControl isRequired  mb={4}>
            <FormLabel >Title</FormLabel>
            
            <Input
              
              color={" #ffcc00"}
              fontWeight={"bold"}
              fontSize={"lg"}
              name="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
          </FormControl>

          
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
            focusBorderColor="teal.500"
              color={" #ffcc00"}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Flex maxWidth={"500"} flexWrap="wrap">
            {tags.map((tag) => (
              <Tag key={tag} mr={2} mb={2} variant="subtle" colorScheme="teal">
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag)} />
              </Tag>
            ))}
          </Flex>

          <FormControl mb={4}>
            <FormLabel>Tags</FormLabel>
           <form onSubmit={handleTag} >
              <Box gap={2} display={"flex"}>
                <Input
                  color={" #ffcc00"}
                  value={myTag}
                  onChange={(e) => setMyTags(e.target.value)}
                />
                <Button type="submit"  ><FaPlus /></Button>
              </Box>
            </form>
          </FormControl>
          
          <FormControl mb={4}>
            <FormLabel>Image</FormLabel>
              <Input
                variant='flushed'
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
          </FormControl>


          <FormControl display="flex" alignItems="center" mb={4}>
            <FormLabel htmlFor="private-switch" mb="0">
              Private
            </FormLabel>
            <Switch
              id="private-switch"
              isChecked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
              ml={2}
            />
          </FormControl>


          <Button
         className="button-50"
          width={"full"}
            onClick={handleSubmit}
            isDisabled={loading || error ? true : false}
            // colorScheme="teal"
            bgColor={"#1f2a37"}
            color={"white"}
          >
            {loading ? "Saving..." : error ? "An Error Occured" : "save"}
          </Button>
      
      </Box>
    </Box>
  );
};

export default NoteForm;
