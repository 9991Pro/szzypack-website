"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
];

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  industry: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters"),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const incoming = Array.from(newFiles);
      const valid = incoming.filter((f) => {
        if (f.size > MAX_FILE_SIZE) return false;
        if (!ACCEPTED_FILE_TYPES.includes(f.type)) return false;
        return true;
      });
      setFiles((prev) => [...prev, ...valid].slice(0, 5));
    },
    []
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      let uploadedUrls: string[] = [];

      if (files.length > 0) {
        for (const file of files) {
          const signRes = await fetch("/api/upload/sign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              contentType: file.type,
            }),
          });

          if (!signRes.ok) throw new Error("Failed to get upload URL");

          const { uploadUrl, fileUrl } = await signRes.json();

          const uploadRes = await fetch(uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
          });

          if (!uploadRes.ok) throw new Error("Failed to upload file");
          uploadedUrls.push(fileUrl);
        }
      }

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fileUrls: uploadedUrls }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setStatus("success");
      reset();
      setFiles([]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-dark-900">Thank You!</h1>
          <p className="mt-3 text-gray-500">
            Your inquiry has been received. Our team will review your requirements and get back to you
            within 24 hours.
          </p>
          <Button asChild className="mt-6">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">Get in Touch</h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Tell us about your packaging project. We'll respond with a detailed quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Honeypot */}
            <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

            {/* Contact info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  id="company"
                  {...register("company")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  {...register("phone")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  {...register("industry")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  <option value="coffee">Coffee</option>
                  <option value="pet-food">Pet Food</option>
                  <option value="food-snacks">Food & Snacks</option>
                  <option value="supplements">Supplements</option>
                  <option value="beverages">Beverages</option>
                  <option value="chemicals">Chemicals & Industrial</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Interest
                </label>
                <select
                  id="productInterest"
                  {...register("productInterest")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select product</option>
                  <option value="stand-up-pouches">Stand Up Pouches</option>
                  <option value="flat-bottom-bags">Flat Bottom Bags</option>
                  <option value="roll-film">Roll Film</option>
                  <option value="spout-pouches">Spout Pouches</option>
                  <option value="side-gusset-bags">Side Gusset Bags</option>
                  <option value="custom-shapes">Custom Shapes</option>
                  <option value="not-sure">Not Sure Yet</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Quantity
              </label>
              <input
                id="quantity"
                {...register("quantity")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. 5,000 pieces"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe your project — dimensions, material preferences, printing requirements, etc."
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
            </div>

            {/* File upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachments (optional — max 5 files, 10MB each)
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                  dragOver
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop files here, or{" "}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary-600 hover:underline font-medium"
                  >
                    browse
                  </button>
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Accepted: JPG, PNG, PDF, DOCX, XLSX, ZIP (max 10MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED_FILE_TYPES.join(",")}
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
              </div>

              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((file, i) => (
                    <li key={i} className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2 text-sm">
                      <span className="text-gray-700 truncate">{file.name}</span>
                      <span className="text-xs text-gray-400 ml-2">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMessage || "Something went wrong. Please try again."}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Send Inquiry"
              )}
            </Button>
          </form>
        </div>
      </section>

      <section className="bg-dark-50 border-t border-gray-100 py-12">
        <div className="container-site text-center">
          <h2 className="text-lg font-semibold text-dark-900">Prefer to reach out directly?</h2>
          <p className="mt-2 text-gray-500">
            Email:{" "}
            <a href="mailto:info@szzypack.com" className="text-primary-600 hover:underline">
              info@szzypack.com
            </a>
            {" "}| WhatsApp:{" "}
            <a href="https://wa.me/8613800000000" className="text-primary-600 hover:underline">
              +86 138 0000 0000
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
