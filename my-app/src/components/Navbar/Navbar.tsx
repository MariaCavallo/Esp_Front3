import Image from 'next/image'
import React, { useContext } from 'react'
import Link from 'next/link'
import style from '../../styles/pokemons.module.css'
import { Locale } from '../../pages/_app'
import { contentBr } from '../locales/br'
import { contentEn } from '../locales/en'
import { contentEs } from '../locales/es'

const Navbar = () => {

    const locale = useContext(Locale);
    const content = locale === "es" ? contentEs : (locale === "br" ? contentBr : contentEn);

    return (
        <nav className={style.nav}>
            <Link href={"/"}>
                <div className={style.logoAndName}>
                    <Image src="/pokebola.avif" alt='logo' height={50} width={50}/>
                    <h1>{content.title}</h1>
                </div>
            </Link>
            <div className={style.linksNav}>
                <Link className={style.es} href="/" locale="es"><Image src="/espana.avif" alt='spain' width={25} height={25}/></Link>
                <Link className={style.en} href="/" locale="en"><Image src="/reino-unido.avif" alt='english' width={25} height={25}/></Link>
                <Link className={style.br} href="/" locale="br"><Image src="/portugal.avif" alt='portugues' width={25} height={25}/></Link>
            </div>
        </nav>
    )
}

export default Navbar