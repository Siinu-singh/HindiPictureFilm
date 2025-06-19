
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import { ShieldCheck, User, Activity, Database, Fingerprint, FileText, Info, Mail, Users } from 'lucide-react';

export default async function PrivacyPolicyPage() {
  const effectiveDate = "[Insert Date]"; // Replace with actual date
  const contactEmail = "[insert email]"; // Replace with actual email

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center mb-6 md:mb-10">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-3 sm:mr-4" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary">
              Privacy Policy
            </h1>
          </div>

          <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg space-y-8">
            <section aria-labelledby="effective-date">
              <p id="effective-date" className="text-sm text-muted-foreground">
                Effective Date: {effectiveDate}
              </p>
            </section>

            <section aria-labelledby="introduction">
              <p id="introduction" className="text-base sm:text-lg leading-relaxed text-foreground/90">
                At HindiPictureFilm, we respect your privacy and are committed to protecting your personal information. This privacy policy outlines what data we collect, how we use it, and your rights regarding your information.
              </p>
            </section>

            <section aria-labelledby="info-collect-title" className="space-y-4">
              <div className="flex items-center">
                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h2 id="info-collect-title" className="text-xl sm:text-2xl font-headline font-semibold text-accent">
                  Information We Collect
                </h2>
              </div>
              <div>
                <h3 className="font-semibold text-foreground/90 mb-1 sm:mb-2 text-md sm:text-lg flex items-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary/80" /> Personal Information
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground ml-6 sm:ml-7">
                  We may collect your name, email address, and any information you provide when subscribing to our newsletter or contacting us.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground/90 mb-1 sm:mb-2 text-md sm:text-lg flex items-center">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary/80" /> Usage Data
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground ml-6 sm:ml-7">
                  We collect data such as your IP address, browser type, pages visited, time spent on the site, and other analytics to improve your experience.
                </p>
              </div>
            </section>

            <section aria-labelledby="how-use-info-title" className="space-y-3">
               <div className="flex items-center">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h2 id="how-use-info-title" className="text-xl sm:text-2xl font-headline font-semibold text-accent mb-2">
                  How We Use Your Information
                </h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-1 sm:ml-2">
                <li>To provide and improve our services.</li>
                <li>To send newsletters or updates (only if you subscribe).</li>
                <li>To respond to your queries or feedback.</li>
                <li>To prevent fraudulent activity or protect our site.</li>
              </ul>
            </section>

            <section aria-labelledby="cookies-title" className="space-y-2">
               <div className="flex items-center">
                <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h2 id="cookies-title" className="text-xl sm:text-2xl font-headline font-semibold text-accent mb-1">
                  Cookies
                </h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                We use cookies to personalise content, track user behaviour, and improve user experience. You can choose to disable cookies in your browser settings.
              </p>
            </section>

            <section aria-labelledby="third-party-title" className="space-y-2">
               <div className="flex items-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h2 id="third-party-title" className="text-xl sm:text-2xl font-headline font-semibold text-accent mb-1">
                  Third-Party Services
                </h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                We may use third-party services like Google Analytics to track site performance. These third parties have their privacy policies.
              </p>
            </section>

            <section aria-labelledby="your-rights-title" className="space-y-2">
               <div className="flex items-center">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h2 id="your-rights-title" className="text-xl sm:text-2xl font-headline font-semibold text-accent mb-1">
                  Your Rights
                </h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                You can request access to, modification of, or deletion of your personal information at any time by contacting us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>.
              </p>
            </section>

            <section aria-labelledby="policy-changes-title" className="space-y-2">
               <div className="flex items-center">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h2 id="policy-changes-title" className="text-xl sm:text-2xl font-headline font-semibold text-accent mb-1">
                  Changes to This Policy
                </h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                We may update our Privacy Policy occasionally. We recommend reviewing this page periodically for changes.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
