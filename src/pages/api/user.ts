import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const authToken = getCookie("auth-token", { req, res });

    if (!authToken) {
        return res.status(401).json({ error: 'Auth token not found' });
    }

    const props: any = {
        method: req.method,
        headers: {
            'x-real-ip': req.socket.remoteAddress ?? "",
            'Authorization': `${authToken}`,
        },
    }

    const loginReq = await fetch(`${process.env.API_APONTAMENTO_URL}/login`, {
        headers: {
            "Authorization": authToken
        }
    })
    if (!loginReq.ok) {
        return res.status(401).end();
    }

    const login: string = await loginReq.text();
    const rmReq: any = await fetch(`${process.env.API_RM_URL}/funcionarios/find?page=0&size=1&codigo=${login}`, props);


    if (rmReq.ok) {
        const resp: any = await rmReq.json();
        if (resp.numberOfElements === 1) {
            return res.status(200).json(resp.content[0]);
        }
    }
    return res.status(401).end();
}