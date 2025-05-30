// src/ai/flows/get-cv-cover-letter-improvements.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered suggestions on how to improve a CV and cover letter.
 *
 * - getCvCoverLetterImprovements - A function that takes a CV and cover letter and returns improvement suggestions.
 * - GetCvCoverLetterImprovementsInput - The input type for the getCvCoverLetterImprovements function.
 * - GetCvCoverLetterImprovementsOutput - The return type for the getCvCoverLetterImprovements function.
 */

import {z} from 'genkit';
import {ai} from '../genkit';

const GetCvCoverLetterImprovementsInputSchema = z.object({
  cv: z.string().describe('The content of the CV to be improved.'),
  coverLetter: z.string().describe('The content of the cover letter to be improved.'),
  jobDescription: z.string().describe('The job description the CV and cover letter are targeting.'),
  userPreferences: z.string().optional().describe('Optional user preferences such as writing tone or style.'),
});
export type GetCvCoverLetterImprovementsInput = z.infer<typeof GetCvCoverLetterImprovementsInputSchema>;

const GetCvCoverLetterImprovementsOutputSchema = z.object({
  cvImprovements: z.string().describe('AI-powered suggestions for improving the CV.'),
  coverLetterImprovements: z.string().describe('AI-powered suggestions for improving the cover letter.'),
});
export type GetCvCoverLetterImprovementsOutput = z.infer<typeof GetCvCoverLetterImprovementsOutputSchema>;

export const getCvCoverLetterImprovements = ai.defineFlow(
  {
    name: 'getCvCoverLetterImprovements',
    inputSchema: GetCvCoverLetterImprovementsInputSchema,
    outputSchema: GetCvCoverLetterImprovementsOutputSchema,
  },
  async (input: GetCvCoverLetterImprovementsInput): Promise<GetCvCoverLetterImprovementsOutput> => {
    const { text } = await ai.generate(`Analyze and provide improvements for the following CV and cover letter:

CV:
${input.cv}

Cover Letter:
${input.coverLetter}

Job Description:
${input.jobDescription}

Preferences:
${input.userPreferences || 'None provided'}

Provide your suggestions in a clear, organized format with separate sections for CV and cover letter improvements.

For the CV:
- Ensure it highlights relevant skills and experience
- Suggest improvements to formatting and structure
- Identify any missing key information
- Recommend ways to better align with the job requirements

For the cover letter:
- Check if it effectively addresses the key requirements
- Suggest improvements to the tone and style
- Identify areas that could be more compelling
- Recommend ways to better showcase qualifications`);

    if (!text) {
      throw new Error('Failed to generate improvements');
    }

    const [cvImprovements, coverLetterImprovements] = text.split('\n\n');

    return {
      cvImprovements,
      coverLetterImprovements,
    };
  }
);
