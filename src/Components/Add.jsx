// NoteForm.jsx
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
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

} from "@chakra-ui/react";
import { baseUrl } from "../Urls";
import { Authcontext } from '../Context/AuthContext';


const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [myTag, setMyTags] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const {token} = useContext(Authcontext)

  console.log(token)
 
  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };
  
  const handleSubmit = () => {
    // Handle form submission logic here
    const noteData = {
      title,
      description,
      tags,
      isPrivate,
    };

    setLoading(true)

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
      url : `${baseUrl}/notes/add`,
      headers : {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      data : JSON.stringify(noteData)
    }).then((res)=>{
      console.log(res)
      if(res.data.msg == "Token did not found"){
        toast(<b> Please Login! </b>)
      }
      setLoading(false)
      console.log(res)
    })
    .catch((err)=>{
      setLoading(false)
      setError(true)
      console.log(err, error)
    })

    console.log("Submitted Note:", noteData);
    setTags([])
    setTitle("")
    setDescription("")
    setIsPrivate(false)
  
  };

  // axios.post(`${baseUrl}/notes/add`, noteData)

  const handleTag = (e) => {
    e.preventDefault();
    if (!tags.includes(myTag)) {
      setTags([...tags, myTag]);
      
      console.log(tags);

     }
     setMyTags("");

    
  };

  return (
    <Box  color={"white"} borderRight={"1px solid"}>
      <Toaster/>
      <Box m={5}>
        <FormControl mb={4}>
          <FormLabel >Title</FormLabel>
          <Input
          color={" #ffcc00"}
          fontWeight={"bold"}
          fontSize={"lg"}
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
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
            <form  onSubmit={handleTag}>
              <Box display={"flex"} >
              <Input
              color={" #ffcc00"}
                value={myTag}
                onChange={(e) => setMyTags(e.target.value)}
              />
              <Button type="submit" >Add</Button>
              </Box>
            </form>
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

        <Button isDisabled={loading || error ? true : false}  colorScheme="teal" onClick={handleSubmit}>
          {
            loading ? "Saving..." : error ? "An Error Occured" : "save"
          }
        </Button>
      </Box>
    </Box>
  );
};

export default NoteForm;
