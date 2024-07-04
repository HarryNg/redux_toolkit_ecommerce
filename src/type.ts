
export type Product ={
    id: string
    title: string
    description: string
    price: number
    category: string
    rating: number
    thumbnail: string
}

export type ProductState = {
    products: Product[]
    product: Product | null
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