import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../store/reducers/product';
import ProductItem from '../../product-item';
import ProductsLoading from './loading';

const ProductsContent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
      <>
        {loading && <ProductsLoading />}
        {products && (
            <section className="products-list">
              {products.map((item:any) => (

                  <ProductItem
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      quantity={item.quantity}
                      description={item.description}
                      key={item.id}
                      images={JSON.parse(item.images)}

                  />
              ))}
            </section>
        )}
      </>
  );
};

export default ProductsContent;
