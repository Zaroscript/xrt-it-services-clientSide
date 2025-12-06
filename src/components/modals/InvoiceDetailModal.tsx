"use client";

import { useRef, useState, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { Invoice } from "@/services/invoiceService";
import { companySettingsService, type CompanySettings } from "@/services/companySettingsService";
import { format } from "date-fns";
import { getLogoUrl, convertToDataUrl } from "@/utils/logoUtils";
import { Download, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "@/components/ui/custom-toast";

interface InvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export function InvoiceDetailModal({
  isOpen,
  onClose,
  invoice,
}: InvoiceDetailModalProps) {
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchCompanySettings = async () => {
        try {
          const settings = await companySettingsService.getSettings();
          setCompanySettings(settings);
        } catch (error) {
          console.error('Error fetching company settings:', error);
        }
      };
      fetchCompanySettings();
    }
  }, [isOpen]);

  const handleDownloadPdf = async () => {
    if (!invoice) {
      toast.error('Invoice not available');
      return;
    }
    
    if (!companySettings) {
      toast.error('Company settings not loaded. Please wait...');
      return;
    }

    try {
      setIsDownloading(true);

      // Convert logo to data URL for PDF compatibility
      let logoDataUrl: string | undefined;
      if (companySettings.logo) {
        const logoUrl = getLogoUrl(companySettings.logo);
        if (logoUrl) {
          logoDataUrl = await convertToDataUrl(logoUrl);
        }
      }

      // Dynamically import PDF components
      const { pdf } = await import('@react-pdf/renderer');
      const { Document, Page, Text, View, StyleSheet, Image: PDFImage } = await import(
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
                {logoDataUrl && (
                  <PDFImage src={logoDataUrl} style={styles.logo} />
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
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to download invoice PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!invoice) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Invoice #${invoice.invoiceNumber}`}
      size="2xl"
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={handleDownloadPdf} 
            className="gap-2"
            disabled={isDownloading || !companySettings}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>

        {/* Invoice Content */}
        <div className="bg-white p-4 sm:p-8 rounded-lg border-2 border-gray-200 shadow-lg text-gray-900 overflow-x-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 sm:mb-10 border-b-2 border-gray-300 pb-6 sm:pb-8 gap-6">
            <div className="flex-1">
              {companySettings?.logo && getLogoUrl(companySettings.logo) && (
                <div className="mb-4 sm:mb-6">
                  <Image
                    src={getLogoUrl(companySettings.logo)!}
                    alt={companySettings.companyName || "Company Logo"}
                    width={120}
                    height={40}
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2 tracking-tight">INVOICE</h2>
              <p className="text-sm sm:text-base text-gray-600 font-medium">#{invoice.invoiceNumber}</p>
            </div>
            <div className="text-left sm:text-right space-y-1">
              <div className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                {companySettings?.companyName || 
                  (typeof invoice.user !== "string" &&
                    (invoice.user as any).companyName) ||
                  "XRT IT Services"}
              </div>
              {companySettings?.address && (
                <div className="text-sm text-gray-600">
                  {companySettings.address}
                </div>
              )}
              {(companySettings?.city || companySettings?.state || companySettings?.zip) && (
                <div className="text-sm text-gray-600">
                  {[companySettings.city, companySettings.state, companySettings.zip]
                    .filter(Boolean).join(', ')}
                </div>
              )}
              {companySettings?.email && (
                <div className="text-sm text-gray-600">
                  {companySettings.email}
                </div>
              )}
              {companySettings?.phone && (
                <div className="text-sm text-gray-600">
                  {companySettings.phone}
                </div>
              )}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  Invoice Date:
                </div>
                <div className="text-sm text-gray-600">
                  {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
                </div>
                <div className="text-sm font-semibold text-gray-700 mt-2 mb-1">
                  Due Date:
                </div>
                <div className="text-sm text-gray-600">
                  {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-10 bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
              Bill To
            </h3>
            <div className="font-semibold text-lg text-gray-900 mb-1">
              {typeof invoice.client !== "string"
                ? invoice.client.companyName
                : "Client"}
            </div>
            {typeof invoice.client !== "string" && invoice.client.email && (
              <div className="text-sm text-gray-600">
                {invoice.client.email}
              </div>
            )}
          </div>

          {/* Items Table */}
          <div className="mb-6 sm:mb-10 overflow-hidden rounded-lg border-2 border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-primary/10 border-b-2 border-gray-300">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Description
                    </th>
                    <th className="text-center py-3 sm:py-4 px-2 sm:px-6 text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Duration
                    </th>
                    <th className="text-right py-3 sm:py-4 px-2 sm:px-6 text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Price
                    </th>
                    <th className="text-right py-3 sm:py-4 px-2 sm:px-6 text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => {
                    const durationType = (item as any).durationType || 'one-time';
                    const durationLabel = durationType === 'one-time' ? 'One-time' :
                                         durationType === 'monthly' ? 'Monthly' :
                                         durationType === 'quarterly' ? 'Quarterly' :
                                         durationType === 'annual' ? 'Annual' : durationType;
                    return (
                      <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-medium text-gray-900">{item.description}</td>
                        <td className="text-center py-3 sm:py-4 px-2 sm:px-6">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            {durationLabel}
                          </span>
                        </td>
                        <td className="text-right py-3 sm:py-4 px-2 sm:px-6 text-xs sm:text-sm text-gray-700">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="text-right py-3 sm:py-4 px-2 sm:px-6 text-xs sm:text-sm font-semibold text-gray-900">
                          {formatCurrency(1 * item.unitPrice)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-6 sm:mb-10">
            <div className="w-full sm:w-80 space-y-3 bg-gray-50 p-4 sm:p-6 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-700 font-medium">Subtotal:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(invoice.subtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-700 font-medium">Tax:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(invoice.tax)}
                </span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-xl sm:text-2xl font-bold text-primary">
                    {formatCurrency(invoice.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-gray-200">
              <h4 className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                Notes:
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                {invoice.notes}
              </p>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status:</span>
              <span className={`ml-3 inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold ${
                invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                invoice.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
