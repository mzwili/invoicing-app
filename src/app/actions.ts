"use server";

import { Invoices, Status } from "@/database/schema";
import { db } from "@/database";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server';
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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