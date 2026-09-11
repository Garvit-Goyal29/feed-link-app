export function getUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const payload = token.split('.')[1];
        if (!payload) return null;
        const decoded = JSON.parse(atob(payload));
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return null;
        }
        return decoded;
    } catch {
        return null;
    }
}
