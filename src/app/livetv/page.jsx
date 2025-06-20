
import { getLiveTVChannels, getBanners, getTVShows } from '@/lib/data';
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import LiveTVCard from '@/components/movies/LiveTVCard';
import HeroLiveTV from '@/components/livetv/HeroLiveTV';
import HorizontalMediaList from '@/components/shared/HorizontalMediaList';
import TVShowCard from '@/components/movies/TVShowCard';
import { CalendarClock, TvMinimalPlay } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function LiveTVPage() {
  const [bannersData, channels, trendingShows] = await Promise.all([
    getBanners(),
    getLiveTVChannels({ limit: 10 }),
    getTVShows({ limit: 8 }),
  ]);
  
  const heroBanner = bannersData.find(b => b.id === 'banner-livetv-hero') || bannersData[0];

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col overflow-x-hidden">
        
        {heroBanner ? <HeroLiveTV banner={heroBanner} /> : <Skeleton className="w-full h-[60vh] md:h-[70vh] mb-8 md:mb-12" /> }

        <section
          id="live-channels-grid"
          className="py-8 md:py-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground mb-6 md:mb-8 flex items-center">
            <TvMinimalPlay className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-2 sm:mr-3 text-primary" /> Live Channels
          </h2>
          {channels.length === 0 ? (
            <p className="text-muted-foreground text-center py-10 text-lg">No Live TV channels available at the moment.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
              {channels.map((channel) => (
                <LiveTVCard key={channel.id} channel={channel} />
              ))}
            </div>
          )}
        </section>

        {trendingShows.length > 0 && (
           <div className="bg-background overflow-x-hidden">
             <HorizontalMediaList 
                items={trendingShows} 
                CardComponent={TVShowCard} 
                title="Trending TV Shows" 
             />
           </div>
        )}
        
        <section 
          className="py-8 md:py-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground mb-6 md:mb-8 flex items-center">
            <CalendarClock className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-2 sm:mr-3 text-primary" /> What's On Now
          </h2>
          <div className="bg-card p-6 sm:p-8 rounded-xl shadow-lg text-center">
            <p className="text-lg sm:text-xl text-muted-foreground">
              Detailed schedule and "What's Playing Now" features are coming soon!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Stay tuned for live program information.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
