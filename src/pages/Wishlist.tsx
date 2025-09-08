import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Wishlist: React.FC = () => {
  const { state, dispatch } = useApp();

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your wishlist</p>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Add some products you love</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-600">{state.wishlist.length} items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.wishlist.map(product => {
            const isInCart = state.cart.some(item => item.id === product.id);
            
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>

                <div className="p-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 block mb-2"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-center justify-between mb-4">
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
                    onClick={() => addToCart(product)}
                    className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors ${
                      isInCart
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {isInCart ? 'In Cart' : 'Add to Cart'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;