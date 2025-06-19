
"use client";

// import { usePathname } from 'next/navigation'; // Not needed if AnimatePresence removed
// import { AnimatePresence, motion } from 'framer-motion'; // Temporarily removed

// const pageVariants = {
//   initial: {
//     opacity: 0,
//     y: 20,
//   },
//   in: {
//     opacity: 1,
//     y: 0,
//   },
//   out: {
//     opacity: 0,
//     y: -20,
//   },
// };

// const pageTransition = {
//   type: 'tween',
//   ease: 'anticipate',
//   duration: 0.5,
// };

export function ClientLayout({ children }) {
  // const pathname = usePathname(); // Not needed if AnimatePresence removed

  return (
    // <AnimatePresence>
    //   <motion.div
    //     key={pathname}
    //     initial="initial"
    //     animate="in"
    //     exit="out"
    //     variants={pageVariants}
    //     transition={pageTransition}
    //     className="flex-1 flex flex-col mt-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8" 
    //   >
    //     {children}
    //   </motion.div>
    // </AnimatePresence>
    <div className="flex-1 flex flex-col mt-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8">
      {children}
    </div>
  );
}
