import { notFound } from 'next/navigation';
import { db } from '@/database'
import { Invoices } from "@/database/schema";
import { eq } from 'drizzle-orm';
import Invoice from './invoice';

export default async function InvoicePage({ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params;
  const invoiceIdNumber = parseInt(invoiceId);

  if (isNaN(invoiceIdNumber)){
    throw new Error('Invalid Invoice ID')
  }

  const [result] = await db.select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceIdNumber))
    .limit(1)
  
  if(!result){
    notFound();
  }

  return <Invoice invoice={result}/>
}
