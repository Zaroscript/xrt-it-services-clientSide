"use client";

import { useState, useEffect } from "react";
import invoiceService, { Invoice } from "@/services/invoiceService";
import { companySettingsService, type CompanySettings } from "@/services/companySettingsService";
import { format } from "date-fns";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  DollarSign,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InvoiceDetailModal } from "../modals/InvoiceDetailModal";

export function InvoicesList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      // Get only sent and paid invoices
      const data = await invoiceService.getSentAndPaidInvoices();
      setInvoices(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setError("Failed to load invoices");
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDownloadPdf = async (invoice: Invoice) => {
    try {
      setIsDownloading(invoice._id);

      // Fetch company settings to get logo and company info
      const companySettings = await companySettingsService.getSettings();

      // Dynamically import PDF components
      const { pdf } = await import('@react-pdf/renderer');
      const { Document, Page, Text, View, StyleSheet, Image } = await import(
        '@react-pdf/renderer'
      );

      // Define styles for the PDF
      const styles = StyleSheet.create({
        page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica' },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
          paddingBottom: 20,
          borderBottom: '2 solid #e2e8f0',
        },
        logo: { width: 120 },
        companyInfo: { alignItems: 'flex-end' },
        companyName: {
          fontSize: 18,
          fontWeight: 'bold',
          color: 'hsl(41 61% 64%)',
          marginBottom: 4,
        },
        invoiceTitle: {
          fontSize: 28,
          fontWeight: 'bold',
          color: 'hsl(41 61% 64%)',
          marginBottom: 20,
        },
        infoSection: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
        },
        infoBlock: { width: '48%' },
        infoLabel: {
          fontSize: 9,
          color: '#64748b',
          marginBottom: 4,
          textTransform: 'uppercase',
        },
        infoValue: { fontSize: 11, marginBottom: 8, fontWeight: 'bold' },
        table: { marginTop: 20 },
        tableHeader: {
          flexDirection: 'row',
          backgroundColor: '#f8fafc',
          padding: 10,
          borderBottom: '2 solid #e2e8f0',
        },
        tableRow: {
          flexDirection: 'row',
          padding: 10,
          borderBottom: '1 solid #e2e8f0',
        },
        col1: { width: '45%' },
        col2: { width: '15%', textAlign: 'right' },
        col3: { width: '15%', textAlign: 'right' },
        col4: { width: '10%', textAlign: 'right' },
        col5: { width: '15%', textAlign: 'right' },
        totalsSection: { marginLeft: 'auto', width: '45%', marginTop: 20 },
        totalRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 6,
          paddingHorizontal: 12,
        },
        grandTotalRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: 'hsl(41 61% 64%)',
          marginTop: 8,
          borderRadius: 4,
        },
        grandTotalText: { fontSize: 12, fontWeight: 'bold', color: 'white' },
        footer: { marginTop: 40, paddingTop: 20, borderTop: '1 solid #e2e8f0' },
      });

      // Helper functions
      const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);

      const formatDate = (date: string | Date) =>
        new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

      const getClientName = (client: any) =>
        typeof client === 'string' ? client : client?.companyName || 'N/A';

      // Create PDF Document
      const InvoicePDF = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                {companySettings.logo && (
                  <Image src={companySettings.logo} style={styles.logo} />
                )}
              </View>
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>
                  {companySettings.companyName || 'XRT IT Services'}
                </Text>
                {companySettings.address && (
                  <Text style={{ fontSize: 9, color: '#64748b' }}>
                    {companySettings.address}
                  </Text>
                )}
                {(companySettings.city || companySettings.state || companySettings.zip) && (
                  <Text style={{ fontSize: 9, color: '#64748b' }}>
                    {[
                      companySettings.city,
                      companySettings.state,
                      companySettings.zip
                    ].filter(Boolean).join(', ')}
                  </Text>
                )}
                {companySettings.email && (
                  <Text style={{ fontSize: 9, color: '#64748b' }}>
                    {companySettings.email}
                  </Text>
                )}
                {companySettings.phone && (
                  <Text style={{ fontSize: 9, color: '#64748b' }}>
                    {companySettings.phone}
                  </Text>
                )}
              </View>
            </View>

            {/* Invoice Title */}
            <Text style={styles.invoiceTitle}>INVOICE</Text>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Bill To</Text>
                <Text style={styles.infoValue}>
                  {getClientName(invoice.client)}
                </Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Invoice Number</Text>
                <Text style={styles.infoValue}>{invoice.invoiceNumber}</Text>
                <Text style={styles.infoLabel}>Issue Date</Text>
                <Text style={styles.infoValue}>
                  {formatDate(invoice.issueDate)}
                </Text>
                <Text style={styles.infoLabel}>Due Date</Text>
                <Text style={styles.infoValue}>
                  {formatDate(invoice.dueDate)}
                </Text>
              </View>
            </View>

            {/* Items Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text
                  style={[{ fontSize: 9, fontWeight: 'bold' }, styles.col1]}
                >
                  Description
                </Text>
                <Text
                  style={[{ fontSize: 9, fontWeight: 'bold' }, styles.col2]}
                >
                  Duration
                </Text>
                <Text
                  style={[{ fontSize: 9, fontWeight: 'bold' }, styles.col3]}
                >
                  Unit Price
                </Text>
                <Text
                  style={[{ fontSize: 9, fontWeight: 'bold' }, styles.col4]}
                >
                  Tax %
                </Text>
                <Text
                  style={[{ fontSize: 9, fontWeight: 'bold' }, styles.col5]}
                >
                  Amount
                </Text>
              </View>
              {invoice.items.map((item, index) => {
                // Use quantity = 1 for calculations
                const itemTotal = 1 * item.unitPrice;
                const itemTax =
                  (item.taxRate || 0) > 0
                    ? (itemTotal * (item.taxRate || 0)) / 100
                    : 0;
                const durationType = (item as any).durationType || 'one-time';
                const durationLabel = durationType === 'one-time' ? 'One-time' :
                                     durationType === 'monthly' ? 'Monthly' :
                                     durationType === 'quarterly' ? 'Quarterly' :
                                     durationType === 'annual' ? 'Annual' : durationType;
                return (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.col1}>{item.description}</Text>
                    <Text style={styles.col2}>{durationLabel}</Text>
                    <Text style={styles.col3}>
                      {formatCurrency(item.unitPrice)}
                    </Text>
                    <Text style={styles.col4}>{item.taxRate || 0}%</Text>
                    <Text style={styles.col5}>
                      {formatCurrency(itemTotal + itemTax)}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Totals */}
            <View style={styles.totalsSection}>
              <View style={styles.totalRow}>
                <Text>Subtotal</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {formatCurrency(invoice.subtotal)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text>Tax</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {formatCurrency(invoice.tax)}
                </Text>
              </View>
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalText}>Total</Text>
                <Text style={[styles.grandTotalText, { fontSize: 14 }]}>
                  {formatCurrency(invoice.total)}
                </Text>
              </View>
            </View>

            {/* Footer */}
            {invoice.notes && (
              <View style={styles.footer}>
                <Text
                  style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4 }}
                >
                  Notes
                </Text>
                <Text style={{ fontSize: 9, color: '#64748b' }}>
                  {invoice.notes}
                </Text>
              </View>
            )}
          </Page>
        </Document>
      );

      // Generate and download PDF
      const blob = await pdf(<InvoicePDF />).toBlob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoice.invoiceNumber || 'details'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      toast.success('Invoice downloaded successfully');
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Failed to download invoice');
    } finally {
      setIsDownloading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "sent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "cancelled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={fetchInvoices}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center p-8">
        <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No invoices yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your invoices will appear here once they are generated.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          My Invoices
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {invoices.length} invoice{invoices.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {invoice.invoiceNumber}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      invoice.status
                    )}`}
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mt-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Issued:{" "}
                      {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Due: {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleViewInvoice(invoice)}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleDownloadPdf(invoice)}
                      disabled={isDownloading === invoice._id}
                    >
                      {isDownloading === invoice._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <InvoiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
}
