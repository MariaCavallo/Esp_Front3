import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { Receitas } from "../index";
import styles from '../../styles/bolo.module.css'

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data: Receitas = await res.json();

    if (res.status !== 200) {
        throw new Error();
    }
    return data;
};

const Bolo = () => {
    const { query } = useRouter();
    const { data, error } = useSWR(
        () => query.id && `http://localhost:3000/api/receitas/${query.id}`,
        fetcher
    );

    if (error) {
        console.error("Error:", error);
        return <div>Falha ao carregar</div>;
    }
    if (!data) {
        console.log("Cargando data...");
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <Link href="/">
                <button>Página inicial</button>
            </Link>
            <h1 className={styles.h1} >Receita</h1>
            <div className={styles.cardBolo}>
                <Image src={data.image} alt={data.title} width={200} height={200} />
                <span>
                    <h2 className={styles.titleBolo}>{data.title}</h2>
                    <p> {data.description}</p>
                </span>
                <p>{data.text}</p>
            </div>
        </div>
    );
};

export default Bolo;
