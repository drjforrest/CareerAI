export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  preferredLanguage?: string;
  defaultWritingTone?: WritingTone;
  // applicationHistory will be a list of Application Ids or objects.
}

export type ApplicationStatus = "Draft" | "Sent" | "Pending" | "Follow-up" | "Interview" | "Offer" | "Rejected" | "Archived";

export interface Application {
  id: string;
  userId: string;
  jobTitle: string;
  company: string;
  submissionDate: Date;
  status: ApplicationStatus;
  feedback?: string;
  jobLink?: string;
  notes?: string;
  cvDocumentId?: string;
  coverLetterDocumentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DocumentType = "CV" | "CoverLetter";
export type WritingTone = "Formal" | "Friendly" | "Dynamic" | "Concise" | "Academic";
export type CvFormat = "Chronological" | "Functional" | "Combination"; // Example CV formats

export interface Document {
  id: string;
  userId: string;
  applicationId?: string; // Optional if document is not tied to a specific application initially
  type: DocumentType;
  generatedContent: string; // The actual text content
  // For Supabase Storage:
  // storagePath?: string; // Path to the file in Supabase Storage if stored as file
  createdAt: Date;
  updatedAt: Date;
  version?: number;
}

export interface UserPreferences {
  userId: string;
  writingTone: WritingTone;
  language: string; // e.g., "en-US", "fr-FR"
  cvFormat: CvFormat;
  // Other preferences like default sections to include, preferred font (if we go that deep)
}

export interface CvAndCoverLetterGenerationResult {
  cv: string;
  coverLetter: string;
}

export interface CvCoverLetterImprovementsResult {
  cvImprovements: string;
  coverLetterImprovements: string;
}
