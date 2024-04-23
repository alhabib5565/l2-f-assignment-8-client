
'use server'

import { FieldValues } from "react-hook-form"

export const proceedOrder = async (data: FieldValues) => {
    const response = await fetch(`${process.env.SERVER_URL}/order/proceed`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        cache: 'no-store'
    })
    return await response.json()
}