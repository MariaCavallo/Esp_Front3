import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {useRouter} from 'next/router'
import React, { ChangeEvent, FormEvent, FormEventHandler, MouseEvent, useState } from 'react'

const Login = () => {
    const [user, setUser] = useState({email: "", password: ""})
    const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target
      setUser((prevState) => ({ 
        ...prevState,
        [name]: value
   }))
   console.log(value);
  }

  const handleSubmit =  async ()=>{
    const res = await fetch("http://localhost:3000/api/login", 
    {method: "POST", body: JSON.stringify(user), headers: {
      'Content-Type': 'application/json'
    }})

    if(res.status === 200) router.push("/home")
    else alert("Please check your info")
  }


  return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our <Link color={'orange.400'}>experience</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleChange} name="email"/>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={handleChange} name="password" />
              <Button
                onClick={handleSubmit}
                type="submit"
                bg={'orange.400'}
                color={'white'}>
                Sign in
              </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
);
}

export default Login  
