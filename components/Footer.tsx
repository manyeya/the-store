import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-white border-t border-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Funiro.</h3>
            <p className="text-gray-500 text-sm mb-4">400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="text-gray-500 mb-4">Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm hover:text-[#B88E2F]">Home</Link></li>
              <li><Link href="/shop" className="text-sm hover:text-[#B88E2F]">Shop</Link></li>
              <li><Link href="/about" className="text-sm hover:text-[#B88E2F]">About</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-[#B88E2F]">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="text-gray-500 mb-4">Help</h4>
            <ul className="space-y-3">
              <li><Link href="/payment-options" className="text-sm hover:text-[#B88E2F]">Payment Options</Link></li>
              <li><Link href="/returns" className="text-sm hover:text-[#B88E2F]">Returns</Link></li>
              <li><Link href="/privacy-policies" className="text-sm hover:text-[#B88E2F]">Privacy Policies</Link></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="text-gray-500 mb-4">Newsletter</h4>
            <div className="flex flex-col space-y-4">
              <div className="border-b border-gray-300 pb-2">
                <input 
                  type="email" 
                  placeholder="Enter Your Email Address" 
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
              </div>
              <button className="text-sm font-medium hover:text-[#B88E2F] text-left">SUBSCRIBE</button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500">
          <p>©2023 Funiro. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}