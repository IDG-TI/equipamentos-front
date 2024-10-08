import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const authToken = getCookie("auth-token", { req, res });

    if (!authToken) {
        return res.status(401).json({ error: 'Auth token not found' });
    }
    const URI = req.headers["x-fetch-url"];
    const props:any = {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            'x-real-ip': req.socket.remoteAddress ?? "",
            'Authorization': `${authToken}`,
        },
    }
     
    console.log("url", URI);

    const response: any = await fetch(`${process.env.API_RM_URL}/${URI}`, props);

    const status = response.status;
    if (!(response.status >= 200 && response.status <= 205)) {
        if (response.headers.get('content-type')?.includes('application/json')) {
            const json = await response.json();
            return res.status(response.status).json(json);
        }
        return res.status(response.status).json({ error: 'Erro na operação' });
    }

    const contentType: any = response.headers.get('content-type');
    if(!contentType){
        return res.status(status).end();
    }
    res.setHeader('Content-Type', contentType);

    if (contentType.includes('application/json')) {
        const json = await response.json();
        const colaboradores = json.content;
        // Removendo valor hora da response
        const safeColaborador = colaboradores.map((colaborador: any) => {
            const { valorHoraPJ, valorHoraCLT, ...safeColaboradorInfo } = colaborador;
            return safeColaboradorInfo;
        })
        return res.status(response.status).json({ ...json, "content": safeColaborador });
    }

    return res.status(status).send(response.body);
}