export default async function validate(token: any) {
    //A api retorna um booleano para a requisição de validate
    const req = await fetch(`/api/apontamento`, {
        method: "GET",
        headers: {
            "x-fetch-url": "validate",
            "Authorization": token
        }
    })
    return (req.ok)
}