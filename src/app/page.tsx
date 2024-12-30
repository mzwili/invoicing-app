import { Button } from "@/components/ui/button"
import Link from 'next/link';
import Container from "@/components/Container";

export default function Home() {
  return (
    
    <main className="flex flex-col justify-center items-center text-center">
      <Container>
        <h1 className="text-5xl font-bold">
          InvoQuest
        </h1>
        <p>
        
          <Button asChild>
            <Link href="/dashboard">
              Sign In
            </Link>
          </Button>
        </p>
      </Container>
    </main>
  );
}
