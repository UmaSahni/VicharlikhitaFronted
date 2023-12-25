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

  const { token } = useContext(Authcontext);

  // x -> button to delete a perticular tag
  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  // Add Note in DB
  const handleSubmit = (event) => {
    event.preventDefault()

    const noteData = {
      title,
      description,
      tags,
      isPrivate,
    };

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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(noteData),
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

    console.log("Submitted Note:", noteData);
    setTags([]);
    setTitle("");
    setDescription("");
    setIsPrivate(false);
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
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              isRequired
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
          width={"full"}
            onClick={handleSubmit}
            isDisabled={loading || error ? true : false}
            colorScheme="teal"
          >
            {loading ? "Saving..." : error ? "An Error Occured" : "save"}
          </Button>
      
      </Box>
    </Box>
  );
};

export default NoteForm;
