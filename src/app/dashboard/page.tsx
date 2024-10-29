import { Button } from "@/components/ui/button"
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium text-left">29/10/2024</TableCell>
                <TableCell className="text-left">Sam James</TableCell>
                <TableCell className="text-left">sam@mymail.co.za</TableCell>
                <TableCell className="text-center">Open</TableCell>
                <TableCell className="text-right">R2500</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    </main>
  );
}
