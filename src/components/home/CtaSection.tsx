import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLearnMore = () => {
    // Scroll to features section or navigate to about page
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Transform Your Career or Hiring Process?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Join thousands of professionals who have already discovered the power of JobLink.
              Whether you're looking for your next career move or trying to find the perfect candidate,
              we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                onClick={handleGetStarted}
              >
                Get Started for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-primary-800"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-primary-800 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-primary-700 rounded-lg text-center">
                  <div className="text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-primary-200">Companies</div>
                </div>
                <div className="p-6 bg-primary-700 rounded-lg text-center">
                  <div className="text-4xl font-bold text-white mb-2">10k+</div>
                  <div className="text-primary-200">Job Seekers</div>
                </div>
                <div className="p-6 bg-primary-700 rounded-lg text-center">
                  <div className="text-4xl font-bold text-white mb-2">2k+</div>
                  <div className="text-primary-200">Jobs Posted</div>
                </div>
                <div className="p-6 bg-primary-700 rounded-lg text-center">
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-primary-200">Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;