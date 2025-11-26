'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { clientService } from '@/services/client/client.service';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface RequestServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function RequestServiceModal({ isOpen, onClose, onSuccess }: RequestServiceModalProps) {
  const [services, setServices] = useState<any[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingServices, setIsFetchingServices] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchServices();
    }
  }, [isOpen]);

  const fetchServices = async () => {
    setIsFetchingServices(true);
    try {
      const data = await clientService.getAvailableServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setIsFetchingServices(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedServiceId) {
      toast.error('Please select a service');
      return;
    }

    setIsLoading(true);
    try {
      await clientService.requestNewService(selectedServiceId, notes);
      toast.success('Service request submitted successfully!');
      setSelectedServiceId('');
      setNotes('');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Error creating service request:', error);
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request a Service">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service">Select Service</Label>
          {isFetchingServices ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-2">
              {services.map((service) => (
                <div
                  key={service._id}
                  onClick={() => setSelectedServiceId(service._id)}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedServiceId === service._id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{service.name}</h4>
                        {selectedServiceId === service._id && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {services.length === 0 && !isFetchingServices && (
                <p className="text-center text-muted-foreground py-4">
                  No services available
                </p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes (Optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific requirements or questions about the service..."
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !selectedServiceId}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
