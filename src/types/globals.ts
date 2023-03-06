import type{ NextApiRequest } from "next";

export interface NextApiRequestWithBody extends NextApiRequest {
    body: any;
}