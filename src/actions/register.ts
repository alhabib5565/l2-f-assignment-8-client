'use server'

import { FieldValues } from "react-hook-form"

export const registerUser = async (data: FieldValues) => {
    const response = await fetch(`${process.env.SERVER_URL}/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: 'no-store'
    })
    return await response.json()
}