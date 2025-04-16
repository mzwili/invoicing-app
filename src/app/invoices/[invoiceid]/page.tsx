import { notFound } from 'next/navigation';
import { db } from '@/database'
import { Customers, Invoices } from "@/database/schema";
import { eq } from 'drizzle-orm';
import Invoice from './invoice';

export default async function InvoicePage({ params }: { params: Promise<{ invoiceid: string }> }) {
  const { invoiceid } = await params;
  const invoiceIdNumber = parseInt(invoiceid);

  if (isNaN(invoiceIdNumber)){
    throw new Error('Invalid Invoice ID')
  }

  const [result] = await db.select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceIdNumber))
    .limit(1)
  
  if(!result){
    notFound();
  }

  const invoice = {
    ...result.invoices,
    customer: result.customers
  }

  return <Invoice invoice={invoice}/>
}
