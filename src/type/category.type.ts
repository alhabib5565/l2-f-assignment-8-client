export type TMainCategory = {
    _id?: string
    mainCategoryName: string
    imageURL: string,
    metaTitle?: string
    metaDescription?: string
    status: TStatus
}

export type TStatus = "Active" | "Blocked" 