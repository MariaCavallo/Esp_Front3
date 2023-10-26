import type { NextApiRequest, NextApiResponse } from 'next'
import { users } from '../../../data'

type DBStudent = {
  email: string,
  password: string,
  role: "Student" | "Profesor"
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password }: DBStudent = req.body

  const findUser = users.find(user => user.email === email && user.password === password) 

  if(!findUser){
    return res.status(403).send({message: "Error"})
  }

    res.setHeader("set-cookie", `Access=true; path=/; samesite=lax; httponly;`)
    return res.status(200).send({message: "Login successfully"})
}

export default handler