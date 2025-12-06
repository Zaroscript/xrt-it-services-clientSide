'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';
import invoiceService, { type Invoice } from '@/services/invoiceService';
import { companySettingsService, type CompanySettings } from '@/services/companySettingsService';
import { toast } from '@/components/ui/custom-toast';
import { InvoiceDetailModal } from '@/components/modals/InvoiceDetailModal';

export default function InvoicesTab() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get only sent and paid invoices
        const invoiceData = await invoiceService.getSentAndPaidInvoices();
        setInvoices(invoiceData);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setError('Failed to load invoices. Please try again later.');
        toast.error('Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'sent':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      case 'draft':
        return 'outline';
      default:
        return 'secondary';
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

  if (loading) {
    return (
      <div id='invoices' className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <div className="flex-1 sm:text-right">
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Skeleton className="h-8 w-16 sm:w-auto" />
                    <Skeleton className="h-8 w-20 sm:w-auto" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div id='invoices' className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <p className="text-muted-foreground mt-2">
          View and download your invoices
        </p>
      </div>

      {error ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error Loading Invoices</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-4">
              {error}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Invoices Yet</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              Your invoices will appear here once you have active services or subscriptions.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>All your past and current invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice._id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-semibold">Invoice #{invoice.invoiceNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(invoice.issueDate)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: {formatDate(invoice.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 sm:text-right">
                      <p className="font-semibold text-lg">${invoice.total.toFixed(2)}</p>
                      <Badge variant={getStatusVariant(invoice.status)} className="mt-1">
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewInvoice(invoice)}
                      className="w-full sm:w-auto justify-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadPdf(invoice)}
                      disabled={isDownloading === invoice._id}
                      className="w-full sm:w-auto justify-center"
                    >
                      {isDownloading === invoice._id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <InvoiceDetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedInvoice(null);
          }}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
}
