export function getAllUsers() {
    return fetch("/api/users", {
        method: "POST",
    }).then(res => res.json())
}
