'use server'

export const allProduct = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/products`);
    const products = await res.json();
    return products
}