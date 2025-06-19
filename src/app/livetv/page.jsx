
"use client";

import { useEffect, useState, Suspense } from 'react';
import { getLiveTVChannels, getBanners, getTVShows } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import LiveTVCard from '@/components/movies/LiveTVCard';
import HeroLiveTV from '@/components/livetv/HeroLiveTV';
import HorizontalMediaList from '@/components/shared/HorizontalMediaList';
import TVShowCard from '@/components/movies/TVShowCard';
import { motion } from 'framer-motion';
import { CalendarClock, TvMinimalPlay } from 'lucide-react';

const LiveTVPageSkeleton = () => (
  <div className="flex-1 flex flex-col bg-background text-foreground"> {/* Adjusted for ClientLayout */}
    {/* TopNavbar and Sidebar Skeletons part of main layout */}
    <div className="flex-1 flex flex-col"> {/* This div takes padding from ClientLayout */}
      {/* HeroLiveTV Skeleton */}
      <Skeleton className="w-full h-[60vh] md:h-[70vh] mb-8 md:mb-12" />

      {/* Live Channels Grid Title Skeleton */}
      <div className="mb-8 md:mb-12">
        <Skeleton className="h-7 sm:h-8 w-1/2 sm:w-1/3 mb-4 sm:mb-6 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, i) => ( 
            <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-card">
              <Skeleton className="w-full h-32 sm:h-40 md:h-48" />
              <div className="p-3 md:p-4">
                <Skeleton className="h-4 md:h-5 w-3/4 mb-2 rounded" />
                <Skeleton className="h-3 w-full mb-1 rounded" />
                <Skeleton className="h-3 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending TV Shows Skeleton */}
      <div className="mb-8 md:mb-12">
        <Skeleton className="h-7 sm:h-8 w-1/2 sm:w-1/4 mb-4 sm:mb-6 rounded" />
        <div className="flex space-x-4 md:space-x-6 overflow-x-hidden pb-6">
          {[...Array(4)].map((_, i) => (
            <div key={`trend-skel-${i}`} className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px]">
              <Skeleton className="w-full aspect-[2/3] rounded-xl" />
               <Skeleton className="h-4 md:h-5 w-3/4 mt-2 mb-1 rounded" />
               <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Schedule Section Skeleton */}
      <div>
        <Skeleton className="h-7 sm:h-8 w-1/2 sm:w-1/3 mb-4 sm:mb-6 rounded" />
        <Skeleton className="h-32 sm:h-40 w-full rounded-lg bg-card" />
      </div>
    </div>
  </div>
);

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function LiveTVPageContent() {
  const [heroBanner, setHeroBanner] = useState(null);
  const [channels, setChannels] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const bannersData = await getBanners();
        const liveTVHero = bannersData.find(b => b.id === 'banner-livetv-hero') || bannersData[0];
        setHeroBanner(liveTVHero);

        const channelsData = await getLiveTVChannels({ limit: 10 }); // Limiting for main display
        setChannels(channelsData);

        const showsData = await getTVShows({ limit: 8 }); // For trending shows carousel
        setTrendingShows(showsData);

      } catch (error) {
        console.error("Failed to fetch Live TV page data:", error);
      }
      setLoading(false);
    };
    fetchPageData();
  }, []);

  if (loading) {
    return <LiveTVPageSkeleton />;
  }

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground"> {/* mt-20 removed */}
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col overflow-x-hidden"> {/* No padding here, ClientLayout handles it */}
        <HeroLiveTV banner={heroBanner} />

        <motion.section
          id="live-channels-grid"
          className="py-8 md:py-12" // Adjusted padding
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground mb-6 md:mb-8 flex items-center">
            <TvMinimalPlay className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-2 sm:mr-3 text-primary" /> Live Channels
          </h2>
          {channels.length === 0 && !loading ? (
            <p className="text-muted-foreground text-center py-10 text-lg">No Live TV channels available at the moment.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
              {channels.map((channel) => (
                <LiveTVCard key={channel.id} channel={channel} />
              ))}
            </div>
          )}
        </motion.section>

        {trendingShows.length > 0 && (
           <div className="bg-background"> {/* Ensure HorizontalMediaList has a consistent background, padding handled by HorizontalMediaList itself */}
             <HorizontalMediaList 
                items={trendingShows} 
                CardComponent={TVShowCard} 
                title="Trending TV Shows" 
             />
           </div>
        )}
        
        <motion.section 
          className="py-8 md:py-12" // Adjusted padding
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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
        </motion.section>

      </main>
    </div>
  );
}

export default function LiveTVPage() {
  return (
    <Suspense fallback={<LiveTVPageSkeleton />}>
      <LiveTVPageContent />
    </Suspense>
  );
}

