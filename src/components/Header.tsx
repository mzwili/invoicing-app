import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
  import Container from '@/components/Container';
import Link from 'next/link';

const Header = () => {
    return (
        <header className='mt-8 mb-12'>
            <Container>
                <div className='flex justify-between items-center gap-4'>
                    <p className='font-bold'>
                        <Link href="/dashboard">QuestInvo</Link>
                    </p>
                    <div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header;