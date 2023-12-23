import { Badge, Box, Heading, Text, Button, Input, Switch, Flex, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { baseUrl } from '../Urls';
import { Authcontext } from '../Context/AuthContext';

const PreviousCard = ({ title, isPrivate, tags, description , _id}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [editedTags, setEditedTags] = useState(tags || []);
  const [editedIsPrivate, setEditedIsPrivate] = useState(isPrivate);

  const {token} = useContext(Authcontext)

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    console.log({editedTitle, editedDescription, editedTags, editedIsPrivate, })
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

  return (
    <div>
      <Box bgColor={"#40556076"} m={4} p={4} boxShadow={"md"} width={400}>
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
            <Text>{editedDescription}</Text>
            {editedTags.map((tag, i) => (
              <Badge m={2} key={i}>
                {tag}
              </Badge>
            ))}
            <Flex alignItems="center" mb={2}>
              <Switch isChecked={editedIsPrivate} mr={2} isDisabled />
              <Text>Private</Text>
            </Flex>
            <Button colorScheme="blue" onClick={handleEditClick} m={2}>
              Edit
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default PreviousCard;
