'use client'

import { useSearchParams } from 'next/navigation';
import UpdateStatusClient from '@/components/updateStatusClient';

interface Props {
  invoiceId: number;
}

export default function InvoiceStatusClient({ invoiceId }: Props) {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const sessionId = searchParams.get('session_id') ?? '';

  const isSuccess = sessionId && status === 'success';
  const isCanceled = status === 'canceled';
  const isError = (isSuccess && !sessionId);

  return (
    <>
      {isSuccess && <UpdateStatusClient invoiceId={invoiceId} sessionId={sessionId} />}
      {isError && (
        <p className="bg-red-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-5">
          Something went wrong!!!
        </p>
      )}
      {isCanceled && (
        <p className="bg-orange-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-5">
          Payment Cancelled!!!
        </p>
      )}
    </>
  );
}
