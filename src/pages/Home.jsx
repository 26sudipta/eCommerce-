import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      
      // Fetch products (first 8, will prioritize featured if any)
      const productsRes = await productAPI.getAll({ limit: 8 });
      setFeaturedProducts(productsRes.data.products || []);

      // Fetch categories
      const categoriesRes = await productAPI.getCategories();
      setCategories(categoriesRes.data?.categories || categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching home data:', error);
      toast.error(error.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600">Discover our handpicked collection of top products</p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No featured products available</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/products" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-base-200 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-gray-600">Browse our wide range of product categories</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.slice(0, 12).map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  className="card bg-base-100 shadow hover:shadow-lg transition-shadow p-6 text-center"
                >
                  <h3 className="font-semibold capitalize">
                    {category.replace(/-/g, ' ')}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SmartEcom?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-lg p-6 text-center">
            <div className="text-primary text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-gray-600">Free delivery on orders over $50</p>
          </div>

          <div className="card bg-base-100 shadow-lg p-6 text-center">
            <div className="text-primary text-5xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>

          <div className="card bg-base-100 shadow-lg p-6 text-center">
            <div className="text-primary text-5xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
