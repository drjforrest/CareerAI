"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getCvCoverLetterImprovements } from "@/ai/flows/get-cv-cover-letter-improvements";
import type { GetCvCoverLetterImprovementsInput, GetCvCoverLetterImprovementsOutput } from "@/ai/flows/get-cv-cover-letter-improvements";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Loader2, Wand2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WRITING_TONES, DEFAULT_WRITING_TONE } from "@/lib/constants";
import type { WritingTone } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const feedbackSchema = z.object({
  cv: z.string().min(50, { message: "CV content must be at least 50 characters." }).optional().or(z.literal("")),
  coverLetter: z.string().min(50, { message: "Cover letter content must be at least 50 characters." }).optional().or(z.literal("")),
  jobDescription: z.string().min(50, { message: "Job description must be at least 50 characters." }),
  userPreferences: z.string().optional(), // For writing tone, style, etc.
}).refine(data => data.cv || data.coverLetter, {
  message: "Either CV or Cover Letter content must be provided.",
  path: ["cv"], // Show error on one of the fields
});


type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function AiFeedback() {
  const [isLoading, setIsLoading] = useState(false);
  const [cvImprovements, setCvImprovements] = useState<string | null>(null);
  const [coverLetterImprovements, setCoverLetterImprovements] = useState<string | null>(null);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      cv: "",
      coverLetter: "",
      jobDescription: "",
      userPreferences: `Tone: ${DEFAULT_WRITING_TONE}`,
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsLoading(true);
    setCvImprovements(null);
    setCoverLetterImprovements(null);

    const input: GetCvCoverLetterImprovementsInput = {
      cv: data.cv || "", // Ensure it's a string
      coverLetter: data.coverLetter || "", // Ensure it's a string
      jobDescription: data.jobDescription,
      userPreferences: data.userPreferences,
    };

    try {
      const result: GetCvCoverLetterImprovementsOutput = await getCvCoverLetterImprovements(input);
      // Mock result:
      // const result: GetCvCoverLetterImprovementsOutput = {
      //   cvImprovements: `CV Improvements based on job: ${data.jobDescription.substring(0,30)}... User preferences: ${data.userPreferences || 'None'}. Suggestion: Add more keywords.`,
      //   coverLetterImprovements: `Cover Letter Improvements based on job: ${data.jobDescription.substring(0,30)}... User preferences: ${data.userPreferences || 'None'}. Suggestion: Be more direct.`,
      // };

      if (result.cvImprovements || result.coverLetterImprovements) {
        setCvImprovements(result.cvImprovements);
        setCoverLetterImprovements(result.coverLetterImprovements);
        toast({
          title: "Feedback Generated!",
          description: "AI suggestions for your documents are ready.",
        });
      } else {
         throw new Error("AI did not return any improvement suggestions.");
      }
    } catch (error) {
      console.error("Error getting feedback:", error);
      toast({
        title: "Error Generating Feedback",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      // Fallback mock data for UI testing
      setCvImprovements("Error: Could not generate CV feedback. Ensure your CV content is sufficient.");
      setCoverLetterImprovements("Error: Could not generate Cover Letter feedback. Please check the job description.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Target Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the job description you are applying for..."
                    className="min-h-[150px] shadow-inner"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The AI will tailor suggestions based on this job.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cv"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Your CV Content (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your current CV content here..."
                    className="min-h-[200px] shadow-inner"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Your Cover Letter Content (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your current cover letter content here..."
                    className="min-h-[150px] shadow-inner"
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  You can provide either CV, Cover Letter, or both.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="userPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Style Preferences (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Formal tone, highlight leadership skills"
                    className="shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify preferred writing tone or style aspects.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full md:w-auto text-base py-3 px-6 shadow-md hover:shadow-lg transition-shadow" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-5 w-5" />
            )}
            Get AI Feedback
          </Button>
        </form>
      </Form>

      {(cvImprovements || coverLetterImprovements) && (
        <div className="mt-8 space-y-8">
          {cvImprovements && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-xl"><Lightbulb className="mr-2 h-6 w-6 text-yellow-500" /> CV Improvement Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md text-sm font-mono leading-relaxed">
                  {cvImprovements}
                </pre>
              </CardContent>
            </Card>
          )}
          {coverLetterImprovements && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-xl"><Lightbulb className="mr-2 h-6 w-6 text-yellow-500" /> Cover Letter Improvement Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                 <pre className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md text-sm font-mono leading-relaxed">
                  {coverLetterImprovements}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
