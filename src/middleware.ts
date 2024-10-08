import { NextRequest, NextResponse } from "next/server";

//permite todos as requições definidas no matcher
export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - api/apontament (auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    matcher: ['/((?!api/apontamento|_next/static|_next/image|).*)'],
}

export async function middleware(req: any, ev: any) {
    let token = req.cookies.get('auth-token')?.value;
    const { pathname } = req.nextUrl;

    if (pathname !== "/") {
        let valid = await validate(token);
        if (!valid) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
    return NextResponse.next();
}


function validate(token: string | undefined) {
    if (!token) return false;
    return fetch(process.env.API_APONTAMENTO_URL + '/validate', {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
    }).then((res) => {
        return res.ok;
    }).catch((err) => {
        return false;
    })
}