import ProductsCarousel from './carousel';

const ProductsFeatured = () => {
  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <ProductsCarousel products={undefined} />
      </div>
    </section>
  )
};

export default ProductsFeatured
