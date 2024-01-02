import { Badge, Box, Heading, Text, Button, Input, Switch, Flex, Textarea, Image } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { baseUrl } from '../Urls';
import { Authcontext } from '../Context/AuthContext';
import { ImBin2 } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import "../App.css"
import {Droppable} from "react-beautiful-dnd"

const PreviousCard = ({ title, isPrivate, tags, description , _id, handleChildData, imageUrl }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [editedTags, setEditedTags] = useState(tags || []);
  const [editedIsPrivate, setEditedIsPrivate] = useState(isPrivate);

  console.log(imageUrl)

  const {token} = useContext(Authcontext)

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // console.log({editedTitle, editedDescription, editedTags, editedIsPrivate, })
    const data = {
      title:editedTitle,
      description: editedDescription,
      tags:editedTags,
      isPrivate : editedIsPrivate
    }

    axios({
      method:"PATCH",
      url: `${baseUrl}/notes/update/${_id}`,
      headers :{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      data : JSON.stringify(data)
    }).then((res)=>console.log(res)).catch((err)=>console.log(err))
  
    // Add logic to save the edited data, e.g., send a request to update the card
    // For simplicity, I'm just toggling back to non-edit mode here
    setIsEditing(false);
  };

  const handleDelete = () =>{
    axios({
      method:"Delete",
      url: `${baseUrl}/notes/delete/${_id}`,
      headers :{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
    }).then((res)=>{
      console.log(res)
    handleChildData(res)
    }).catch((err)=>console.log(err))
    
  }

  return (
    <div  >
      <Box className="button-85"  m={4} p={4} boxShadow={"md"} width={400}>
        {isEditing ? (
          <>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              mb={2}
            />
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              mb={2}
            />
            {editedTags.map((tag, i) => (
              <Badge m={2} key={i}>
                {tag}
              </Badge>
            ))}
            <Flex mb={2}>
              <Input
                value={editedTags.join(', ')}
                onChange={(e) => setEditedTags(e.target.value.split(',').map(tag => tag.trim()))}
              />
            </Flex>
            <Flex alignItems="center" mb={2}>
              <Switch
                isChecked={editedIsPrivate}
                onChange={() => setEditedIsPrivate(!editedIsPrivate)}
                mr={2}
              />
              <Text>Private</Text>
            
            </Flex>
            <Button colorScheme="teal" onClick={handleSaveClick} m={2}>
              Save
            </Button>
          </>
        ) : (
          <>

         


            <Heading color={"  #c0c0c0"}>{editedTitle}</Heading>
            <Text mt={2} mb={2} >{editedDescription}</Text>
            {editedTags.map((tag, i) => (
              <Badge m={2} key={i}>
                {tag}
              </Badge>
            ))}
           
       <Image src={`${baseUrl}/${imageUrl}`} margin={"auto"} maxH={"20vh"} maxW={"20vw"} />
      
      <Flex alignItems="center" mb={2}> <Text> {isPrivate && "Private"} </Text> </Flex>

      <Flex justifyContent={"space-between"} >
          
          {/* <---- Edit Button ----> */}
          <Box  _hover={{color:"#ff5733"}}  color='#ffff' >
              <FaEdit size={20} onClick={handleEditClick}  />
          </Box>
         
          
          {/* <---- Delete Button ----> */}
          <Box  _hover={{color:"#ff5733"}}  color='#ffff' >
               <ImBin2  color='#ffff' size={20} onClick={handleDelete} />
          </Box>
        
        </Flex>
             
          </>
        )}
      </Box>
    </div>
  );
};

export default PreviousCard;
