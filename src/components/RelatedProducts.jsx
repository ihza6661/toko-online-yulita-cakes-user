import { useState, useEffect } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/user/get_related_products?category=${category}&subCategory=${subCategory}`);
        if (!response.ok) {
          throw new Error('Gagal memuat data produk terkait');
        }
        const data = await response.json();
        const productsWithImages = data
          .filter((product) => product.images.some((img) => img.is_primary === 1))
          .map((product) => {
            const primaryImage = product.images.find((img) => img.is_primary === 1);
            return {
              id: product.id,
              name: product.product_name,
              original_price: product.original_price,
              sale_price: product.sale_price,
              image: `/storage/${primaryImage.image}`,
              slug: product.slug,
              stock: product.stock,
            };
          });

        setRelatedProducts(productsWithImages.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, subCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-24">
      <div className="text-center py-8 text-3xl">
        <Title text1={'PRODUK'} text2={'TERKAIT'} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((item) => (
          <div
            key={item.id}
            className="transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <ProductItem
              id={item.id}
              image={item.image}
              name={item.name}
              originalPrice={item.original_price}
              salePrice={item.sale_price}
              slug={item.slug}
              stock={item.stock}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
