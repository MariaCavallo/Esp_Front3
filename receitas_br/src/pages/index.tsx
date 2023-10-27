import useSWR from "swr";
import Bolo from "../components/Bolo";

export interface Receitas {
  title: string;
  description: string;
  image: string;
  text: string;
  id: string;
}

const fetcher = async () => {
  const res = await fetch("http://localhost:3000/api/receitas");
  if (!res.ok) {
    throw new Error("Error al cargar los datos");
  }
  const data: Receitas[] = await res.json();
  return data;
};

const Home = () => {
  const { data, error } = useSWR("/api/receitas", fetcher);

  if (error) return <div>Falha ao carregar</div>;
  if (!data) return <div>Carregando...</div>;

  return (
    <div>
      {data.map((data, key) => (
        <Bolo bolo={data} key={key} />
      ))}
    </div>
  );
};

export default Home;
