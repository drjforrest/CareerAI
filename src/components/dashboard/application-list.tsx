"use client";

import type { Application, ApplicationStatus } from "@/types";
import { APPLICATION_STATUSES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Edit2, Trash2, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { format } from "date-fns";

// Mock Data
const mockApplications: Application[] = [
  {
    id: "1",
    userId: "user1",
    jobTitle: "Software Engineer",
    company: "Google",
    submissionDate: new Date("2024-07-15"),
    status: "Pending",
    jobLink: "https://careers.google.com/jobs/results/12345/",
    notes: "Followed up on 2024-07-20. Recruiter: Jane Doe.",
    createdAt: new Date("2024-07-15"),
    updatedAt: new Date("2024-07-20"),
  },
  {
    id: "2",
    userId: "user1",
    jobTitle: "Product Manager",
    company: "Meta",
    submissionDate: new Date("2024-07-10"),
    status: "Interview",
    feedback: "First round interview went well. Technical round next week.",
    jobLink: "https://www.metacareers.com/jobs/abcde/",
    createdAt: new Date("2024-07-10"),
    updatedAt: new Date("2024-07-18"),
  },
  {
    id: "3",
    userId: "user1",
    jobTitle: "UX Designer",
    company: "Apple",
    submissionDate: new Date("2024-06-20"),
    status: "Sent",
    createdAt: new Date("2024-06-20"),
    updatedAt: new Date("2024-06-20"),
  },
    {
    id: "4",
    userId: "user1",
    jobTitle: "Data Scientist",
    company: "Netflix",
    submissionDate: new Date("2024-07-01"),
    status: "Rejected",
    feedback: "Overqualified for the junior role.",
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2024-07-05"),
  },
];


const getStatusBadgeVariant = (status: ApplicationStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Interview":
    case "Offer":
      return "default"; // Primary color (often green-ish with custom theme for success)
    case "Pending":
    case "Follow-up":
      return "secondary"; // Muted/secondary color
    case "Rejected":
      return "destructive";
    case "Sent":
    case "Draft":
    case "Archived":
    default:
      return "outline";
  }
};


export default function ApplicationList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setApplications(mockApplications);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(prevApps =>
      prevApps.map(app => (app.id === appId ? { ...app, status: newStatus, updatedAt: new Date() } : app))
    );
    // Here you would typically call an API to update the status in the database
  };
  
  const handleDelete = (appId: string) => {
    setApplications(prevApps => prevApps.filter(app => app.id !== appId));
    // API call to delete
  };


  if (isLoading) {
    return <p className="text-muted-foreground text-center p-8">Loading applications...</p>;
  }

  if (applications.length === 0) {
    return <p className="text-muted-foreground text-center p-8">No applications found. Add your first one!</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="hidden md:table-cell">Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.jobTitle}</TableCell>
              <TableCell>{app.company}</TableCell>
              <TableCell className="hidden md:table-cell">{format(app.submissionDate, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(app.status)} className="capitalize shadow-sm">
                  {app.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{format(app.updatedAt, "MMM dd, yyyy - HH:mm")}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => console.log("View/Edit", app.id)}>
                      <Eye className="mr-2 h-4 w-4" /> View/Edit Details
                    </DropdownMenuItem>
                     {app.jobLink && (
                      <DropdownMenuItem asChild>
                        <Link href={app.jobLink} target="_blank" rel="noopener noreferrer">
                           <ExternalLink className="mr-2 h-4 w-4" /> View Job Posting
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    {APPLICATION_STATUSES.map(status => (
                        <DropdownMenuItem key={status} onClick={() => handleStatusChange(app.id, status)} disabled={app.status === status}>
                            {status}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(app.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
