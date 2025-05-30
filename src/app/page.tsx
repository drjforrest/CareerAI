import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Bot, Briefcase } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      <section className="py-16 w-full">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2 max-w-[800px]">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Welcome to CareerAI
              </h1>
              <p className="text-xl text-muted-foreground">
                Your desktop assistant for CV and cover letter improvement
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader>
                  <FileText className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Generate Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  Create professional CVs and cover letters tailored to your target roles
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Bot className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>AI Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  Get instant AI-powered suggestions to improve your applications
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Briefcase className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Track Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  Keep your job applications organized and up-to-date
                </CardContent>
              </Card>
            </div>

            <Button asChild size="lg" className="mt-8 shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/documents">Start Creating</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};