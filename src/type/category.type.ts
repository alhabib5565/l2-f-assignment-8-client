export type TMainCategory = {
    _id?: string
    mainCategoryName: string
    imageURL: string,
    metaTitle?: string
    metaDescription?: string
    status: TStatus
}

export type TStatus = "Active" | "Blocked"

export type TCategory = {
    _id: string
    mainCategoryName: string// ref  
    categoryName: string
    imageURL: string,
    metaTitle?: string
    metaDescription?: string
    status: TStatus
}