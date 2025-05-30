'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { Menu, Briefcase } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming this hook exists
import UserAvatarButton from '@/components/auth/user-avatar-button';

export default function Navbar() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">{siteConfig.name}</span>
        </Link>

        {isMobile ? (
          <MobileNav />
        ) : (
          <DesktopNav />
        )}
      </div>
    </header>
  );
}

function DesktopNav() {
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {siteConfig.mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="transition-colors hover:text-primary"
        >
          {item.title}
        </Link>
      ))}
      <div className="flex items-center space-x-2">
        <UserAvatarButton />
        <ThemeToggle />
      </div>
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[300px] pt-10">
        <div className="flex flex-col space-y-4">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="border-t pt-4 space-y-4">
             <UserAvatarButton />
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Placeholder for UserAvatarButton until auth is implemented
// const UserAvatarButton = () => (
//   <div className="flex items-center gap-2">
//     <Button variant="ghost" asChild>
//       <Link href={siteConfig.authNav.signIn}>Login</Link>
//     </Button>
//     <Button asChild>
//       <Link href={siteConfig.authNav.signUp}>Sign Up</Link>
//     </Button>
//   </div>
// );

// We need to make sure UserAvatarButton is created in components/auth/user-avatar-button.tsx
// and it correctly handles client-side auth state (mocked or real).
// For now, this placeholder is inside the Navbar component file.
// I'll move it to its own file as planned.

// To ensure the `UserAvatarButton` is rendered correctly, especially if it uses hooks like `useState` or `useEffect`
// (which it will for managing mock auth state), it should be a client component.
// The Navbar itself is marked 'use client' because of `useIsMobile` and `useState`.

import * as React from 'react';
