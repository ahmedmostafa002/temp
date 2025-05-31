"use client"; // Add this directive for client-side interactivity

import { Chip } from "@nextui-org/react";
import { CheckCircle, Zap, Shield, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSectionREG() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const chipItemVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };


  const chips = [
    { text: "100% Free", icon: <CheckCircle className="h-5 w-5 text-sky-300" /> },
    { text: "Instant Generation", icon: <Zap className="h-5 w-5 text-sky-300" /> },
    { text: "Privacy Focused", icon: <Shield className="h-5 w-5 text-sky-300" /> },
    { text: "AI-Powered", icon: <Cpu className="h-5 w-5 text-sky-300" /> },
  ];

  return (
    <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 dark:from-sky-700 dark:via-blue-700 dark:to-indigo-900 py-20 md:py-28 shadow-xl text-white overflow-hidden"> {/* Adjusted gradient to be more blue-centric */}
      <motion.section 
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Free <span className="text-sky-300">Random Email Name</span> Generator
            <br className="md:hidden" /> 
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-purple-100 dark:text-purple-200 mb-10 leading-relaxed"
            variants={itemVariants}
          >
            Instantly generate unique and creative email names with our powered tool.
            Perfect for sign-ups, testing, and protecting your privacy. Choose your preferred domain or add your custom domain name!
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-8"
            variants={containerVariants} // Use container for staggering children if needed, or just itemVariants
          >
            {chips.map((chip, index) => (
              <motion.div key={chip.text} variants={chipItemVariants}>
                <Chip 
                  variant="bordered" 
                  className="border-purple-300 text-purple-100 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors" // Added hover effect
                  startContent={chip.icon}
                >
                  {chip.text}
                </Chip>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
