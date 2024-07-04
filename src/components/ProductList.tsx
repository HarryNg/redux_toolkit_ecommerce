import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useEffect, useState } from "react"
import { addProduct, deleteProduct, editProduct, fetchItem, fetchItemSuccess, fetchProducts, resetProduct } from "../features/productSlice"
import ProductItem from "./ProductItem"
import ProductListItems from "./ProductListItems"
import { Product } from "../type"
import ProductForm from "./ProductForm"


const initialProductState: Product = {
  id: '',
  title: '',
  description: '',
  price: 0,
  rating: 0,
  category: '',
  stock: 0,
  weight: 0,
  reviews: [],
  thumbnail: '',
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: '',
};

function ProductList() {
    const {products, status, error} = useSelector((state: RootState) => state.productR)
    let {product} = useSelector((state: RootState) => state.productR)
    const dispatch:AppDispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [sortOption, setSortOption] = useState<string>('price-asc')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    //`https://dummyjson.com/products?limit=${itemPerPage}&skip=${(currentPage-1)*itemPerPage}`
    const itemPerPage = 10
    const url = `https://dummyjson.com/products?limit=0`
    

    useEffect(() => {
      dispatch(fetchProducts(url));
    }, [dispatch]);
  
    const handleGetItem = (id: string) => {
      const productInState = products.find(product => product.id === id);
      if (productInState) {
        dispatch(fetchItemSuccess(productInState));
      }
      else{
        dispatch(fetchItem(id));
      }
    }

    const handleBackBtn = () => {
      dispatch(resetProduct());
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value)
    }

    useEffect( () => {
      setCurrentPage(1)
    }, [searchTerm, sortOption])

    const filteredProducts = products
      .filter(product => product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === 'price-asc') {
          return a.price - b.price
        }
        else if (sortOption === 'price-desc') {
          return b.price - a.price
        }
        else if (sortOption === 'rating-asc') {
          return a.rating - b.rating
        }
        else if (sortOption === 'rating-desc') {
          return b.rating - a.rating
        }
        return 0
      })

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);
    const totalPages = Math.ceil(filteredProducts.length / itemPerPage);
    if (status === 'loading') {
      return <p id="loading">Loading...</p>
    }
    
    if(status === 'failed' && !products.length) {
      return <p id="failed">Failed to fetch products</p>
    }

    if (error) {
      return <div>Error: {error.toString()}</div>;
    }

    const handleCurrentPageChange = (index:number) =>{
      setCurrentPage(index)
    }
    const handleAddProduct = () => {
      setSelectedProduct(initialProductState);
      setIsEditing(true);
    };
  
    const handleEditProduct = (product: Product) => {
      setSelectedProduct(product);
      setIsEditing(true);
    };
  
    const handleDeleteProduct = (id: string) => {
      dispatch(deleteProduct(id));
    };
  
    const handleFormSubmit = (data: Product) => {
      if (data.id) {
        dispatch(editProduct(data));
      } else {
        dispatch(addProduct({ ...data, id: String(new Date().getTime()) }));
      }
      setIsEditing(false);
      setSelectedProduct(null);
    };
    
  return (
    <div className="container">
        <h2>Product List</h2>

        <input 
          type="text" 
          placeholder="Search product" 
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select 
          value={sortOption} 
          onChange={handleSortChange}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
        <button onClick={handleAddProduct}>Add Product</button>

        {!product && !isEditing&& paginatedProducts.length>0 && 
          <ul className="products">
            {paginatedProducts.map(product => (
                <ProductListItems 
                  product={product} 
                  onHandleGetItem={handleGetItem} 
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                  key={product.id}
                />
              )
            )}
          </ul>
        }

        {isEditing && (
          <ProductForm
            initialValues={selectedProduct || initialProductState}
            onSubmit={handleFormSubmit}
          />
        )}

        {!product && (<div className="pagination">
          {Array.from({length: totalPages}, (_, index)=> {
            return <button 
              key={index}
              className={currentPage === index+1 ? 'active' : ''}
              onClick={ () => handleCurrentPageChange(index+1)}>
                {index + 1}
              </button>
          })}
        </div>)}

        < ProductItem product={product} onHandleBackBtn={handleBackBtn}/>
        
    </div>
  )
}

export default ProductList
