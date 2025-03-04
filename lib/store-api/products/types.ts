export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

// Category comes as string from FakeStore API
export type Category = string;

// Product Input Types
export interface ProductCreateInput {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export type ProductUpdateInput = Partial<ProductCreateInput>;

export interface SortOptions {
    sort?: 'asc' | 'desc';
    limit?: number;
}