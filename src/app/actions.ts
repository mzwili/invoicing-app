"use server";

import { Customers, Invoices, Status } from "@/database/schema";
import { db } from "@/database";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server';
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
// import Stripe from 'stripe';

// const stripe = new Stripe(String(process.env.STRIPE_API_SECRET));

export async function createActions(formData: FormData){
    const { userId } = await auth();
    

    if ( !userId ) {
        return;
    }

    const amount =  parseFloat(String(formData.get('amount')));
    const description = formData.get('description') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const [customer] = await db.insert(Customers)
    .values({
        name,
        email,
        userId
    }).returning({
        id: Customers.id
    })

    const results = await db.insert(Invoices)
    .values({
        amount,
        description,
        userId,
        customerId: customer.id,
        status:'open'
    }).returning({
        id: Invoices.id
    })

    redirect(`/invoices/${results[0].id}`)
    
}

export async function updateStatusAction(formData: FormData){
    const { userId } = await auth();

    if(!userId){
        return;
    }

    const id = formData.get('id') as string;
    const status = formData.get('status') as Status;

    const results = await db.update(Invoices)
        .set({ status})
        .where(
            and(
                eq(Invoices.id, parseInt(id)),
                eq(Invoices.userId, userId)
            )
        )
    revalidatePath(`/invoices/${id}`, 'page')
}

export async function deleteInvoiceAction(formData: FormData){
    const { userId } = await auth();

    if(!userId){
        return;
    }

    const id = formData.get('id') as string;
    const status = formData.get('status') as Status;

    const results = await db.delete(Invoices)
        .where(
            and(
                eq(Invoices.id, parseInt(id)),
                eq(Invoices.userId, userId)
            )
        )
    redirect('/dashboard')
}