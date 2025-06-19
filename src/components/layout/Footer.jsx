
import Link from 'next/link';
import { Film, Mail, FileText, ShieldCheck } from 'lucide-react'; // Changed Video to Film
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border/30 py-10 sm:py-16 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start lg:col-span-2 md:col-span-2">
             <Link href="/" className="flex items-center gap-2 group mb-4">
                <Film className="h-9 w-9 text-primary transition-transform duration-300 group-hover:rotate-[10deg]" /> {/* Changed Video to Film */}
                <span 
                  className="text-3xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text group-hover:opacity-80 transition-opacity duration-300"
                >
                  <span className="font-pacifico">Hindi</span><span className="font-headline tracking-wider">picturefilm</span>
                </span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-md">
              Your ultimate destination for discovering and exploring the vibrant world of Hindi cinema, from timeless classics to the latest blockbusters.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center md:text-left">
            <h5 className="text-lg font-headline font-semibold text-foreground mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link href="/movies" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Movies</Link></li>
              <li><Link href="/tvshows" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">TV Shows</Link></li>
              <li><Link href="/genres" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Genres</Link></li>
              <li><Link href="/livetv" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Live TV</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Contact */}
          <div className="text-center md:text-left">
            <h5 className="text-lg font-headline font-semibold text-foreground mb-4">Information</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  <ShieldCheck className="w-4 h-4 shrink-0" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  <FileText className="w-4 h-4 shrink-0" /> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Mail className="w-4 h-4 shrink-0" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/40" />
        
        <div className="text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hindipicturefilm.com. All Rights Reserved.</p>
          <p className="mt-1">
            Crafted with <span className="text-primary animate-pulse">&hearts;</span> for the love of cinema.
          </p>
        </div>
      </div>
    </footer>
  );
}
