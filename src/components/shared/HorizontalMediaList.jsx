
"use client";

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export default function HorizontalMediaList({ items, CardComponent, title }) {
  if (!items || items.length === 0) {
    return null; // Or a placeholder message
  }

  return (
    <motion.section 
      className="py-6 md:py-8" // Adjusted padding
      aria-labelledby={title ? title.toLowerCase().replace(/\s+/g, '-') + "-title" : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {title && (
        <motion.h2 
          id={title.toLowerCase().replace(/\s+/g, '-') + "-title"} 
          className="text-xl sm:text-2xl md:text-3xl font-headline font-bold text-foreground mb-4 md:mb-6" // Responsive title
          variants={itemVariants}
        >
          {title}
        </motion.h2>
      )}
      <div className="relative">
        <motion.div 
          className="flex space-x-3 sm:space-x-4 md:space-x-6 overflow-x-auto pb-4 md:pb-6 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent" // px removed, handled by parent
          drag="x"
          dragConstraints={{ left: - (items.length * 200), right: 0 }} // Approximate constraint, adjust based on item width
          variants={itemVariants} 
        >
          {items.map((item, index) => (
            <motion.div 
              key={item.id || index} 
              variants={itemVariants} 
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]" // Fluid item widths
            >
              <CardComponent {...(CardComponent.name === 'TVShowCard' ? { show: item } : { movie: item })} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
