import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "JobLink transformed our hiring process. We've reduced time-to-hire by 40% and found incredible talent through the platform.",
    author: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp Inc.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    quote: "As a job seeker, the application tracking feature has been a game-changer. I can finally keep track of all my applications in one place.",
    author: "Michael Chen",
    role: "Software Engineer",
    company: "Recently hired at CloudSystems",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    quote: "The analytics dashboard gives us valuable insights into our recruitment efforts. We can now make data-driven decisions about our hiring strategy.",
    author: "Jessica Miller",
    role: "Talent Acquisition Manager",
    company: "Global Finance Group",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role, company, image }) => {
  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-card flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 text-primary-500">
        <Quote size={36} />
      </div>
      <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={author}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what job seekers and employers are saying about JobLink.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;