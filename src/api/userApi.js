import API_BASE_URL from "./apiClient";

export async function getProfile(token) {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}
