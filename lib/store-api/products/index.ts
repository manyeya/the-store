"use server"

import { deleteData, fetchData, postData, putData } from "../../fetcher";
import { Category, Product, ProductCreateInput, ProductUpdateInput, SortOptions } from "./types";

// Product Service Functions---------------------------------------------------
export async function getProducts(): Promise<Product[]> {
  return fetchData<Product[]>('/products');
}

export async function getProduct(id: number): Promise<Product> {
  return fetchData<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  return fetchData<Category[]>('/products/categories');
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return fetchData<Product[]>(`/products/category/${category}`);
}

// For limited products with dynamic revalidation
export async function getLimitedProducts(limit: number = 5): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 10000)); // Simulate delay
  return fetchData<Product[]>(`/products?limit=${limit}`, {
    next: {
      revalidate: 60, // More frequent revalidation for limited products
    }
  });
}

// For real-time product data with no caching
export async function getProductRealTime(id: number): Promise<Product> {
  return fetchData<Product>(`/products/${id}`, {
    cache: 'no-store', // Disable caching for real-time data
  });
}

// Product Operations---------------------------------------------------------------
export async function createProduct(product: ProductCreateInput): Promise<Product> {
  return postData<ProductCreateInput, Product>('/products', product);
}

export async function updateProduct(id: number, product: ProductUpdateInput): Promise<Product> {
  return putData<ProductUpdateInput, Product>(`/products/${id}`, product);
}

export async function deleteProduct(id: number): Promise<Product> {
  return deleteData<Product>(`/products/${id}`);
}

export async function getSortedProducts(options: SortOptions): Promise<Product[]> {
  const params = new URLSearchParams();
  if (options.sort) params.append('sort', options.sort);
  if (options.limit) params.append('limit', options.limit.toString());
  return fetchData<Product[]>(`/products?${params.toString()}`);
}