import type { ApplicationStatus, WritingTone, CvFormat } from "@/types";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "Draft",
  "Sent",
  "Pending",
  "Follow-up",
  "Interview",
  "Offer",
  "Rejected",
  "Archived",
];

export const WRITING_TONES: WritingTone[] = [
  "Formal",
  "Friendly",
  "Dynamic",
  "Concise",
  "Academic",
];

export const CV_FORMATS: CvFormat[] = [
  "Chronological",
  "Functional",
  "Combination",
];

export const DEFAULT_LANGUAGE = "en-US";
export const DEFAULT_WRITING_TONE: WritingTone = "Formal";
export const DEFAULT_CV_FORMAT: CvFormat = "Chronological";
