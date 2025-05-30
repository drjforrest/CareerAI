// src/ai/flows/get-cv-cover-letter-improvements.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered suggestions on how to improve a CV and cover letter.
 *
 * - getCvCoverLetterImprovements - A function that takes a CV and cover letter and returns improvement suggestions.
 * - GetCvCoverLetterImprovementsInput - The input type for the getCvCoverLetterImprovements function.
 * - GetCvCoverLetterImprovementsOutput - The return type for the getCvCoverLetterImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

export async function getCvCoverLetterImprovements(input: GetCvCoverLetterImprovementsInput): Promise<GetCvCoverLetterImprovementsOutput> {
  return getCvCoverLetterImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getCvCoverLetterImprovementsPrompt',
  input: {schema: GetCvCoverLetterImprovementsInputSchema},
  output: {schema: GetCvCoverLetterImprovementsOutputSchema},
  prompt: `You are an AI assistant that specializes in providing suggestions for improving CVs and cover letters based on a job description and user preferences.

  Provide specific and actionable suggestions for improving both the CV and cover letter.

  Consider the job description and user preferences when generating suggestions.

  Job Description: {{{jobDescription}}}
  User Preferences: {{{userPreferences}}}

  CV:
  {{#if cv}}
  {{{cv}}}
  {{else}}
  N/A
  {{/if}}

  Cover Letter:
  {{#if coverLetter}}
  {{{coverLetter}}}
  {{else}}
  N/A
  {{/if}}
  `,
});

const getCvCoverLetterImprovementsFlow = ai.defineFlow(
  {
    name: 'getCvCoverLetterImprovementsFlow',
    inputSchema: GetCvCoverLetterImprovementsInputSchema,
    outputSchema: GetCvCoverLetterImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
