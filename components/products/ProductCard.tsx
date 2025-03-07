import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const formatPrice = (price: number): string => {
  return `R${price.toLocaleString('id-ID')}`;
};

export default function ProductCard({ id, title, price, image }: ProductProps) {
  return (
    <Link href={`/product/${id}`} className="group relative bg-[#F4F5F7] rounded-lg overflow-hidden block hover:shadow-lg transition-shadow">
      <div className="relative h-[250px] w-full overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold mb-1 truncate">{title}</h3>
        <div className="flex items-center gap-2">
          {price ? (
            <>
              <span className="font-semibold text-[#B88E2F]">{formatPrice(price)}</span>
              <span className="text-gray-400 line-through text-sm">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="font-semibold text-[#B88E2F]">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
