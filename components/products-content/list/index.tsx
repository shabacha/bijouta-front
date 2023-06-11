import useSwr from 'swr';
import ProductItem from '../../product-item';
import ProductsLoading from './loading';
import { ProductTypeList } from 'types';

const ProductsContent = () => {
  const fetcher = (url: string) => fetch("http://localhost:8080/products").then((res) => res.json());
  const { data, error } = useSwr('http://localhost:8080/products', fetcher);

  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!data && 
        <ProductsLoading />
      }

      {data &&
        <section className="products-list">
          {data.map((item: ProductTypeList)  => (
            <ProductItem 
              id={item.id} 
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              description={item.description}
              key={item.id}
              images={item.images} 
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent