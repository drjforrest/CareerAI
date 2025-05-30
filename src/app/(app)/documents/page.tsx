import DocumentGenerator from "@/components/documents/document-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AiFeedback from "@/components/feedback/ai-feedback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Bot } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Document Center</h1>
        <p className="text-muted-foreground">
          Generate, edit, and get feedback on your CVs and Cover Letters.
        </p>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="generator"><FileText className="mr-2 h-4 w-4" />Generate Documents</TabsTrigger>
          <TabsTrigger value="feedback"><Bot className="mr-2 h-4 w-4" />AI Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="generator">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>CV & Cover Letter Generator</CardTitle>
              <CardDescription>
                Paste a job posting and provide your preferences to generate personalized documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentGenerator />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="feedback">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>AI Document Feedback</CardTitle>
              <CardDescription>
                Get AI-powered suggestions to improve your existing CV and Cover Letter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AiFeedback />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Placeholder for list of existing documents */}
      <Card className="mt-8 shadow-sm">
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription>Manage your saved CVs and Cover Letters.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Document management features coming soon.</p>
          {/* Example items */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">CV - Software Engineer @ Google</p>
                <p className="text-sm text-muted-foreground">Generated: 2023-10-26</p>
              </div>
              <Button variant="outline" size="sm">View/Edit</Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">Cover Letter - Product Manager @ Meta</p>
                <p className="text-sm text-muted-foreground">Generated: 2023-10-24</p>
              </div>
              <Button variant="outline" size="sm">View/Edit</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
