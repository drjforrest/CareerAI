
'use server';
/**
 * @fileOverview A CV and cover letter generation AI agent.
 *
 * - generateCvAndCoverLetter - A function that handles the generation process.
 * - CvAndCoverLetterInput - The input type for the generateCvAndCoverLetter function.
 * - CvAndCoverLetterOutput - The return type for the generateCvAndCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CvAndCoverLetterInputSchema = z.object({
  jobPosting: z.string().describe('The job posting content.'),
  userPreferences: z
    .string()
    .optional()
    .describe('The user preferences for writing tone and CV format. This can also include desired sections or specific formatting instructions (e.g., "use bullet points for responsibilities", "include a summary section") to make the output resemble a particular style.'),
});
export type CvAndCoverLetterInput = z.infer<typeof CvAndCoverLetterInputSchema>;

const CvAndCoverLetterOutputSchema = z.object({
  cv: z.string().describe('The generated CV content, formatted with clear sections, Markdown-style headings (e.g., "## Experience"), and bullet points (e.g., "- Managed projects") for readability, resembling a professional CV document structure.'),
  coverLetter: z.string().describe('The generated cover letter content, following a professional letter format and maintaining the specified writing tone.'),
});
export type CvAndCoverLetterOutput = z.infer<typeof CvAndCoverLetterOutputSchema>;

export async function generateCvAndCoverLetter(input: CvAndCoverLetterInput): Promise<CvAndCoverLetterOutput> {
  return generateCvAndCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cvAndCoverLetterPrompt',
  input: {schema: CvAndCoverLetterInputSchema},
  output: {schema: CvAndCoverLetterOutputSchema},
  prompt: `You are an expert AI assistant specialized in crafting professional CVs and cover letters.
Your goal is to generate documents that are not only tailored to the job posting but also well-structured and visually clear in their textual representation, similar to a professionally designed CV.

Job Posting:
{{{jobPosting}}}

User Preferences for Style and Format:
{{{userPreferences}}}

Instructions:
1.  **Analyze the Job Posting:** Identify key skills, experiences, and qualifications required.
2.  **Consider User Preferences:** Adhere to the specified writing tone (e.g., Formal, Dynamic) and CV format (e.g., Chronological, Functional). If the user provides specific formatting instructions or mentions a desired visual style, try to incorporate that into the textual structure.
3.  **Generate CV Content:**
    *   Structure the CV with clear, common sections (e.g., Contact Information, Summary/Objective, Work Experience, Education, Skills, Projects if applicable).
    *   Use Markdown-style headings for sections (e.g., \`## Work Experience\`, \`### Job Title\`).
    *   Use bullet points (e.g., \`- \` or \`* \`) for lists of responsibilities, achievements, or skills. Make each bullet point concise and impactful.
    *   Ensure the content is directly relevant to the job posting.
    *   Pay attention to professional layout and spacing in your textual output to mimic a well-formatted document. For example, use line breaks appropriately between sections and entries.
4.  **Generate Cover Letter Content:**
    *   Follow a standard professional letter format (Your Contact Information, Date, Employer Contact Information, Salutation, Introduction, Body Paragraphs detailing suitability, Conclusion, Closing, Your Typed Name).
    *   Tailor the content to the specific job, highlighting how the candidate's skills and experience match the requirements outlined in the job posting.
    *   Maintain the user-specified writing tone throughout the letter.

Produce the CV and Cover Letter as text, formatted for clarity and professional presentation, ready to be copied into a document editor.
`,
});

const generateCvAndCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCvAndCoverLetterFlow',
    inputSchema: CvAndCoverLetterInputSchema,
    outputSchema: CvAndCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output || !output.cv || !output.coverLetter) {
      // Fallback or throw error if crucial parts are missing
      console.error('AI generation failed or produced incomplete output:', output);
      throw new Error('AI failed to generate complete CV and Cover Letter output. Please try again or refine your input.');
    }
    return output;
  }
);

