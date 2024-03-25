export type TProduct = {
    _id: number
    title: string
    description: string
    price: number
    discountPercentage: number | null
    flash_sale: FlashSale | null
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    weight?: string
    type?: string
    features?: string[]
}

export type FlashSale = {
    sale_start: string
    sale_end: string
}