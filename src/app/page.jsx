
"use client";

import { useEffect, useState } from 'react';
import TopNavbar from '@/components/layout/TopNavbar';
import MovieCarousel from '@/components/home/MovieCarousel'; 
import Sidebar from '@/components/layout/Sidebar';
import MovieList from '@/components/movies/MovieList'; 
import HeroCarousel from '@/components/home/HeroCarousel'; 
import TVShowCard from '@/components/movies/TVShowCard';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Newspaper, CalendarCheck, Music2, Users, Sparkles, HelpCircle, Film, Palette, Star, VenetianMask } from 'lucide-react'; 

import { getMovies, getTVShows, getBanners, getGenres } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

const HomePageSkeleton = () => (
  <div className="flex-1 flex flex-col bg-background text-foreground overflow-hidden">
    <div className="flex-1 flex flex-col">
      <div className="w-full h-[calc(60vh-5rem)] md:h-[calc(70vh-5rem)] mb-8 md:mb-12">
        <Skeleton className="w-full h-full rounded-xl shadow-2xl" />
      </div>
      <div className="mb-8 md:mb-12">
        <Skeleton className="h-7 md:h-8 w-40 md:w-48 mb-4 md:mb-6 rounded-md" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-card">
              <Skeleton className="w-full aspect-[2/3]" />
              <div className="p-3 md:p-4">
                <Skeleton className="h-4 md:h-5 w-3/4 mb-2" />
                <Skeleton className="h-3 md:h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
       <div className="mb-8 md:mb-12">
        <Skeleton className="h-7 md:h-8 w-40 md:w-48 mb-4 md:mb-6 rounded-md" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={`skele-2-${i}`} className="rounded-xl overflow-hidden shadow-lg bg-card">
              <Skeleton className="w-full aspect-[2/3]" />
              <div className="p-3 md:p-4">
                <Skeleton className="h-4 md:h-5 w-3/4 mb-2" />
                <Skeleton className="h-3 md:h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-6 md:py-8">
          <Skeleton className="h-7 md:h-8 w-40 md:w-48 mb-4 md:mb-6 rounded-md" />
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[...Array(5)].map((_, i) => (
                <Skeleton key={`mc-skel-${i}`} className="w-32 h-48 sm:w-36 sm:h-52 md:w-40 md:h-60 rounded-lg" />
            ))}
          </div>
      </div>
    </div>
  </div>
);


export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [
          fetchedTrendingMovies,
          fetchedPopularTVShows,
          fetchedActionMovies,
          fetchedComedyMovies,
          fetchedBanners,
        ] = await Promise.all([
          getMovies({ limit: 6 }), 
          getTVShows({ limit: 6 }),   
          getMovies({ genre: 'Action', limit: 6 }),
          getMovies({ genre: 'Comedy', limit: 6 }),
          getBanners(),
        ]);
        setTrendingMovies(fetchedTrendingMovies);
        setPopularTVShows(fetchedPopularTVShows);
        setActionMovies(fetchedActionMovies);
        setComedyMovies(fetchedComedyMovies);
        setBanners(fetchedBanners);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground overflow-x-hidden">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col relative">
        {banners && banners.length > 0 && <HeroCarousel banners={banners} />}
        
        {trendingMovies && trendingMovies.length > 0 && (
          <MovieList movies={trendingMovies} title="Trending Movies" />
        )}

        {popularTVShows && popularTVShows.length > 0 && (
           <section className="py-8" aria-labelledby="tv-shows-title">
            <h2 id="tv-shows-title" className="text-2xl sm:text-3xl font-headline font-bold text-foreground mb-6">Popular TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-4 md:gap-6">
              {popularTVShows.map((show) => (
                <TVShowCard key={show.id} show={show} />
              ))}
            </div>
          </section>
        )}

        {actionMovies && actionMovies.length > 0 && (
          <MovieList movies={actionMovies} title="Action Packed" />
        )}

        {comedyMovies && comedyMovies.length > 0 && (
          <MovieList movies={comedyMovies} title="Laugh Out Loud Comedies" />
        )}
        
        {trendingMovies && trendingMovies.length > 0 && (
          <div className="py-8">
            <h2 className="text-2xl sm:text-3xl font-headline font-bold text-foreground mb-6">Quick Picks Carousel</h2>
            <MovieCarousel movies={trendingMovies.slice(0,10)} />
          </div>
        )}

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 space-y-12 md:space-y-20">

            {/* Welcome Section */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold mb-3"
              >
                 <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                    Welcome to HindiPictureFilm
                 </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 md:mb-12"
              >
                Your Complete Hindi Cinema Resource
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid md:grid-cols-5 gap-8 md:gap-10 items-center"
              >
                <div className="md:col-span-2 relative aspect-video md:aspect-[4/3] w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1604975701397-eff5812f7f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxib2xseXdvb2QlMjBjb2xsYWdlfGVufDB8fHx8MTc1MDQxNzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Hindi Cinema Collage" 
                    fill
                    className="rounded-lg shadow-xl object-cover"
                    data-ai-hint="bollywood collage"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="md:col-span-3 text-left">
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-4">
                    At HindiPictureFilm, we honor Hindi cinema's magic in its original form—the story, the actor, the songs, and the powerful stories that make Bollywood special and unique.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                    HindiPictureFilm is your one-stop shop for everything Indian movies, whether you are interested in the classics, contemporary blockbusters, or under-the-radar regional Hindi films.
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* The Colors of Hindi Cinema Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-xl shadow-lg p-6 sm:p-8 md:p-10"
            >
              <div className="flex items-center mb-6">
                <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-accent mr-3 shrink-0" />
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-semibold text-accent">The Colors of Hindi Cinema</h3>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                Anyone with an avid interest in Hindi cinema will attest to the fact that it is an emotion. And Bollywood is not just an industry. The joy of seeing your favorite star on screen, the thrill of a plot twist, and a song playing while you read the film's credits. HindiPictureFilm has all of these.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                From the early days of masala films to today's unique storytelling, from romantic films to thrillers, we cover Hindi film culture across the spectrum. From Amitabh Bachchan's golden era to Ranbir Kapoor's rise, HindiPictureFilm will keep you informed with impressions, memories, and the latest happenings in Hindi films.
              </p>
            </motion.div>

            {/* Grid for other informational sections */}
            <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-10 md:gap-y-12">
              {[
                { icon: Newspaper, title: "In-depth Bollywood News & Special Updates", content: ["Interested in what’s happening in B-town? At HindiPictureFilm, we provide the latest news – casting updates, film launches, behind-the-scenes stories, and red carpet events. Our news section ensures you’re educated, engaged, and always clued in on your favorite stars and stories.", "We are not here to bring you the news – we are bringing you the heartbeat of the film industry, all under one roof."] },
                { icon: Star, title: "Reviews, Trailers & Unbiased Views", content: ["We believe in film with a viewpoint. Our film reviews are honest, spoiler-free, and written by cinema lovers, not critics. Whether it’s that film you’ve been waiting for in theatres or that film you stumbled onto on OTT, we break it down for you, encompassing a film’s story, direction, acting, music, and reaction from a cinema perspective, to help you choose your next watch!", "Enjoy new trailers, teasers, and first-look posters as they drop, and get a feel for what to expect before you step into the cinematic world."] },
                { icon: CalendarCheck, title: "New Releases & Watching", content: ["There are so many films that come out every week it's getting impossible to keep track. But not with us! HindiPictureFilm provides an easy-to-follow calendar of upcoming Bollywood and Hindi regional film releases so you can always know what's next to drop, whether it be in theatres or streaming.", "Planning a movie night? Or just waiting for your new favourite movie to release? We've got you covered."] },
                { icon: Music2, title: "Music, Dialogues & Movie Moments", content: ["Hindi films aren’t complete without the catchy music, enthralling theatrics and the dialogues that are created and remembered by several generations. What is HindiPictureFilm without celebrating these aspects that made us love these films? For true fans of desi film, this is where you'll find lists of the best songs, the best speeches of all time, the best emotional situations, and much more."] }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-3 p-4 rounded-lg hover:bg-card/50 transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon className="w-7 h-7 text-primary mr-3 shrink-0" />
                    <h4 className="text-xl sm:text-2xl font-headline font-semibold text-primary">{item.title}</h4>
                  </div>
                  {item.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm sm:text-base text-muted-foreground leading-relaxed">{paragraph}</p>
                  ))}
                </motion.div>
              ))}
            </div>

             <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-xl shadow-lg p-6 sm:p-8 md:p-12 text-center"
            >
                <div className="flex items-center justify-center mb-5">
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-primary mr-2" />
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold">
                         <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                            Made for Hindi Movie Lovers
                         </span>
                    </h3>
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-accent ml-2" />
                </div>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-3">
                    We understand that you love Bollywood; HindiPictureFilm was made for you. HindiPictureFilm is truly mobile-friendly, clean, fast, and easy to navigate. So whether you are using your phone or laptop, you can access everything from news to reviews in a few taps.
                </p>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                    No need to search a hundred different spaces on the web — every single thing you need is right at your fingertips with HindiPictureFilm.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-10 md:gap-y-12">
               {[
                { icon: Users, title: "Become Part of the Community", content: ["The movie experience connects individuals, and so does HindiPictureFilm. Become part of a community of Bollywood lovers; comment, discuss and share your favourite moments in film. Whether it's arguing over the best SRK film or cheering on another indie release, you will feel your voice expressed and an audience with HindiPictureFilm."] },
                { icon: VenetianMask, title: "Why Choose HindiPictureFilm?", content: ["Because you deserve a destination that respects, loves, and celebrates Hindi cinema. From the golden years of Raj Kapoor to the digital era of Ayushmann Khurrana, we chart the evolution of Indian film and keep you connected.", "At HindiPictureFilm, your love for Bollywood has a home."] }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-md p-6 space-y-3"
                >
                  <div className="flex items-center">
                    <item.icon className="w-7 h-7 text-accent mr-3 shrink-0" />
                    <h4 className="text-xl sm:text-2xl font-headline font-semibold text-accent">{item.title}</h4>
                  </div>
                   {item.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm sm:text-base text-muted-foreground leading-relaxed">{paragraph}</p>
                  ))}
                </motion.div>
              ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-8 justify-center">
                <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-3" />
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary">Frequently Asked Questions</h3>
              </div>
              <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-3">
                {[
                  { q: "Q1: Which movies are available on HindiPictureFilm?", a: "We cover all types of Bollywood and Hindi-language cinema, both mainstream and OTT releases, regional Hindi films, and much more." },
                  { q: "Q2: Do you post reviews of movies?", a: "Yes, we post regular, spoiler-free reviews with honest assessments of the acting, story, and production value." },
                  { q: "Q3: Is the website free to use?", a: "Yes! HindiPictureFilm can be viewed and explored for free by all users." },
                  { q: "Q4: Is it possible to find old/classic movies here too?", a: "Yes, we frequently post retrospectives/tributes to classic Hindi films from past decades." },
                  { q: "Q5: Is HindiPictureFilm mobile-friendly?", a: "Yes, HindiPictureFilm is entirely responsive and works equally well on phones, tablets, and desktops." }
                ].map((faq, index) => (
                  <AccordionItem key={`faq-${index}`} value={`item-${index + 1}`} className="border-border/30 bg-card shadow-md rounded-lg data-[state=open]:shadow-lg">
                    <AccordionTrigger className="text-left font-semibold text-md sm:text-lg p-4 sm:p-5 hover:no-underline data-[state=open]:text-primary data-[state=open]:bg-primary/5 transition-colors rounded-t-lg data-[state=closed]:rounded-lg">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 sm:p-5 text-sm sm:text-base text-muted-foreground bg-background/30 rounded-b-lg">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
