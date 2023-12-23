import { Flex, Spacer , Box} from "@chakra-ui/react";
import React from "react";
import Add from "../Components/Add";
import PreviousNote from "../Components/PreviousNote";


const AddNote = () => {
  return (
    <div>
      <Flex 
      bg={"#1f3343"}
      height={"100vh"}
       flexDirection={{
        base: 'column', // default value for small screens
        md: 'column', // value for medium screens
        lg: 'row', // value for large screens
      }}
      >
        <Box minWidth={"35%"} >
          <Add />
        </Box>

        <Box width={"100%"}  >
          <Box display={"flex"} justifyContent={"center"} >
          <PreviousNote />
          </Box>
        </Box>
        
      </Flex>
    </div>
  );
};

export default AddNote;
