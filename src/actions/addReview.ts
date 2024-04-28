'use server'

import { TAddReviewData } from "@/type"
import { revalidateTag } from "next/cache"


export const addReview = async (data: TAddReviewData) => {
    const response = await fetch(`${process.env.SERVER_URL}/review/add-review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    revalidateTag('reviews')
    return await response.json()
}