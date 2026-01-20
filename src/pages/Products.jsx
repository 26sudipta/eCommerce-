import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const res = await productAPI.getCategories();
      setCategories(res.data?.categories || res.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: filters.page,
        limit: filters.limit,
        search: filters.search || undefined,
        category: filters.category || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        sort: filters.sort,
      };

      const res = await productAPI.getAll(params);
      setProducts(res.data.products || []);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
        totalProducts: res.data.totalProducts || res.data.total,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: filters.search });
    fetchProducts();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt',
      page: 1,
      limit: 12,
    });
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="card bg-base-100 shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiFilter /> Filters
            </h3>

            {/* Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Search</span>
                </label>
                <div className="join w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input input-bordered join-item w-full"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary join-item">
                    <FiSearch />
                  </button>
                </div>
              </div>
            </form>

            {/* Category */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {Array.isArray(categories) && categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace(/-/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Price Range</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="input input-bordered w-full"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="input input-bordered w-full"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Sort By</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="createdAt">Newest</option>
                <option value="-createdAt">Oldest</option>
                <option value="-price">Price: High to Low</option>
                <option value="price">Price: Low to High</option>
                <option value="-rating">Rating: High to Low</option>
                <option value="rating">Rating: Low to High</option>
                <option value="title">Name: A to Z</option>
                <option value="-title">Name: Z to A</option>
              </select>
            </div>

            <button onClick={clearFilters} className="btn btn-outline w-full">
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            {pagination.totalProducts > 0 && (
              <p className="text-gray-600">
                Showing {products.length} of {pagination.totalProducts} products
              </p>
            )}
          </div>

          {loading ? (
            <Loading />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="join">
                    <button
                      className="join-item btn"
                      disabled={filters.page === 1}
                      onClick={() => handleFilterChange('page', filters.page - 1)}
                    >
                      «
                    </button>
                    {[...Array(pagination.totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        className={`join-item btn ${
                          filters.page === index + 1 ? 'btn-active' : ''
                        }`}
                        onClick={() => handleFilterChange('page', index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className="join-item btn"
                      disabled={filters.page === pagination.totalPages}
                      onClick={() => handleFilterChange('page', filters.page + 1)}
                    >
                      »
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No products found</p>
              <button onClick={clearFilters} className="btn btn-primary mt-4">
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
