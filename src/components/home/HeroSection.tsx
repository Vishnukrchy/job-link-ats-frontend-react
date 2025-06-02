import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const HeroSection: React.FC = () => {
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
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Connect, Apply, <span className="text-primary-600">Succeed</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            The modern platform that connects job seekers with employers. 
            Streamline your job search or recruitment process today.
          </motion.p>
          
          <motion.div
            className="max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden">
              <div className="flex-grow">
                <Input
                  placeholder="Job title, skills, or company"
                  fullWidth
                  className="border-0 h-14 rounded-none"
                  leftIcon={<Search className="h-5 w-5" />}
                />
              </div>
              <Button
                className="h-14 px-8 rounded-none"
                variant="primary"
              >
                Find Jobs
              </Button>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-600">
              <span>Popular:</span>
              <a href="#" className="hover:text-primary-600 hover:underline">Software Engineer</a>
              <span>•</span>
              <a href="#" className="hover:text-primary-600 hover:underline">Marketing</a>
              <span>•</span>
              <a href="#" className="hover:text-primary-600 hover:underline">Product Manager</a>
              <span>•</span>
              <a href="#" className="hover:text-primary-600 hover:underline">UI/UX Designer</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;