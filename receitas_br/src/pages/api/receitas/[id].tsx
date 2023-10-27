import { receitas } from "../../../data";
import { NextApiResponse } from "next";

export default function boloHandler({ query: { id } }: { query: { id: string } }, res: NextApiResponse) {

    const filtered = receitas.filter((p) => p.id === id);

    if (filtered.length > 0) {
        res.status(200).json(filtered[0]);
    } else {
        res.status(404).json({ message: `Bolo com id: ${id} não encontrado.` })
    }
}
