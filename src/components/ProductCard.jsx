import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { formatPrice, calculateDiscount, getStars } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const discountedPrice = calculateDiscount(product.price, product.discountPercentage);
  const { fullStars, hasHalfStar } = getStars(product.rating);

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-64 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {product.discountPercentage > 0 && (
          <div className="badge badge-secondary absolute top-4 right-4">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
        {product.featured && (
          <div className="badge badge-primary absolute top-4 left-4">
            Featured
          </div>
        )}
      </figure>

      <div className="card-body">
        {/* Category */}
        <div className="badge badge-outline badge-sm">{product.category}</div>

        {/* Title */}
        <h2 className="card-title text-base line-clamp-2" title={product.title}>
          {product.title}
        </h2>

        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <FiStar
              key={index}
              size={16}
              className={
                index < fullStars
                  ? 'fill-yellow-400 text-yellow-400'
                  : index === fullStars && hasHalfStar
                  ? 'fill-yellow-400 text-yellow-400 opacity-50'
                  : 'text-gray-300'
              }
            />
          ))}
          <span className="text-sm ml-1">({product.rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          {product.discountPercentage > 0 ? (
            <>
              <span className="text-xl font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-sm line-through text-gray-500">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.stock > 0 ? (
            <span className="text-sm text-success">In Stock ({product.stock})</span>
          ) : (
            <span className="text-sm text-error">Out of Stock</span>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions justify-between mt-4">
          <Link to={`/products/${product._id}`} className="btn btn-primary btn-sm flex-1">
            View Details
          </Link>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            disabled={product.stock === 0}
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
