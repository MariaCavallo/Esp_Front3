import React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { TyC, TyCsAPIResponse } from "../types";
import styles from "../styles/TYC.module.css";
import Head from "next/head";
import { defaultLocale, locales, TEXTS_BY_LANGUAGE } from "../locale/constants";
import { useRouter } from "next/router";

type IProps = {
  data: TyCsAPIResponse;
};

const TerminosYCondiciones: NextPage<IProps> = ({ data }) => {
  const { locale } = useRouter();

  if (!data) return null;

  const { MAIN } = TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ?? TEXTS_BY_LANGUAGE[defaultLocale];

  const { version, tycs } = data;

  const renderTyc: (tyc: TyC) => JSX.Element = ({ id, description, title }) => (
    <div key={id}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );

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
      <p>Versión: {version}</p>
      {tycs.map(renderTyc)}
    </div>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
  
//   const paths = Object.keys(locales).map((locale) => ({
//     params: { locale },
//   }));

//   return { 
//     paths, 
//     fallback: 'blocking' 
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const locale = params?.locale as keyof typeof locales;

  try {

    const baseUrl = "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/tycs/${locale}`);
    const data = await response.json();
    return {
      props: { data },
    };

  } catch (error) {
    console.error("Error al obtener los datos de la api: ", error);
    return {
      props: { data: null }
    }
  }

}

export default TerminosYCondiciones;
