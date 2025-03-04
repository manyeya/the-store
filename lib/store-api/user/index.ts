import { fetchData, postData, putData, deleteData } from "../../fetcher";
import { User, UserCreateInput, LoginCredentials, LoginResponse } from "./types";

// User Operations
export async function getUsers(): Promise<User[]> {
    return fetchData<User[]>('/users');
  }
  
  export async function getUser(id: number): Promise<User> {
    return fetchData<User>(`/users/${id}`);
  }
  
  export async function createUser(user: UserCreateInput): Promise<User> {
    'use server';
    return postData<UserCreateInput, User>('/users', user);
  }
  
  export async function updateUser(id: number, user: Partial<UserCreateInput>): Promise<User> {
    'use server';
    return putData<Partial<UserCreateInput>, User>(`/users/${id}`, user);
  }
  
  export async function deleteUser(id: number): Promise<User> {
    'use server';
    return deleteData<User>(`/users/${id}`);
  }
  
  // Authentication
  export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    'use server';
    return postData<LoginCredentials, LoginResponse>('/auth/login', credentials);
  }