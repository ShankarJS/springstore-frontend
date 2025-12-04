import API_BASE_URL from "./apiClient";

export async function getProfile(token) {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Invalid token");
    return res.json();
}
