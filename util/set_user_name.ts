import ApiApontamento from "@apis/api_apontamento"

function cutName(data: any, getFullName: boolean) {
    const name = data.nome;
    if (name && name !== "-") {
        const words = name.split(" ");
        return getFullName ? name : `${words[0].toUpperCase()} ${words[words.length - 1].toUpperCase()}`;
    }
}

export default function setUserName(callback : Function, getFullName = false) {
    fetch("/api/user").then(resp => {
        if (resp.status === 401) {
            if(getFullName) return new Promise((resolve => resolve(false)));
            return new Promise((resolve , reject) => ApiApontamento.request({
                path: "login",
                method: "GET",
                actionName: "Obter",
                name: "usuário",
                onSuccess: resolve,
                onError: reject
            }))
        }
        return resp.json();
    }).then((data) => data ? callback(cutName(data, getFullName)) : null)
}