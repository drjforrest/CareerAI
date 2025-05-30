import { siteConfig } from '@/config/site';
import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8 mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
