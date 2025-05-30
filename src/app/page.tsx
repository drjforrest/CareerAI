import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Bot, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <section className="py-16 md:py-24 lg:py-32 w-full">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 text-left">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Craft Your Future with CareerCraft AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Let CareerCraft AI be your personal assistant for creating CVs, tracking applications, and getting AI feedback to help you land your dream job.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  <Link href="/auth/signup">Start Crafting Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  <Link href="/documents">Try Generator</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="AI powered career tools"
              data-ai-hint="career technology"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 rounded-lg shadow-inner">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Your Personal Toolkit</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to succeed</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the personal tools CareerCraft AI offers to help streamline your job application process.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <FeatureCard
              icon={<Bot className="w-8 h-8 text-primary" />}
              title="AI Document Generation"
              description="Instantly create tailored CVs and cover letters from job descriptions."
            />
            <FeatureCard
              icon={<Briefcase className="w-8 h-8 text-primary" />}
              title="Application Tracking"
              description="Manage all your job applications in one place with status updates and reminders."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-primary" />}
              title="AI Feedback & Improvement"
              description="Receive actionable AI suggestions to enhance your application materials."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
