import { ProductListItemsProps } from "../type";

function ProductListItems({product, onHandleGetItem}:ProductListItemsProps) {
    if(!product) {
        return null;
    }

    const { id, title, description, price, thumbnail } = product;
    return (
    <li key={id}>
        <img src={thumbnail} alt={title} />
        <h3>{title}</h3>
        <p className="truncate">{description}</p>
        <p>${price}</p>
        <button onClick={() => onHandleGetItem(id)}>Show More</button>
    </li>
    );

}

export default ProductListItems
