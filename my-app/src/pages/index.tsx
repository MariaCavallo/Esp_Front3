import Link from 'next/link'
import React, { useContext } from 'react'
import style from '../styles/pokemons.module.css'
import { NextPage } from 'next'
import Head from 'next/head'
import { Locale } from './_app'
import { contentEs } from '../components/locales/es'
import { contentBr } from '../components/locales/br'
import { contentEn } from '../components/locales/en'

const Index: NextPage = () => {

    const locale = useContext(Locale);
    const content = locale === "es" ? contentEs : (locale === "br" ? contentBr : contentEn);

    return (
        <div className={style.pokemonAppContainer}>
            <Head>
                <title>Pokemons World</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
                <meta name='description' content='Web de pokemons con next.js'/>
                <link rel='icon' href='/pokebola.avif'/>
            </Head>
            <div className={style.cardHome}>
                <h1>{content.subtitle}</h1>
                <br />
                <Link className={style.linkApp} href="/pokemons">{content.linkIr}</Link>
            </div>
        </div>
    )
}

export default Index