import { useContext, useEffect, useState } from 'react'
import { Pokemons } from './pokemonsType';
import Link from 'next/link';
import style from '../../styles/pokemons.module.css'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import { Locale } from '../_app';
import { contentBr } from '../../components/locales/br';
import { contentEn } from '../../components/locales/en';
import { contentEs } from '../../components/locales/es';
import { TiHome } from 'react-icons/ti'

interface Pokemon {
    name: string;
    url: string;
};

export default function Pokemons({ pokemonsData, prev, next }: { pokemonsData: Pokemon[], prev: string, next: string }) {

    const locale = useContext(Locale);
    const content = locale === "es" ? contentEs : (locale === "br" ? contentBr : contentEn);

    const [pokemons, setPokemons] = useState(pokemonsData);
    const [nextPage, setNextPage] = useState(next);
    const [previousPage, setPreviousPage] = useState(prev);

    const changePage = async (url: string) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setPokemons(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous)
            } else {
                console.error("Error al obtener datos:", response.statusText);
            }
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    }

    const getPokemonId = (url: string) => {
        const urlParts = url.split('/')
        return urlParts[urlParts.length - 2]
    }

    return (
        <div className={style.pokemonsContainer}>
            <Link className={style.linkHome} href={"/"}><TiHome /></Link>
            <h1>{content.titleList}</h1>
            <div className={style.cardListPokemons}>
                {pokemons.length > 0 ? (
                    pokemons.map((pokemon, index) => (
                        <div className={style.pokemonsList} key={index}>
                            <p>
                                <strong>{content.nombre}: </strong>
                                <Link className={style.nameLink} href={`/pokemons/${getPokemonId(pokemon.url)}`}>{pokemon.name}</Link>
                            </p>
                        </div>
                    ))
                ) : (
                    <p>{content.loadingText}</p>
                )}
            </div>
            <div className={style.buttonsContainer}>
                <button className={style.buttonPage} disabled={!previousPage ? true : false} onClick={() => changePage(previousPage)}>
                    <FaAngleDoubleLeft />
                </button>
                <button className={style.buttonPage} disabled={!nextPage ? true : false} onClick={() => changePage(nextPage)}>
                    <FaAngleDoubleRight />
                </button>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        if (response.ok) {
            const data = await response.json();
            return {
                props: {
                    pokemonsData: data.results,
                    prev: data.previous,
                    next: data.next,
                },
                revalidate: 60,
            };
        } else {
            console.error('Error al obtener datos:', response.statusText);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }

    return {
        props: {
            pokemonsData: [],
            prev: null,
            next: null,
        },
        revalidate: 60
    }
}