'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

export default function InvoicesTab() {
  // Placeholder for now - will be connected to real invoice API later
  const invoices = [
    // Example structure
    // { id: '1', date: '2024-01-15', amount: 99.99, status: 'paid' }
  ];

  return (
    <div id='invoices' className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <p className="text-muted-foreground mt-2">
          View and download your invoices
        </p>
      </div>

      {invoices.length === 0 ? (
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
              {invoices.map((invoice: any) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">Invoice #{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">${invoice.amount}</p>
                      <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
