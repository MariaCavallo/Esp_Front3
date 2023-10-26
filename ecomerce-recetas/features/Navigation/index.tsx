import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from '../../styles/Home.module.css'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
      <div className='container-fluid'>
        <Link href="/">
          <Image src="/logo.png" alt='logo' className={style.navLink} width={50} height={50} />
        </Link>
        <Link href="/products"><a className='nav-link'>Home</a></Link>
        <Link href="/products/offers"><a className='nav-link'>Sale</a></Link>
      </div>
    </nav>
  )
}

export default NavBar