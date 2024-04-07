import { Box, Heading, FormControl, FormLabel, Input, Button, Text, InputRightElement, InputGroup } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../Urls';
import toast, { Toaster } from 'react-hot-toast';
import { Authcontext } from '../Context/AuthContext';

const LoginForm = () => {
  const [state, setState] = useState({email: "", pass:""})
  const [show, setShow] = useState(true)
 
 const {setIsAuth, Isauth, token, setToken, userID, setUserId} = useContext(Authcontext)
      

  const handleChange = (e) =>{
    const {name, value} = e.target
    setState(pre =>({...pre, [name]:value}))
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    toast.loading(<b>...Signing In</b>)
    axios.post(`${baseUrl}/user/login`, state).then((res)=>{
      console.log(res)
      if(res.data.message == "User does exits. Please register"){
        toast.dismiss()
      toast(<b> ℹ️ User does exits. Please register</b>)
      }
      else if (res.data.message == "Login successful") {
      toast.dismiss()
      setToken(res.data.token)
      setUserId(res.data.userId)
     setIsAuth(true)
      console.log(res.data)
     
      toast.success(<b>You're Signed In</b>)
      }
      else{
        toast.dismiss()
        toast.error(<b>Error occur</b>)
      }
      
    }).catch((err)=>{
      console.log(err)
     
       toast.dismiss()
      toast.error(<b> {err.message} </b>)
    })
  }

   console.log( Isauth, token)
     

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
     bg={"brand.BoxBase"}
    >
      <Toaster/>
      <Heading mb={4} textAlign="center">Login</Heading>
      
      <form onSubmit={handleSubmit} >
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input isRequired  onChange={handleChange} value={state.name} name='email' type="email" placeholder="Enter your email" focusBorderColor="teal.400"/>
        </FormControl>
        
        <FormControl mb={4}>
      <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input isRequired onChange={handleChange} value={state.pass} name='pass' type={show ? "text" : "password"} placeholder="Enter your password" focusBorderColor="teal.400" />
          <InputRightElement width={"4rem"} bg={"white"} borderRightRadius={"10"}  >  <Button   onClick={()=>setShow(!show)} >{show ? "Hide" : "Show"}</Button> </InputRightElement>
        </InputGroup>
        </FormControl>


        <Button className='button-50' isDisabled={Isauth ? true : false}  type="submit"  size="lg" mt={4} w="100%">
          {Isauth ? "You are already signed in" :  "Sign In" }
          
        </Button>
      </form>

      <Text mt={4} textAlign="center">
        Don't have an account? <Link to={"/signup"} style={{color:"crimson"}}>Sign Up</Link>
      </Text>
    </Box>
  );
};

export default LoginForm;
