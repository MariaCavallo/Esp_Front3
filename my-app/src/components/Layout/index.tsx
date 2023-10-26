import { NextPage } from 'next'
import React from 'react'
import Navbar from '../Navbar/Navbar'

interface Props {
    children: React.ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {
    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout