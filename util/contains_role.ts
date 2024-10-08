export default function containsRole(roles: any, desiredRole: string) {
    if(Array.isArray(roles)){
        return roles.includes(desiredRole) || roles.includes("ADMIN");
    };
    return ""
}
