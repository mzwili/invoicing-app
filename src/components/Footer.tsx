import Container from '@/components/Container';

const Footer = () => {
    return (
        <footer className='mt-12 mb-8'>
            <Container className='flex justify-between gap-4'>
                <p className='text-sm'>
                QuestInvo &copy; { new Date().getFullYear() }
                </p>
                <p className='text-sm'>
                    Created by MzDev with Next.js, Xata and Clerk
                </p>
            </Container>
        </footer>
    )
}

export default Footer;