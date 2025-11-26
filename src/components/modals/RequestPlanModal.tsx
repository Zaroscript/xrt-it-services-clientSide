'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { clientService } from '@/services/client/client.service';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface RequestPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function RequestPlanModal({ isOpen, onClose, onSuccess }: RequestPlanModalProps) {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPlans, setIsFetchingPlans] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen]);

  const fetchPlans = async () => {
    setIsFetchingPlans(true);
    try {
      const data = await clientService.getAvailablePlans();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error('Failed to load plans');
    } finally {
      setIsFetchingPlans(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlanId) {
      toast.error('Please select a plan');
      return;
    }

    setIsLoading(true);
    try {
      await clientService.requestSubscriptionChange(selectedPlanId, notes);
      toast.success('Plan change request submitted successfully!');
      setSelectedPlanId('');
      setNotes('');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Error creating plan request:', error);
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Plan Change">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plan">Select Plan</Label>
          {isFetchingPlans ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto border rounded-md p-2">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  onClick={() => setSelectedPlanId(plan._id)}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedPlanId === plan._id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{plan.name}</h4>
                        {selectedPlanId === plan._id && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.billingCycle}</span>
                        <Badge variant="outline" className="ml-2">{plan.billingCycle}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {plan.description}
                      </p>
                      {plan.features && Array.isArray(plan.features) && plan.features.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Features:</p>
                          <ul className="text-xs space-y-1">
                            {plan.features.slice(0, 3).map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                            {plan.features.length > 3 && (
                              <li className="text-muted-foreground">
                                +{plan.features.length - 3} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {plans.length === 0 && !isFetchingPlans && (
                <p className="text-center text-muted-foreground py-4">
                  No plans available
                </p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Reason for Change (Optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Please let us know why you'd like to change your plan..."
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !selectedPlanId}>
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
