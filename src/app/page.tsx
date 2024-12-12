import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import Link from 'next/link';


export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold">
          InvoQuest
        </h1>
        <p>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Button asChild>
          <Link href="/dashboard">
            Sign In
          </Link>
          </Button>
        </p>
    </main>
  );
}
