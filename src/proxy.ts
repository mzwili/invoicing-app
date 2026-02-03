import { clerkMiddleware } from "@clerk/nextjs/server";

function isPublicPath(pathname: string){
  if (pathname === "/") return true;
  if (pathname.startsWith('/sign-in')) return true;
  if (pathname.startsWith('/sign-up')) return true;
  if (/^\/invoices\/.*\/payment/.test(pathname)) return true;
  return false;
}

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = new URL(request.url);
  if (isPublicPath(pathname)) return;

  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};