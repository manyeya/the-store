'use client';

import { useCart } from '@/lib/context/CartContext';
import { getProduct } from '@/lib/store-api/products';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/store-api/products/types';

interface CartProduct extends Product {
  quantity: number;
}

const formatPrice = (price: number): string => {
  return `R${price.toLocaleString('id-ID')}`;
};

export default function Cart() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem } = useCart();
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (items.length === 0) {
          setProducts([]);
        } else {
          const productDetails = await Promise.all(
            items.map(async (item) => {
              const product = await getProduct(item.productId);
              return { ...product, quantity: item.quantity };
            })
          );
          setProducts(productDetails);
        }
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
      setLoading(false);
    };

    if (isOpen) {
      fetchProducts();
    }
  }, [items, isOpen]);

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="relative w-20 h-20">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium truncate">{product.title}</h3>
                      <p className="text-sm text-gray-500">
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <button
              disabled={products.length === 0}
              className="w-full py-3 bg-[#B88E2F] text-white rounded-lg hover:bg-[#96732B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
