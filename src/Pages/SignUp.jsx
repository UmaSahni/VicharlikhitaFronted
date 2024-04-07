// SignUp.jsx
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { baseUrl } from "../Urls";

const SignUp = () => {

  const initailState = {
    name : "",
    email:"",
    pass:""
  }

const [state, setState] = useState(initailState)
const [show, setShow] = useState(true)

const handleChange = (e)=>{
    const {name, value} = e.target
    setState(pre => ({...pre, [name]:value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    toast.loading('Signing up...')
    axios.post(`${baseUrl}/user/reg`, state).then((res)=>{
     toast.dismiss()
      console.log(res)
      if(res.data.message === "User already exits. Please login"){
              toast(<b> User already registered.  Please login! </b>, {   icon: 'ℹ️',  });
      }
      else{
         toast.success(<b>Registration Successful</b>)
      }
     
    })
    .catch((err)=>{
      toast.dismiss()
      console.log(err)
      toast.error(err.response ? err.response.data.message : 'An error occurred')
    })
    // console.log('Sign-up form submitted!');
  };

  return (
   
    <Box  p={8} mt={10} bg={"brand.BoxBase"} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" mx="auto">
      <Toaster/>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input isRequired onChange={handleChange} value={state.name} name='name'  type="text" placeholder="Enter your username" focusBorderColor="teal.400" />
          </FormControl>

          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input isRequired  onChange={handleChange} value={state.email} type="email" name='email' placeholder="Enter your email" focusBorderColor="teal.400" />
          </FormControl>

           <FormControl mb={4}>
      <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input onChange={handleChange} value={state.pass} name='pass' type={show ? "text" : "password"} placeholder="Enter your password" focusBorderColor="teal.400" />
          <InputRightElement bg={"white"} borderRightRadius={"10"} width={"4rem"}   >  <Button   onClick={()=>setShow(!show)} >{show ? "Hide" : "Show"}</Button> </InputRightElement>
        </InputGroup>
        </FormControl>

          <Button type="submit" className='button-50' size="lg" fontSize="md">
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
   
  );
};

export default SignUp;
