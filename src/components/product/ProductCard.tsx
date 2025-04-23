
import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group"
    >
      {/* Badge */}
      {product.compareAtPrice && (
        <span className="absolute top-2 right-2 bg-shopify-danger text-white text-xs font-medium px-2 py-1 rounded z-10">
          Sale
        </span>
      )}
      {product.isNew && !product.compareAtPrice && (
        <span className="absolute top-2 right-2 bg-neon-purple text-white text-xs font-medium px-2 py-1 rounded z-10">
          New
        </span>
      )}

      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium mb-1 group-hover:text-neon-purple transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center">
          {product.compareAtPrice ? (
            <>
              <span className="text-shopify-danger font-medium">${product.price.toFixed(2)}</span>
              <span className="text-gray-400 line-through ml-2 text-sm">${product.compareAtPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium">${product.price.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-400">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
