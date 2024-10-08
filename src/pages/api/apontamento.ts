import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';
import stream from 'stream';

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
            'sort-field': req.headers['sort-field']
        },
    }
    
    if (req.method !== "GET" && req.method !== "DELETE") {
        props["body"] = req.body;
    }

    console.warn(url);
    const response: any = await fetch(`${process.env.API_APONTAMENTO_URL}/${url}`, props);

    const status = response.status;

    console.log(`${url} - status: ${response.status}`);

    if (!response.ok) {

        if (response.headers.get('content-type')?.includes('application/json')) {
            const json = await response.json();
            return res.status(response.status).json(json);
        }
        return res.status(response.status).json({ error: 'Erro na operação' });
    }

    if (response.status === 204 ) {
        console.log("Void return type - returning 204");
        return res.status(204).end();
    }

    const contentType: any = response.headers.get('content-type');
    if (!contentType) {
        console.log("Void return type");
        res.status(204).end();
        return 
    }
    res.setHeader('Content-Type', contentType);
    if (contentType.includes('application/json')) {
        try{
            console.log("Parsing json resp")
            const json = await response.json();
            return res.status(response.status).json(json);
        }catch{
            console.warn("Error in parsing resp to json. Something possibly broken")
            return res.status(204).end();
        }
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
