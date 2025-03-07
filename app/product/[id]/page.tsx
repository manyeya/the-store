import { getProductRealTime } from '@/lib/store-api/products';
import { Product } from '@/lib/store-api/products/types';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

const formatPrice = (price: number): string => {
  return `R${price.toLocaleString('id-ID')}`;
};

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product: Product = await getProductRealTime(Number(params.id));

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-[500px] bg-[#F4F5F7] rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            className="p-8"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-[#B88E2F]">
              {formatPrice(product.price)}
            </span>
            <span className="text-xl text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mt-auto">
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
