
"use client";

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSidebarStore } from '@/store/sidebarStore';
import { Button } from '@/components/ui/button';

const iconVariants = {
  opened: { rotate: 180, scale: 1 },
  closed: { rotate: 0, scale: 1 },
};

export default function HamburgerButton() {
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className="z-50 text-foreground hover:text-primary transition-colors"
    >
      <motion.div
        key={isOpen ? 'x' : 'menu'}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: isOpen ? 90 : 0 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.div>
    </Button>
  );
}
