"use client";
import { Invoices } from "@/database/schema";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Container from "@/components/Container";
import { ChevronDown } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { useOptimistic } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import {AVAILABLE_STATUSES} from '@/data/invoices';
import { updateStatusAction, deleteInvoiceAction } from '@/app/actions';

interface InvoiceProps {
    invoice: typeof Invoices.$inferSelect
}

export default function Invoice({ invoice }: InvoiceProps) {

  const [currentStatus, setCurrentStatus] = useOptimistic(invoice.status, (status, newStatus) => {
    return String(newStatus);
  })

  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus =  currentStatus;
    setCurrentStatus(formData.get('status'))
    try{
      await updateStatusAction(formData);
    } catch(e){
      setCurrentStatus(originalStatus);
    }
    
  }
  return (
    <main className="w-full h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-semibold">
            Invoice {invoice.id}
            <Badge className={cn(
              "rounded-full capitalize", currentStatus === 'open' && 'bg-blue-500',
              currentStatus === 'paid' && 'bg-green-600',
              currentStatus === 'void' && 'bg-zinc-500',
              currentStatus === 'uncollectable' && 'bg-red-500',
              )}>
              { currentStatus }
            </Badge>
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='flex items-center gap-2' variant="outline">
                Change Status
                <ChevronDown className='w-4 h-auto'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                AVAILABLE_STATUSES.map(
                  status => {
                    return (
                      <DropdownMenu key={status.id}>
                        <form action={handleOnUpdateStatus}>
                          <input type='hidden' name='id' value={invoice.id}/>
                          <input type='hidden' name='status' value={status.id}/>
                          <button>{status.label}</button>
                        </form>
                      </DropdownMenu>
                    )
                  }
                )
              }
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='flex items-center gap-2' variant="outline">
                <span className="sr-only">More Options</span>
                <Ellipsis />
                <ChevronDown className='w-4 h-auto'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenu>
                <form action={deleteInvoiceAction}>
                  <input type='hidden' name='id' value={invoice.id}/>
                  <button>Delete Invoice</button>
                </form>
              </DropdownMenu>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-meduim text-sm">Billing Email</strong>
            <span></span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
