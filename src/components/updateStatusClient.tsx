'use client';

import { useEffect } from 'react';
import { updateStatusAction } from '@/app/actions';

interface Props {
  sessionId: string;
  invoiceId: number;
}

export default function UpdateStatusClient({ sessionId, invoiceId }: Props) {
  useEffect(() => {
    const updateInvoice = async () => {
      try {
        const formData = new FormData();
        formData.append('id', String(invoiceId));
        formData.append('status', 'paid');
        await updateStatusAction(formData);
      } catch (error) {
        console.error("Error updating invoice:", error);
      }
    };

    updateInvoice();
  }, [sessionId, invoiceId]);

  return null;
}
