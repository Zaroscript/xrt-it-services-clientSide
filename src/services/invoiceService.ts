import api from '@/lib/api';
import type { ApiResponse } from '@/services/auth/auth.service';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1";

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  client:
    | string
    | {
        _id: string;
        companyName: string;
        email: string;
      };
  user:
    | string
    | {
        _id: string;
        fName: string;
        lName: string;
        email: string;
      };
  issueDate: string;
  dueDate: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate?: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  notes?: string;
  terms?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetInvoicesResponse {
  invoices: Invoice[];
}

export interface GetInvoiceByIdResponse {
  invoice: Invoice;
}

// Get invoices for authenticated client
export async function getMyInvoices(params?: {
  status?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Invoice[]> {
  try {
    const response = await api.get<ApiResponse<GetInvoicesResponse>>(
      "/invoices/my-invoices",
      { params }
    );
    return response.data.data.invoices;
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    throw error;
  }
}

// Get sent and paid invoices only
export async function getSentAndPaidInvoices(): Promise<Invoice[]> {
  try {
    const response = await api.get<ApiResponse<GetInvoicesResponse>>(
      "/invoices/my-invoices"
    );
    const allInvoices = response.data.data.invoices;
    // Filter to show only sent and paid invoices
    return allInvoices.filter(
      (invoice) => invoice.status === "sent" || invoice.status === "paid"
    );
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    throw error;
  }
}

// Get single invoice by ID
export async function getInvoiceById(id: string): Promise<Invoice> {
  try {
    const response = await api.get<ApiResponse<GetInvoiceByIdResponse>>(
      `/invoices/${id}`
    );
    return response.data.data.invoice;
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    throw error;
  }
}

export const invoiceService = {
  getMyInvoices,
  getInvoiceById,
  getSentAndPaidInvoices,
};

export default invoiceService;
