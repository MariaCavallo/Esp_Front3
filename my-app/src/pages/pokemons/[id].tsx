import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { OnePokemon } from "../../pokemonsType";
import style from "../../styles/pokemons.module.css"
import Link from "next/link";
import { Locale } from "../_app";
import { contentBr } from "../../components/locales/br";
import { contentEn } from "../../components/locales/en";
import { contentEs } from "../../components/locales/es";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";

interface PokemonProps {
    pokemon: OnePokemon;
}

function Pokemon({ pokemon }: PokemonProps) {
    const router = useRouter()
    const locale = useContext(Locale);
    const content = locale === "es" ? contentEs : (locale === "br" ? contentBr : contentEn);

    return (
        <div className={style.pokemonsContainer}>
            <h1>{content.titleInfo}</h1>
            {pokemon ? (
                <div className={style.containerOnePokemon}>
                    <ul className={style.listOnePokemon}>
                    <li>
                        <strong>{content.nombre}: </strong>
                        {pokemon.name},
                    </li>
                    <li>
                        <strong>{content.habilidades}: </strong>
                        {pokemon.abilities.map((ability) => (
                            <p key={ability.ability.name}>{ability.ability.name},</p>
                        ))}
                    </li>
                    <li>
                        <strong>{content.tipos}: </strong>
                        {pokemon.types.map((type) => (
                            <p key={type.type.name}>{type.type.name},</p>
                        ))}
                    </li>
                    <div>
                        <li>
                            <strong>{content.imagen}: </strong>
                            <Image
                                src={pokemon.sprites.other.home.front_default}
                                alt={pokemon.name}
                                width={300}
                                height={300}
                                />
                        </li>
                    </div>
                    <li>
                        <strong>{content.peso}: </strong>
                        {pokemon.weight}.
                    </li>
                    </ul>
                </div>
            ) : (
                <p>{content.loadingText}</p>
            )}
            <Link className={style.link} href={"/pokemons"}>{content.linkVolver}</Link>
        </div>
    );
}
export default Pokemon;

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const results = await response.json();
    const paths = results.results.map((pokemon: { name: string }) => ({
        params: { id: pokemon.name },
    }));

    return {
        paths: paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id as string;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await response.json();

    return {
        props: {
            pokemon
        },
        revalidate: 100,
    }
}