import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase as BriefcaseBusiness, FilePlus, FileSearch, ListTodo, Users } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <FileSearch size={28} />,
      title: 'Smart Job Matching',
      description: 'Our AI-powered system matches candidates with the most relevant job opportunities based on skills and experience.',
    },
    {
      icon: <ListTodo size={28} />,
      title: 'Application Tracking',
      description: 'Keep track of all your job applications in one place with status updates and reminders.',
    },
    {
      icon: <BriefcaseBusiness size={28} />,
      title: 'Company Profiles',
      description: 'Create comprehensive company profiles to showcase your brand and attract top talent.',
    },
    {
      icon: <FilePlus size={28} />,
      title: 'Easy Job Posting',
      description: 'Post jobs to multiple platforms with just a few clicks and reach a wider audience.',
    },
    {
      icon: <Users size={28} />,
      title: 'Candidate Management',
      description: 'Organize candidates with a visual Kanban board to streamline your hiring process.',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Insightful Analytics',
      description: 'Gain valuable insights into your job search or recruitment efforts with detailed analytics.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Features Designed for Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools for both job seekers and employers to streamline the entire hiring process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;