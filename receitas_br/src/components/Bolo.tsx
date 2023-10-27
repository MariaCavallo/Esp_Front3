import Link from "next/link";

interface BoloData {
  title: string;
  description: string;
  image: string;
  text: string;
  id: string;
}

interface Props {
  bolo: BoloData;
}

const Bolo = ({ bolo }: Props) => {
  return (
    <article>
      <Link href="/bolo/[id]" as={`/bolo/${bolo.id}`}>
        <div>
          <h2>{bolo.title}</h2>
          <p>{bolo.description}</p>
        </div>
      </Link>
    </article>
  );
};

export default Bolo;
