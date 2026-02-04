"use server";

import { Customers, Invoices, Status } from "@/database/schema";
import { db } from "@/database";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server';
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Stripe from 'stripe';
import { headers } from "next/headers";
import { Resend } from 'resend';
import {  InvoiceCreatedEmail } from '@/emails/invoice-created';

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET));
const resend = new Resend(process.env.RESEND_API_KEY);

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
    });

    const { data, error } = await resend.emails.send({
        from: 'QuestInvo <quest@mzdev.info>',
        to: [email],
        subject: 'You have a new Invoice',
        react: <InvoiceCreatedEmail invoiceId={results[0].id} />, 
    });

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
};

export async function createPayment(formData: FormData){
    const headersList = await headers();
    const origin =  headersList.get('origin');
    const id = parseInt(formData.get('id') as string);

    const [result] = await db.select({
        status: Invoices.status,
        amount: Invoices.amount,
    })
    .from(Invoices)
    .where(eq(Invoices.id, id))
    .limit(1)
    
    const session = await stripe.checkout.sessions.create({
        
        line_items: [
          {
            price_data:{
                currency: 'zar',
                product: 'prod_S7zzGj9bWubnqn',
                unit_amount: result.amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/invoices/${id}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/invoices/${id}/payment?status=canceled&session_id={CHECKOUT_SESSION_ID}`,
    });

    if(!session.url){
        throw new Error('Invalid Session');
    };

    redirect(session.url);
};