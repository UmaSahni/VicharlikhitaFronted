import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../Urls";
import { Authcontext } from "../Context/AuthContext";
import PreviousCard from "./PreviousCard";
import { GridItem, SimpleGrid, Box, Flex } from "@chakra-ui/react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"

const PreviousNote = ({getallNoteState}) => {
  const [notes, setNotes] = useState([]);
  const { token } = useContext(Authcontext);
  
  const getAllNotes = () => {
    axios({
      method: "GET",
      url: `${baseUrl}/notes`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setNotes(res.data.allNotes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllNotes();
  }, [getallNoteState]);

  const handleChildData = (data) =>{
    console.log(data, "Data comming from child")
    getAllNotes()
  }

  const reoder = (list, startIndex, endIndex) =>{
    const result = Array.from(list) // copy the list array in result
    const [removed] = result.splice(startIndex, 1) // remove 1 element from start index
    result.splice(endIndex, 0, removed) // In the end index add that elemnet
    return result
  }

  const onDragEnd = (result) =>{
    if(!result.destination) return
    const reoderedItems = reoder(notes, result.source.index, result.destination.index)
    setNotes(reoderedItems)
  }
 
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd} >
      {/* <SimpleGrid columns={[1, 1, 2]} spacing={10}> */}
       <Droppable droppableId='dropable' >
          {
            (provided, snapshot) => (
              <Box
              {...provided.droppableProps }
              ref={provided.innerRef}
              > 
              
              <Flex gap={3} justifyContent={"center"} w={"100%"} flexWrap={"wrap"} >
        {notes?.map((el, i) => (
          <Draggable key={el._id } draggableId={el._id} index={i} >
              {
                (provided, snapshot) => (
                  <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  
                  >
                  <PreviousCard {...el} key={el._id} handleChildData={handleChildData} />
                  </Box>
                )
              }
          </Draggable>
          // 
        ))}
        </Flex>
              
              </Box>
            )
          }
          </Droppable>
      
      {/* </SimpleGrid> */}
      </DragDropContext>
    </div>
  );
};

export default PreviousNote;
