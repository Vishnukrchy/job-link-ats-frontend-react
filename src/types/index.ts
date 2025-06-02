// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'hr' | 'candidate';
  createdAt: Date;
}

// HR/Company Types
export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  industry: string;
  departments: string[];
  contactEmail: string;
  contactPhone?: string;
  userId: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: string;
  platforms: string[];
  department: string;
  status: 'active' | 'paused' | 'closed';
  expectedApplications: number;
  createdAt: Date;
  updatedAt: Date;
}

// Candidate Types
export interface CandidateProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
}

// Application Types
export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  appliedDate: Date;
  lastUpdated: Date;
  notes?: string[];
  feedbackLog?: FeedbackLog[];
}

export type ApplicationStatus = 'applied' | 'screened' | 'interviewed' | 'offer' | 'joined' | 'rejected';

export interface FeedbackLog {
  id: string;
  date: Date;
  status: ApplicationStatus;
  notes?: string;
}

// Dashboard Analytics Types
export interface HRAnalytics {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  applicationsByStatus: Record<ApplicationStatus, number>;
  applicationsByDepartment: Record<string, number>;
  applicationsByPlatform: Record<string, number>;
}

export interface CandidateAnalytics {
  totalApplications: number;
  applicationsByStatus: Record<ApplicationStatus, number>;
  dailyGoal: number;
  weeklyGoal: number;
  currentStreak: number;
}