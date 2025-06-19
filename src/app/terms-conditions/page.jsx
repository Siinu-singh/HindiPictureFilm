
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import { FileText, ShieldAlert, ExternalLink, UserCheck, Edit3, AlertOctagon, Info } from 'lucide-react';

export default async function TermsConditionsPage() {
  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center mb-6 md:mb-10">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-3 sm:mr-4" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary">
              Terms of Service
            </h1>
          </div>

          <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg space-y-8">
            <section aria-labelledby="welcome-terms">
              <h2 id="welcome-terms" className="text-xl sm:text-2xl font-headline font-semibold text-accent mb-2 flex items-center">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 shrink-0" /> Welcome to HindiPictureFilm
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                By using our website, you agree to the following terms and conditions. Please read them carefully.
              </p>
            </section>

            <section aria-labelledby="acceptance-terms" className="space-y-3">
              <div className="flex items-center">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h3 id="acceptance-terms" className="text-lg sm:text-xl font-headline font-semibold text-accent">
                  1. Acceptance of Terms
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9">
                By accessing HindiPictureFilm, you agree to comply with these Terms of Service. If you do not agree, please do not use the site.
              </p>
            </section>

            <section aria-labelledby="content-use-terms" className="space-y-3">
              <div className="flex items-center">
                <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h3 id="content-use-terms" className="text-lg sm:text-xl font-headline font-semibold text-accent">
                  2. Use of Content
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9">
                All content on HindiPictureFilm is for informational and entertainment purposes only. You may not reproduce, republish, or redistribute any content without our permission.
              </p>
            </section>

            <section aria-labelledby="user-conduct-terms" className="space-y-3">
              <div className="flex items-center">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h3 id="user-conduct-terms" className="text-lg sm:text-xl font-headline font-semibold text-accent">
                  3. User Conduct
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9 mb-1">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-muted-foreground ml-10 sm:ml-12">
                <li>Post abusive, offensive, or illegal content</li>
                <li>Disrupt the site’s operation</li>
                <li>Attempt to gain unauthorized access to the site</li>
              </ul>
            </section>

            <section aria-labelledby="external-links-terms" className="space-y-3">
              <div className="flex items-center">
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h3 id="external-links-terms" className="text-lg sm:text-xl font-headline font-semibold text-accent">
                  4. External Links
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9">
                HindiPictureFilm may contain links to third-party websites. We are not responsible for their content, terms, or policies.
              </p>
            </section>

            <section aria-labelledby="disclaimer-terms" className="space-y-3">
              <div className="flex items-center">
                <AlertOctagon className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h3 id="disclaimer-terms" className="text-lg sm:text-xl font-headline font-semibold text-accent">
                  5. Disclaimer
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9">
                We strive to provide accurate and updated information. However, we do not guarantee that all content is free of errors or suitable for all purposes.
              </p>
            </section>
            
            <section aria-labelledby="termination-terms" className="space-y-3">
              <div className="flex items-center">
                <AlertOctagon className="w-5 h-5 sm:w-6 sm:h-6 text-destructive mr-2 sm:mr-3 shrink-0" />
                <h3 id="termination-terms" className="text-lg sm:text-xl font-headline font-semibold text-destructive">
                  6. Termination
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9">
                We reserve the right to restrict or terminate your access to HindiPictureFilm at our discretion, without notice, if we believe you have violated our terms.
              </p>
            </section>

            <section aria-labelledby="changes-terms" className="space-y-3">
               <div className="flex items-center">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h3 id="changes-terms" className="text-lg sm:text-xl font-headline font-semibold text-accent">
                  7. Changes to Terms
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9">
                HindiPictureFilm may modify these Terms of Service at any time. Your continued use of the site indicates your acceptance of any changes.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
