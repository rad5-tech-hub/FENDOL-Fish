import api from '../lib/api';

export interface InitializePaymentPayload {
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    variant?: string;
    packContents?: Array<{
      size: string;
      quantity: number;
    }>;
  }>;
  pricing: {
    subtotal: number;
    processingFee: number;
    totalAmount: number;
  };
}

export async function initializePayment(payload: InitializePaymentPayload) {
  const { data } = await api.post('/paystack/initialize-payment', payload);
  return data;
}
