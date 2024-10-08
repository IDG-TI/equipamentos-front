import handleReq from "./toast/handle_Req";
import { setCookie } from "nookies";

export default async function signIn(id: string, password: string) {
    const req = await fetch(`api/apontamento`, {
        method: "POST",
        headers: {
            "x-fetch-url": "auth"
        },
        body: JSON.stringify({
            user: id,
            password: password
        })
    });
    if (req.status === 200) {
        let resp = await req.json();
        const now = new Date();
        const expiration = new Date(now.getTime() + 15 * 60 * 1000);
        setCookie(null, "auth-token", resp.token, {
            expires: expiration,
            path: "/",
        });
        location.reload();
    }
    else {
        let request = req;
        handleReq(request, "");
    }
}