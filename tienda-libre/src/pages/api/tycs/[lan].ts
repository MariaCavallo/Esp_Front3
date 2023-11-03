import type { NextApiRequest, NextApiResponse } from "next";
import { defaultLocale } from "../../../locale/constants";
import { TyCsAPIResponse } from "../../../types";
import { tycs } from "../db";

export default async function tycsHandler(req: NextApiRequest, res: NextApiResponse<TyCsAPIResponse>) {
  const { query: { lan } } = req;

  const tycsByLanguage = tycs[lan as string] ?? tycs[defaultLocale];

  res.status(200).json(tycsByLanguage);
}
