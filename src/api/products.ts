import api from '../lib/api';
import type { ApiResponse, ApiProduct } from '../types';

export async function fetchPublicProducts(): Promise<ApiProduct[]> {
  const { data } = await api.get<ApiResponse<ApiProduct[]>>('/products/public');

  if (!data.success) {
    throw new Error(data.response_message || 'Failed to load products.');
  }

  return data.data ?? [];
}
