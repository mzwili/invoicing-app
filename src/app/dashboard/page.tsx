import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"
import { CirclePlus } from 'lucide-react';
import { db } from '@/database'
import { Invoices } from "@/database/schema";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn } from "@/lib/utils";
import Container from "@/components/Container";


export default async function DashBoard() {
  const results = await db.select().from(Invoices);
  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-semibold">
              Invoices
            </h1>
            <p>
              <Button className="inline-flex gap-2" variant="ghost" asChild>
                <Link href="/invoices/new">
                <CirclePlus className="h-4 w-4"/>
                  Create Invoice
                </Link>
                
              </Button>
            </p>
        </div>
        
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    Date
                  </TableHead>
                  <TableHead className="p-4">
                    Customer
                  </TableHead>
                  <TableHead className="p-4">
                    Email
                  </TableHead>
                  <TableHead className="text-center p-4">
                    Status
                  </TableHead>
                  <TableHead className="text-right p-4">
                    Amount
                  </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {results.map(result => {
                return (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium text-left p-0">
                      <Link href={`/invoices/${ result.id}`} className="block font-semibold p-4">
                        { new Date(result.createTs).toLocaleDateString()}
                      </Link>
                    </TableCell>
                    <TableCell className="text-left p-0">
                      <Link href={`/invoices/${ result.id}`} className="block font-semibold p-4">
                        Sam James
                      </Link>
                    </TableCell>
                    <TableCell className="text-left p-0">
                      <Link href={`/invoices/${result.id}`} className="block p-4">
                        sam@mymail.co.za
                      </Link>
                    </TableCell>
                    <TableCell className="text-center p-0">
                      <Link href={`/invoices/${result.id}`} className="block p-4">
                      <Badge className={cn(
                        "rounded-full capitalize", result.status === 'open' && 'bg-blue-500',
                        result.status === 'paid' && 'bg-green-600',
                        result.status === 'void' && 'bg-zinc-500',
                        result.status === 'uncollectable' && 'bg-red-500',
                        )}>
                        { result.status }
                      </Badge>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right p-0">
                      <Link href={`/invoices/${result.id}`} className="block font-semibold p-4">
                        R{ (result.amount).toFixed(2) }
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
                
            </TableBody>
        </Table>
      </Container>
    </main>
  );
}
