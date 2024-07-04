import { ProductItemProps } from "../type"

function ProductItem( {product, onHandleBackBtn}:ProductItemProps) {
   
  return (
    <>
        {product && (
          <div className="product">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => onHandleBackBtn()}>Back to Product List</button>
            </div>
        )}
    </>
  )
}

export default ProductItem
