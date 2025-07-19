import React, { useRef, useState } from "react";
import axios from "axios";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { Paperclip } from "lucide-react";

interface UploadButtonProps {
  onUpload?: (url: string) => void;
}

export const PdfUploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const API_DOMAIN = process.env.API_DOMAIN || "http://localhost:3000";

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);

      const res = await axios.post(`${API_DOMAIN}/api/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onUpload) onUpload(res.data.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload PDF.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <TooltipIconButton
        tooltip={uploading ? "Uploading..." : "Upload PDF"}
        variant="default"
        className="my-2.5 mr-1.5 size-8 p-2 transition-opacity ease-in"
        onClick={handleClick}
        disabled={uploading}
      >
        <Paperclip className={uploading ? "animate-pulse" : ""} />
      </TooltipIconButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
