// Cart Types
export interface CartItem {
    productId: number;
    quantity: number;
}

export interface Cart {
    id: number;
    userId: number;
    date: string;
    products: CartItem[];
}

export interface CartCreateInput {
    userId: number;
    date?: string;
    products: CartItem[];
}


export interface Order {
    id: number;
    userId: number;
    products: CartItem[];
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}