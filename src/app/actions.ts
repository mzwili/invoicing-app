"use server";

import { Invoices } from "@/database/schema";
import { db } from "@/database";
import { redirect } from "next/navigation";

export async function createActions(formData: FormData){
    const amount =  parseFloat(String(formData.get('amount')))
    const description = formData.get('description') as string;

    const results = await db.insert(Invoices)
    .values({
        amount,
        description,
        status:'open'
    }).returning({
        id: Invoices.id
    })

    redirect(`/invoices/${results[0].id}`)
    
}