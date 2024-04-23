'use server'

import { TAddReviewData } from "@/type"


export const addReview = async (data: TAddReviewData) => {
    console.log(data)
    const response = await fetch(`${process.env.SERVER_URL}/review/add-review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}