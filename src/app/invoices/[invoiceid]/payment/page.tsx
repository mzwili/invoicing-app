import { Customers, Invoices } from "@/database/schema";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Container from "@/components/Container";
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { db } from "@/database";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";

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
      name: result.name
    }
  }
  
  

  return (
    <main className="w-full h-full">
      <Container>
        <div className="grid grid-cols-2">
          <div>
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
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Invoice</h2>
            { invoice.status === 'open' && (<form>
              <Button className="flex gap-2 font-bold bg-blue-500">
                <CreditCard className="w-5 h-auto"/>
                Pay Invoice
              </Button>
            </form>
            )}

            { invoice.status === 'paid' && (<form>
              <p className="flex gap-2 items-center text-xl font-bold">
                <Check className="w-5 h-auto bg-green-500 rounded-full text-white p-1"/>
                Invoice Paid
              </p>
            </form>
            )}
            
          </div>
        </div>
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
