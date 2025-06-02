import { Job, Application, ApplicationStatus, CandidateProfile, Company, HRAnalytics, CandidateAnalytics } from '../types';

// Sample Jobs
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'We are looking for a Frontend Developer proficient in React.js...',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$100,000 - $130,000',
    platforms: ['LinkedIn', 'Indeed'],
    department: 'Engineering',
    status: 'active',
    expectedApplications: 50,
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-01'),
  },
  {
    id: '2',
    title: 'UX Designer',
    description: 'Looking for a talented UX Designer to join our creative team...',
    company: 'DesignHub',
    location: 'Remote',
    salary: '$90,000 - $120,000',
    platforms: ['LinkedIn', 'Naukri'],
    department: 'Design',
    status: 'active',
    expectedApplications: 30,
    createdAt: new Date('2024-05-02'),
    updatedAt: new Date('2024-05-02'),
  },
  {
    id: '3',
    title: 'Product Manager',
    description: 'Experienced Product Manager needed to lead our product strategy...',
    company: 'ProductVision',
    location: 'New York, NY',
    salary: '$120,000 - $150,000',
    platforms: ['LinkedIn', 'Indeed', 'Naukri'],
    department: 'Product',
    status: 'active',
    expectedApplications: 40,
    createdAt: new Date('2024-05-03'),
    updatedAt: new Date('2024-05-03'),
  },
];

// Sample Applications
export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    candidateId: '1',
    status: 'applied',
    appliedDate: new Date('2024-05-10'),
    lastUpdated: new Date('2024-05-10'),
    notes: ['Promising candidate with relevant experience'],
  },
  {
    id: '2',
    jobId: '1',
    candidateId: '2',
    status: 'screened',
    appliedDate: new Date('2024-05-11'),
    lastUpdated: new Date('2024-05-15'),
    notes: ['Passed initial screening, schedule interview'],
  },
  {
    id: '3',
    jobId: '2',
    candidateId: '1',
    status: 'interviewed',
    appliedDate: new Date('2024-05-12'),
    lastUpdated: new Date('2024-05-18'),
    notes: ['Great interview, team liked the candidate'],
  },
  {
    id: '4',
    jobId: '3',
    candidateId: '3',
    status: 'offer',
    appliedDate: new Date('2024-05-13'),
    lastUpdated: new Date('2024-05-22'),
    notes: ['Offer sent, waiting for response'],
  },
  {
    id: '5',
    jobId: '3',
    candidateId: '4',
    status: 'joined',
    appliedDate: new Date('2024-05-05'),
    lastUpdated: new Date('2024-05-25'),
    notes: ['Started on May 25th'],
  },
];

// Sample Companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    logoUrl: 'https://via.placeholder.com/150',
    industry: 'Technology',
    departments: ['Engineering', 'Product', 'Marketing'],
    contactEmail: 'hr@techcorp.com',
    contactPhone: '123-456-7890',
    userId: 'hr1',
  },
];

// Sample Candidate Profiles
export const mockCandidateProfiles: CandidateProfile[] = [
  {
    id: '1',
    userId: 'candidate1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    education: [
      {
        id: '1',
        institution: 'University of Technology',
        degree: 'Bachelor',
        field: 'Computer Science',
        startDate: new Date('2018-09-01'),
        endDate: new Date('2022-05-01'),
        current: false,
      },
    ],
    experience: [
      {
        id: '1',
        company: 'WebDev LLC',
        position: 'Junior Developer',
        description: 'Worked on frontend web applications using React.js',
        startDate: new Date('2022-06-01'),
        current: true,
      },
    ],
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-01'),
  },
];

// Sample HR Analytics
export const mockHRAnalytics: HRAnalytics = {
  totalJobs: 3,
  activeJobs: 3,
  totalApplications: 5,
  applicationsByStatus: {
    applied: 1,
    screened: 1,
    interviewed: 1,
    offer: 1,
    joined: 1,
    rejected: 0,
  },
  applicationsByDepartment: {
    Engineering: 2,
    Design: 1,
    Product: 2,
  },
  applicationsByPlatform: {
    LinkedIn: 3,
    Indeed: 2,
    Naukri: 1,
  },
};

// Sample Candidate Analytics
export const mockCandidateAnalytics: CandidateAnalytics = {
  totalApplications: 2,
  applicationsByStatus: {
    applied: 1,
    screened: 0,
    interviewed: 1,
    offer: 0,
    joined: 0,
    rejected: 0,
  },
  dailyGoal: 3,
  weeklyGoal: 15,
  currentStreak: 2,
};

export const getApplicationsByStatus = (): Record<ApplicationStatus, Application[]> => {
  const result: Record<ApplicationStatus, Application[]> = {
    applied: [],
    screened: [],
    interviewed: [],
    offer: [],
    joined: [],
    rejected: [],
  };

  mockApplications.forEach(app => {
    result[app.status].push(app);
  });

  return result;
};