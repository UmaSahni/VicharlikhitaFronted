import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../Urls";
import { Authcontext } from "../Context/AuthContext";
import PreviousCard from "./PreviousCard";
import { GridItem, SimpleGrid, Box, Flex } from "@chakra-ui/react";

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

  return (
    <div>
      {/* <SimpleGrid columns={[1, 1, 2]} spacing={10}> */}
      <Flex gap={3} justifyContent={"center"} w={"100%"} flexWrap={"wrap"} >
        {notes?.map((el) => (
          <PreviousCard {...el} key={el._id} handleChildData={handleChildData} />
        ))}
        </Flex>
      {/* </SimpleGrid> */}
    </div>
  );
};

export default PreviousNote;
