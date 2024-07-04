
export type Product ={
    id: string
    title: string
    description: string
    price: number
    category: string
    rating: number
    stock: number
    weight: number
    dimensions: {
        width: number
        height: number
        depth: number
    }
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: {
        rating: number
        comment: string
        date: string
        reviewerName: string
    }[]
    thumbnail: string
}

export type ProductState = {
    products: Product[]
    product: Product | null
    totalItems: number
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null | {}
}

export type ProductItemProps = {
    product: Product | null;
    onHandleBackBtn: () => void;
}
export type ProductListItemsProps = {
    product: Product | null;
    onHandleGetItem: (id:string) => void;
}