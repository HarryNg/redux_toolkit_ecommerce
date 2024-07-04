import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Product } from '../type';


const schema = yup.object().shape({
    id: yup.string().optional(),
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required').positive('Price must be positive'),
    rating: yup.number().required('Rating is required').min(0).max(5),
    category: yup.string().required('Category is required'),
    stock: yup.number().required('Stock is required').positive('Stock must be positive'),
    weight: yup.number().required('Weight is required').positive('Weight must be positive'),
    dimensions: yup.object().shape({
      width: yup.number().required('Width is required').positive('Width must be positive'),
      height: yup.number().required('Height is required').positive('Height must be positive'),
      depth: yup.number().required('Depth is required').positive('Depth must be positive'),
    }),
    warrantyInformation: yup.string().required('Warranty Information is required'),
    shippingInformation: yup.string().required('Shipping Information is required'),
    availabilityStatus: yup.string().required('Availability Status is required'),
    reviews: yup.array().of(
      yup.object().shape({
        rating: yup.number().required('Review rating is required').min(0).max(5),
        comment: yup.string().required('Review comment is required'),
        date: yup.string().required('Review date is required'),
        reviewerName: yup.string().required('Reviewer name is required'),
      })
    ).optional(),
    thumbnail: yup.string().optional(),
  });
  
  interface ProductFormProps {
    initialValues: Product;
    onSubmit: (data: Product) => void;
  }
  
  const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<Product>({
      resolver: yupResolver(schema) as any,
      defaultValues: initialValues,
    });
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <label>Price</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => <input type="number" {...field} />}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <label>Rating</label>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => <input type="number" step="0.1" {...field} />}
          />
          {errors.rating && <p>{errors.rating.message}</p>}
        </div>
        <div>
          <label>Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <div>
          <label>Stock</label>
          <Controller
            name="stock"
            control={control}
            render={({ field }) => <input type="number" {...field} />}
          />
          {errors.stock && <p>{errors.stock.message}</p>}
        </div>
        <div>
          <label>Weight</label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => <input type="number" {...field} />}
          />
          {errors.weight && <p>{errors.weight.message}</p>}
        </div>
        <div>
          <label>Dimensions</label>
          <Controller
            name="dimensions.width"
            control={control}
            render={({ field }) => <input type="number" placeholder="Width" {...field} />}
          />
          <Controller
            name="dimensions.height"
            control={control}
            render={({ field }) => <input type="number" placeholder="Height" {...field} />}
          />
          <Controller
            name="dimensions.depth"
            control={control}
            render={({ field }) => <input type="number" placeholder="Depth" {...field} />}
          />
          {errors.dimensions && <p>{errors.dimensions.width?.message || errors.dimensions.height?.message || errors.dimensions.depth?.message}</p>}
        </div>
        <div>
          <label>Warranty Information</label>
          <Controller
            name="warrantyInformation"
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
          {errors.warrantyInformation && <p>{errors.warrantyInformation.message}</p>}
        </div>
        <div>
          <label>Shipping Information</label>
          <Controller
            name="shippingInformation"
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
          {errors.shippingInformation && <p>{errors.shippingInformation.message}</p>}
        </div>
        <div>
          <label>Availability Status</label>
          <Controller
            name="availabilityStatus"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.availabilityStatus && <p>{errors.availabilityStatus.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default ProductForm;