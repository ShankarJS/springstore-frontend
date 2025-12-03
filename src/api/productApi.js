import API_BASE_URL from "./apiClient";

export async function getProducts() {
    const res = await fetch(`${API_BASE_URL}/products`);
    return res.json();
}

export async function getProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
}

export async function createProduct(data, token) {
    const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
}
