import Link from 'next/link';
import { db } from '@/database'
import { Invoices } from "@/database/schema";
  

export default async function Home() {
  
  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">
            Invoice #
          </h1>
          <p>
            
          </p>
        </div>
        

    </main>
  );
}
