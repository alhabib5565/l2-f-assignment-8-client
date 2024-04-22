'use server'

import { FieldValues } from "react-hook-form"

export const addProduct = async (data: FieldValues) => {
    const response = await fetch(`${process.env.SERVER_URL}/product/add-product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}