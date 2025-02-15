import { Customers, Invoices } from "@/database/schema";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Container from "@/components/Container";
import { ChevronDown } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useOptimistic } from 'react';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import {AVAILABLE_STATUSES} from '@/data/invoices';
import { updateStatusAction, deleteInvoiceAction } from '@/app/actions';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { db } from "@/database";

export default async function InvoicePage({ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params;
  const invoiceIdNumber = parseInt(invoiceId);

  if (isNaN(invoiceIdNumber)){
    throw new Error('Invalid Invoice ID')
  }

  const [result] = await db.select({
    id: Invoices.id,
    status: Invoices.status,
    createTs: Invoices.createTs,
    description: Invoices.description,
    amount: Invoices.amount,
    name: Customers.name
  })
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceIdNumber))
    .limit(1)
  
  if(!result){
    notFound();
  }

  const invoice = {
    ...result,
    customer: {
      name: result.name}
  }
  
  

  return (
    <main className="w-full h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-semibold">
            Invoice {invoice.id}
            <Badge className={cn(
              "rounded-full capitalize", invoice.status === 'open' && 'bg-blue-500',
              invoice.status === 'paid' && 'bg-green-600',
              invoice.status === 'void' && 'bg-zinc-500',
              invoice.status === 'uncollectable' && 'bg-red-500',
              )}>
              { invoice.status }
            </Badge>
          </h1>
        </div>

        <p className="text-3xl mb-3">
          R{ (invoice.amount).toFixed(2) }
        </p>

        <p className="text-lg mb-8">
          { invoice.description }
        </p>

        <h2 className="font-bold text-lg mb-4">
          Billing Details
        </h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-meduim text-sm">Invoice ID</strong>
            <span>{ invoice.id }</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-meduim text-sm">Invoice Date</strong>
            <span>{ new Date(invoice.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-meduim text-sm">Billing Name</strong>
            <span>{ invoice.customer.name }</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
