import { ProductItemProps } from "../type"

function ProductItem( {product, onHandleBackBtn}:ProductItemProps) {
  if(!product) {
    return null;
  }
  const {
    title,
    description,
    thumbnail,
    category,
    stock,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    rating,
    price
  } = product;

  return (
    <div className="product">
      <img src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      
      <div className="product-info">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Stock:</strong> {stock}</p>
        <p><strong>Weight:</strong> {weight}</p>
        <p><strong>Dimensions:</strong> {dimensions.width} x {dimensions.height} x {dimensions.depth}</p>
        <p><strong>Warranty Information:</strong> {warrantyInformation}</p>
        <p><strong>Shipping Information:</strong> {shippingInformation}</p>
        <p><strong>Availability Status:</strong> {availabilityStatus}</p>
        
        <div className="reviews">
          <p><strong>Reviews:</strong></p>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Comment:</strong> {review.comment}</p>
                <p><strong>Date:</strong> {review.date}</p>
                <p><strong>Reviewer Name:</strong> {review.reviewerName}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="rating"><strong>Rating:</strong> {rating}</p>
        <p className="price"><strong>Price:</strong> ${price}</p>
      </div>

      <button onClick={onHandleBackBtn}>Back to Product List</button>
    </div>
  );
}

export default ProductItem
