// FakeStore API base URL
const API_BASE_URL = 'https://fakestoreapi.com';

// Default fetch options with Next.js 14+ caching behavior
const defaultFetchOptions = {
    cache: 'force-cache' as RequestCache,
    next: {
        revalidate: 3600, // 1 hour default revalidation
        tags: ['products'], // Default cache tag
    },
};


/**
 * Generic fetch function with type safety and error handling
 * @param endpoint - API endpoint path
 * @param options - Custom fetch options to override defaults
 * @returns Promise with typed data
 */
export async function fetchData<T>(
    endpoint: string,
    options?: RequestInit & { next?: { revalidate?: number, tags?: string[] } }
): Promise<T> {
    try {
        // Merge default options with custom options
        const fetchOptions = {
            ...defaultFetchOptions,
            ...options,
            next: {
                ...defaultFetchOptions.next,
                ...options?.next,
            },
        };

        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

/**
 * Function to revalidate specific cache tags
 * @param tags - Array of cache tags to revalidate
 */
export async function revalidateData(tags: string[]) {
    'use server';
    try {
        // Next.js 14+ revalidation API
        tags.forEach(tag => {
            // @ts-expect-error - Next.js revalidateTag API might not be in the types
            revalidateTag(tag);
        });
    } catch (error) {
        console.error('Revalidation error:', error);
        throw error;
    }
}

/**
 * POST data to the API with proper error handling
 * @param endpoint - API endpoint path
 * @param data - Data to send in the request body
 * @returns Promise with typed response
 */
export async function postData<T, R>(
    endpoint: string,
    data: T
): Promise<R> {
    'use server';
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return await response.json() as R;
    } catch (error) {
        console.error('POST error:', error);
        throw error;
    }
}

// Generic PUT request helper
export async function putData<T, R>(endpoint: string, data: T): Promise<R> {
    'use server';
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.json() as Promise<R>;
    } catch (error) {
        console.error('PUT error:', error);
        throw error;
    }
}

// Generic DELETE request helper
export async function deleteData<R>(endpoint: string): Promise<R> {
    'use server';
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.json() as Promise<R>;
    } catch (error) {
        console.error('DELETE error:', error);
        throw error;
    }
}