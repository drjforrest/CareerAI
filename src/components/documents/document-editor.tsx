"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Copy, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { DocumentType } from "@/types";

interface DocumentEditorProps {
  initialContent: string;
  documentType: DocumentType;
  onSave?: (content: string) => Promise<void>; // For saving to Supabase Storage
}

export default function DocumentEditor({ initialContent, documentType, onSave }: DocumentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast({ title: `${documentType} copied to clipboard!` });
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        toast({ title: "Failed to copy content", variant: "destructive" });
      });
  };

  const handleDownload = (format: "txt" | "docx" | "pdf") => {
    // Basic TXT download
    if (format === "txt") {
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${documentType.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      toast({ title: `${documentType} downloaded as .txt` });
    } else {
      // Placeholder for DOCX/PDF - would require server-side generation or a library
      toast({ title: `${format.toUpperCase()} download not implemented yet.`, description: "TXT download is available." });
    }
  };

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      try {
        await onSave(content);
        toast({ title: `${documentType} saved successfully (mock).` });
      } catch (error) {
        toast({ title: `Failed to save ${documentType}.`, variant: "destructive" });
      } finally {
        setIsSaving(false);
      }
    } else {
      toast({ title: "Save functionality not configured for this editor." });
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[300px] lg:min-h-[400px] shadow-inner bg-background p-4 rounded-md border focus:ring-2 focus:ring-primary"
        aria-label={`Edit ${documentType}`}
      />
      <div className="flex flex-wrap gap-2 justify-end">
        {onSave && (
          <Button onClick={handleSave} disabled={isSaving} variant="outline" className="shadow-sm">
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Online"}
          </Button>
        )}
        <Button onClick={handleCopy} variant="outline" className="shadow-sm">
          <Copy className="mr-2 h-4 w-4" /> Copy Text
        </Button>
        <Button onClick={() => handleDownload("txt")} variant="default" className="shadow-sm">
          <Download className="mr-2 h-4 w-4" /> Download .txt
        </Button>
        {/* Placeholder for other download formats */}
        <Button onClick={() => handleDownload("docx")} variant="outline" className="shadow-sm" disabled>
           Download .docx
        </Button>
        <Button onClick={() => handleDownload("pdf")} variant="outline" className="shadow-sm" disabled>
           Download .pdf
        </Button>
      </div>
    </div>
  );
}
