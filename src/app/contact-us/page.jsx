
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, Clock, Building, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact Us - Hindipicturefilm.com',
  description: 'Get in touch with Hindipicturefilm.com. We are here to help with your queries, feedback, or suggestions.',
};

export default async function ContactUsPage() {
  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center mb-6 md:mb-10">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-3 sm:mr-4" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary">
              Contact Us
            </h1>
          </div>

          <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg space-y-8">
            <section aria-labelledby="contact-intro">
              <h2 id="contact-intro" className="text-xl sm:text-2xl font-headline font-semibold text-accent mb-3">
                Welcome to HindiPictureFilm!
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-4">
                Got a query or something to share? Whether it's a review request, feature idea, or technical issue—our team is here to help.
              </p>
            </section>

            <section aria-labelledby="reach-us-title" className="space-y-4">
              <h3 id="reach-us-title" className="text-lg sm:text-xl font-headline font-semibold text-accent mb-3">
                Reach Us At:
              </h3>
              <div className="space-y-3">
                <a href="mailto:info@hindipicturefilm.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                  <Mail className="w-5 h-5 text-primary/80 group-hover:text-primary" />
                  <span className="text-sm sm:text-base">info@hindipicturefilm.com (General Inquiries)</span>
                </a>
                <a href="mailto:ads@hindipicturefilm.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                  <Building className="w-5 h-5 text-primary/80 group-hover:text-primary" />
                  <span className="text-sm sm:text-base">ads@hindipicturefilm.com (Advertising & Features)</span>
                </a>
                <a href="mailto:feedback@hindipicturefilm.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                  <MessageSquare className="w-5 h-5 text-primary/80 group-hover:text-primary" />
                  <span className="text-sm sm:text-base">feedback@hindipicturefilm.com (Content Corrections/Concerns)</span>
                </a>
              </div>
            </section>

            <section aria-labelledby="office-hours-title" className="space-y-2">
              <div className="flex items-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent mr-2 sm:mr-3 shrink-0" />
                <h3 id="office-hours-title" className="text-lg sm:text-xl font-headline font-semibold text-accent">
                  Office Hours:
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9">
                Monday to Friday – 10:00 AM to 5:30 PM (IST)
              </p>
            </section>

            <section aria-labelledby="contact-form-title">
              <h3 id="contact-form-title" className="text-lg sm:text-xl font-headline font-semibold text-accent mb-4">
                Quick Contact Form
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Drop us a line using the form below—we usually respond within 1–2 business days.
              </p>
              <ContactForm />
            </section>

            <p className="text-center text-md sm:text-lg text-foreground/90 pt-4">
              Thank you for being part of the HindiPictureFilm family!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
