import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';
import stream from 'stream';
import { cookies } from 'next/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const url: any = req.headers['x-fetch-url'];
    const authToken = getCookie("auth-token", { req, res });
    
    if (!url) {
        return res.status(400).json({ error: 'Passar url da operação' });
    }
    if (!authToken && url !== "auth") {
        return res.status(401).json({ error: 'Auth token not found' });
    }
    
    const props: any = {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            'x-real-ip': req.socket.remoteAddress ?? "",
            'Authorization': `${authToken}`,
        },
    }
    
    if (req.method !== "GET" && req.method !== "DELETE") {
        props["body"] = req.body;
    }

    console.log("url", url);

    const response: any = await fetch(`${process.env.API_RM_URL}/${url}`, props);

    const status = response.status;
    if (!(response.status >= 200 && response.status <= 205)) {
        if (response.headers.get('content-type')?.includes('application/json')) {
            const json = await response.json();
            return res.status(response.status).json(json);
        }
        return res.status(response.status).json({ error: 'Erro na operação' });
    }

    const contentType: any = response.headers.get('content-type');
    if (!contentType) {
        return res.status(status).end();
    }
    res.setHeader('Content-Type', contentType);

    if (contentType.includes('application/json')) {
        const json = await response.json();
        return res.status(response.status).json(json);
    }

    if (contentType.includes('octet-stream')) {
        res.setHeader("Content-Disposition", response.headers.get('content-disposition'));
        const pipeline = promisify(stream.pipeline);
        await pipeline(response.body, res);
    }

    if (contentType.includes('text/plain')) {
        const text = await response.text();
        return res.status(response.status).send(text);
    }

    return res.status(status).send(response.body);
}
