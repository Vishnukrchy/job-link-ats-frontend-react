import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users } from 'lucide-react';

interface RoleSelectionCardProps {
  role: 'hr' | 'candidate';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const RoleSelectionCard: React.FC<RoleSelectionCardProps> = ({
  role,
  title,
  description,
  icon,
  color,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/signup?role=${role}`);
  };

  return (
    <motion.div
      className={`cursor-pointer rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-8 bg-white border-t-4 ${color}`}
      whileHover={{ y: -5 }}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`p-4 rounded-full mb-4 ${color.replace('border-', 'bg-').replace('-600', '-100')} ${color.replace('border-', 'text-')}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button 
          className={`mt-6 px-6 py-2 rounded-full text-white font-medium ${color.replace('border', 'bg')}`}
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
};

const RoleSelection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <RoleSelectionCard
        role="hr"
        title="I'm HR / Recruiter"
        description="Post jobs, track applicants, and find the best talent for your company."
        icon={<Briefcase size={32} />}
        color="border-primary-600"
      />
      <RoleSelectionCard
        role="candidate"
        title="I'm a Candidate"
        description="Find your dream job, track applications, and boost your career."
        icon={<Users size={32} />}
        color="border-accent-600"
      />
    </div>
  );
};

export default RoleSelection;