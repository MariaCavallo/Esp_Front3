import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { TyC, TyCsAPIResponse } from "../types";
import styles from "../styles/TYC.module.css";
import Head from "next/head";
import { defaultLocale, locales, TEXTS_BY_LANGUAGE } from "../locale/constants";
import { useRouter } from "next/router";
import { tycs } from "./api/db";

type IProps = {
  data: TyCsAPIResponse;
};

const TerminosYCondiciones: NextPage<IProps> = ({ data }) => {
  const { locale } = useRouter();

  if (!data) return null;

  const { MAIN } = TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ?? TEXTS_BY_LANGUAGE[defaultLocale];
  
  const renderTyc: (tyc: TyC, locale: string) => JSX.Element = ({ id, description, title }, locale) => {
    
    const tyc = tycs[locale].tycs.find((tyc: { id: number; }) => tyc.id === id);

    return(
    <div key={id}>
      <h3>{tyc?.title}</h3>
      <p>{tyc?.description}</p>
    </div>
    )
  }

  return (
    <div className={styles.tycContainer}>
      <Head>
        <title>Tienda Libre - {MAIN.TYCS}</title>
        <meta
          name="description"
          content="términos y condiciones de Tienda Libre"
        />
      </Head>
      <h2>{MAIN.TYCS}</h2>
      <p>Versión: {locale && tycs[locale] ? tycs[locale].version : "Version no disponible"}</p>
      {data.tycs.map((tyc) => (locale ? renderTyc(tyc, locale) : null))}
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ params }): Promise<{ props: { data: TyCsAPIResponse } }> => {

  const locale = params?.locale as keyof typeof locales;

  try {

    const baseUrl = "https://tienda-libre-tl.vercel.app";
    const response = await fetch(`${baseUrl}/api/tycs/${locale}`);
    const data = await response.json();
    return {
      props: { data },
    };

  } catch (error) {
    console.error("Error al obtener los datos de la api: ", error);
    return {
      props: { data: {tycs: [], version: ""}}
    }
  }

}

export default TerminosYCondiciones;
