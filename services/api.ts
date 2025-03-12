import { config } from "@/utils/config";

const defaultOptions: RequestInit = {
    headers: {
        "Content-Type": "application/json",
    },
};

const authOptions: RequestInit = {
    ...defaultOptions,
    headers: {
        ...defaultOptions.headers,
        Authorization: `Bearer ${config.bearerToken}`,
    },
};

export async function fetchData<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${config.baseUrl}/${endpoint}`;
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function fetchAuthData<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    return fetchData<T>(endpoint, { ...authOptions, ...options });
}
