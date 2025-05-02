import { Button } from "@/components/ui/button"
import Link from 'next/link';
import Container from "@/components/Container";
import { HandCoins } from 'lucide-react';

export default function Home() {
  return (
    
    <main className="flex flex-col justify-center items-center text-center">
      <Container>
        <div className="flex flex-col items-center mb-2">
          <HandCoins className="w-20 h-20 text-black-500 mb-2" />
        </div>
        <h1 className="text-5xl font-bold mb-2">
          QuestInvo
        </h1>
        
        <div className="flex justify-center gap-1">
          <Button asChild className="hover:bg-white hover:text-black hover:border hover:border-black">
            <Link href="/dashboard">
              Sign In
            </Link>
          </Button>
          <Button asChild className="bg-white text-black border border-black hover:bg-black hover:text-white hover:border-white">
            <Link href="/sign-up">
              Sign Up
            </Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
