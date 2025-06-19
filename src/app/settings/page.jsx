
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';
import { Settings as SettingsIcon } from 'lucide-react';

export default async function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-center mb-6 md:mb-8">
            <SettingsIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-2 sm:mr-3" />
            <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary">Settings</h1>
          </div>
          
          <section className="bg-card p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <p className="text-sm sm:text-base text-muted-foreground">Theme (Dark/Light Mode)</p>
              <ThemeToggleButton />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Instantly switch between dark and light themes across the entire application. Your preference is saved locally.
            </p>
          </section>

          <section className="bg-card p-4 sm:p-6 rounded-lg shadow-md mt-6 md:mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Account</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Account management features (like profile editing, password change) will be available here soon.
            </p>
          </section>

           <section className="bg-card p-4 sm:p-6 rounded-lg shadow-md mt-6 md:mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Preferences</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              More application preferences will be added here in the future.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
