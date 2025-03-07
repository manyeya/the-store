'use server'

import { fetchData, postData, putData, deleteData } from "../../fetcher";
import { Cart, CartCreateInput } from "./types";

// Cart Operations
export async function getCarts(): Promise<Cart[]> {
  return fetchData<Cart[]>('/carts');
}

export async function getCart(id: number): Promise<Cart> {
  return fetchData<Cart>(`/carts/${id}`);
}

export async function getUserCarts(userId: number): Promise<Cart[]> {
  return fetchData<Cart[]>(`/carts/user/${userId}`);
}

export async function createCart(cart: CartCreateInput): Promise<Cart> {
  return postData<CartCreateInput, Cart>('/carts', cart);
}

export async function updateCart(id: number, cart: CartCreateInput): Promise<Cart> {
  return putData<CartCreateInput, Cart>(`/carts/${id}`, cart);
}

export async function deleteCart(id: number): Promise<Cart> {
  return deleteData<Cart>(`/carts/${id}`);
}