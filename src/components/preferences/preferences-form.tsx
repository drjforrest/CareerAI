"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { WRITING_TONES, CV_FORMATS, DEFAULT_WRITING_TONE, DEFAULT_CV_FORMAT, DEFAULT_LANGUAGE } from "@/lib/constants";
import type { WritingTone, CvFormat, UserPreferences } from "@/types";

// Mock function to simulate fetching user preferences
const fetchUserPreferences = async (): Promise<Partial<UserPreferences>> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  // Try to get from localStorage first for persistence in demo
  const storedPrefs = localStorage.getItem("userPreferences");
  if (storedPrefs) {
    return JSON.parse(storedPrefs);
  }
  return {
    writingTone: DEFAULT_WRITING_TONE,
    language: DEFAULT_LANGUAGE,
    cvFormat: DEFAULT_CV_FORMAT,
  };
};

// Mock function to simulate saving user preferences
const saveUserPreferences = async (data: UserPreferencesFormValues): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  localStorage.setItem("userPreferences", JSON.stringify(data)); // Persist in demo
  console.log("Saved preferences:", data);
};


const preferencesSchema = z.object({
  writingTone: z.custom<WritingTone>((val) => WRITING_TONES.includes(val as WritingTone)),
  language: z.string().min(2, { message: "Language code must be at least 2 characters." }),
  cvFormat: z.custom<CvFormat>((val) => CV_FORMATS.includes(val as CvFormat)),
  // Add other preferences here if needed, e.g., name, email for profile section
  name: z.string().min(2, "Name is required.").optional(),
  email: z.string().email("Invalid email.").optional(),
});

type UserPreferencesFormValues = z.infer<typeof preferencesSchema>;

export default function PreferencesForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const form = useForm<UserPreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      writingTone: DEFAULT_WRITING_TONE,
      language: DEFAULT_LANGUAGE,
      cvFormat: DEFAULT_CV_FORMAT,
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const loadPreferences = async () => {
      setIsFetching(true);
      try {
        const prefs = await fetchUserPreferences();
        form.reset({
          writingTone: prefs.writingTone || DEFAULT_WRITING_TONE,
          language: prefs.language || DEFAULT_LANGUAGE,
          cvFormat: prefs.cvFormat || DEFAULT_CV_FORMAT,
          name: prefs.name || "", // Assuming 'name' is part of fetched UserPreferences
          email: prefs.email || "", // Assuming 'email' is part of fetched UserPreferences
        });
      } catch (error) {
        toast({ title: "Error loading preferences", variant: "destructive" });
      } finally {
        setIsFetching(false);
      }
    };
    loadPreferences();
  }, [form]);


  const onSubmit = async (data: UserPreferencesFormValues) => {
    setIsLoading(true);
    try {
      await saveUserPreferences(data);
      toast({
        title: "Preferences Saved!",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Saving Preferences",
        description: "Could not save your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading preferences...</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} className="shadow-sm"/>
              </FormControl>
              <FormDescription>This name will be used in your documents.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} className="shadow-sm" />
              </FormControl>
              <FormDescription>Your primary contact email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="writingTone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Writing Tone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="shadow-sm">
                    <SelectValue placeholder="Select a default writing tone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {WRITING_TONES.map((tone) => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>This will be your default tone for new documents.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Language</FormLabel>
              <FormControl>
                 {/* For a real app, use a Select with common language codes */}
                <Input placeholder="e.g., en-US, fr-FR" {...field} className="shadow-sm"/>
              </FormControl>
              <FormDescription>Language for generated documents and UI (future).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cvFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default CV Format</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="shadow-sm">
                    <SelectValue placeholder="Select a default CV format" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CV_FORMATS.map((format) => (
                    <SelectItem key={format} value={format}>{format}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose your preferred CV layout style.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="text-base py-3 px-6 shadow-md hover:shadow-lg transition-shadow" disabled={isLoading || isFetching}>
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Save className="mr-2 h-5 w-5" />
          )}
          Save Preferences
        </Button>
      </form>
    </Form>
  );
}
