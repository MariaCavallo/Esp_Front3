import type { NextApiRequest, NextApiResponse } from 'next'

export type Student = {
  name: string,
  avatar: string,
  quote: string,
  id: string
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Student[]>) => {
  const response = await fetch("https://65399e27e3b530c8d9e88c1f.mockapi.io/api/students")
  const students: Student[] = await response.json()
  res.status(200).json(students) 
}

export default handler