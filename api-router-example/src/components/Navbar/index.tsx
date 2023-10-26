import {
  Box,
  Flex,
  Avatar,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link'



export default function Navbar() {

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <NextLink href='/home' passHref>
                <p>Home</p>
              </NextLink>
              <NextLink href='/students' passHref>
                <p>Students</p>
              </NextLink>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Avatar
              size={'sm'}
              cursor="pointer"
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}