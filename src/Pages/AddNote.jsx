import { Flex, Spacer , Box} from "@chakra-ui/react";
import React from "react";
import Add from "../Components/Add";
import PreviousNote from "../Components/PreviousNote";


const AddNote = () => {
  return (
    <div>
      <Flex 
       flexDirection={{
        base: 'column', // default value for small screens
        md: 'column', // value for medium screens
        lg: 'row', // value for large screens
      }}
      border={"1px"}>
        <Box minWidth={"35%"} >
          <Add />
        </Box>

        <Box>
        <PreviousNote />
        </Box>
        
      </Flex>
    </div>
  );
};

export default AddNote;
