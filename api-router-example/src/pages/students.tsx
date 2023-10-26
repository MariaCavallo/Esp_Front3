import { InferGetServerSidePropsType } from 'next'
import Navbar from '../components/Navbar'
import { Card } from '../components/Cards'
import { Flex } from '@chakra-ui/react'
import { Student } from './api/quotes'


export const getServerSideProps = async () => {
    const res = await fetch("http://localhost:3000/api/quotes")
    const students: Student[]= await res.json()
    return { 
      props: { students }
    }
  }
  
type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const Students = ({students}: Props) => {
  return (
    <>
      <Navbar/>
      <Flex
      textAlign={'center'}
      pt={10}
      justifyContent={'center'}
      direction={'column'}
      width={'full'}>
          {students?.map(data => <Card student={data} key={data.id} />)}
      </Flex>
    </>
  )
}

export default Students