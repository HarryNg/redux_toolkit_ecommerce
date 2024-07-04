import { ProductListItemsProps } from "../type";

function ProductListItems({product, onHandleGetItem, onEditProduct, onDeleteProduct}:ProductListItemsProps) {
    if(!product) {
        return null;
    }

    const { id, title, description, price, thumbnail,rating } = product;
    return (
    <li key={id}>
        <img src={thumbnail} alt={title} />
        <h3>{title}</h3>
        <p className="truncate">{description}</p>
        <p>Rating: {rating}</p>
        <p>${price}</p>
        <button onClick={() => onHandleGetItem(id)}>Show More</button>
        <button onClick={() => onEditProduct(product)}>Edit</button>
        <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
    </li>
    );

}

export default ProductListItems
