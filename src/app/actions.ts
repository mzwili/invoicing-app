"use server";

import { Invoices } from "@/database/schema";
import { db } from "@/database";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server';

export async function createActions(formData: FormData){
    const { userId } = await auth();
    const amount =  parseFloat(String(formData.get('amount')));
    const description = formData.get('description') as string;

    if ( !userId ) {
        return;
    }

    const results = await db.insert(Invoices)
    .values({
        amount,
        description,
        status:'open',
        userId
    }).returning({
        id: Invoices.id
    })

    redirect(`/invoices/${results[0].id}`)
    
}