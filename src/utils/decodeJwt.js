export default function decodeJwt(token) {
    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("Invalid token");
    }

    const header = window.atob(parts[0]);
    const payload = window.atob(parts[1]);

    return {
        header: JSON.parse(header),
        payload: JSON.parse(payload),
    };
}
