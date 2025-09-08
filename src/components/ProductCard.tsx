import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product, useApp } from '../contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useApp();

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!state.user) {
      dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
      return;
    }

    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!state.user) {
      dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
          />
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              isInWishlist
                ? 'bg-red-100 text-red-500 hover:bg-red-200'
                : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center mt-2 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-gray-800">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!state.user}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors ${
              state.user
                ? isInCart
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </span>
          </button>

          {!state.user && (
            <p className="text-xs text-gray-500 text-center mt-2">
              Login to add to cart
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;