import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
  import Container from '@/components/Container';

const Header = () => {
    return (
        <header>
            <Container>
                <div className='flex justify-between items-center gap-4'>
                    <p>InvoQuest</p>
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