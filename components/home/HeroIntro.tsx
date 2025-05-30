"use client"; // Add this directive for client-side interactivity

import { Chip } from "@nextui-org/react";
import { CheckCircle, Zap, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroIntro() {
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

  const chipsData = [
    { text: "100% Free", icon: <CheckCircle className="h-5 w-5 text-sky-300" /> },
    { text: "Instant Generation", icon: <Zap className="h-5 w-5 text-sky-300" /> },
    { text: "Privacy Protected", icon: <Shield className="h-5 w-5 text-sky-300" /> },
    { text: "Real Gmail", icon: <Globe className="h-5 w-5 text-sky-300" /> },
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
            Free <span className="text-sky-300">Temporary Gmail Account</span>
            <br className="md:hidden" /> with Inbox
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-purple-100 dark:text-purple-200 mb-10 leading-relaxed"
            variants={itemVariants}
          >
            Generate temporary Gmail accounts with full inbox access instantly. Perfect for testing, registrations, and
            privacy protection. No sign-up required - completely free temp Gmail account generator.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-8"
            variants={containerVariants}
          >
            {chipsData.map((chip) => (
              <motion.div key={chip.text} variants={chipItemVariants}>
                <Chip 
                  variant="bordered" 
                  className="border-purple-300 text-purple-100 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  startContent={chip.icon}
                >
                  {chip.text}
                </Chip>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* The interactive EmailClient component will be placed after this by the main page */}
      </motion.section>
    </div>
  );
}
