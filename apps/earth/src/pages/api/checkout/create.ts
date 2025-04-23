import { createCheckoutSessionHandler } from "@/libs/ticketing/src/lib/handlers/checkout";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return createCheckoutSessionHandler(req, res);
}
