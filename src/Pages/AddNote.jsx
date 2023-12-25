import { Flex, Spacer , Box} from "@chakra-ui/react";
import React, { useState } from "react";
import Add from "../Components/Add";
import PreviousNote from "../Components/PreviousNote";


const AddNote = () => {
const [getallNoteState, setGetAllNotesState] = useState(false)

  const handleStateFromChild = () =>{
    setGetAllNotesState(!getallNoteState)
  }

  return (
    <div>
      <Flex 
      bg={"#1f3343"}
     
       flexDirection={{
        base: 'column', // default value for small screens
        md: 'column', // value for medium screens
        lg: 'row', // value for large screens
      }}
      >
        <Box minWidth={"35%"} >
          <Add handleStateFromChild={handleStateFromChild } />
        </Box>

        <Box width={"100%"}  >
          <Box display={"flex"} justifyContent={"center"} >
          <PreviousNote  getallNoteState={getallNoteState} />
          </Box>
        </Box>
        
      </Flex>
    </div>
  );
};

export default AddNote;
