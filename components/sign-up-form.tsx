"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Definiere die Props für den wiederverwendbaren Formular-Komponente
interface SignUpFormProps {
  onSuccess?: () => void;
  buttonText?: string;
  placeholderText?: string;
  includeNameField?: boolean;
  className?: string;
  redirectUrl?: string;
}

export function SignUpForm({
  onSuccess,
  buttonText = "Join Waitlist",
  placeholderText = "Enter your email",
  includeNameField = false,
  className = "",
  redirectUrl = "",
}: SignUpFormProps) {
  // Zustandsvariablen für Formular
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handler für das Absenden des Formulars
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // E-Mail-Validierung
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Sende Daten an unsere API-Route
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: includeNameField ? name : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Erfolgreiche Anmeldung
      setIsSubmitted(true);
      setEmail("");
      setName("");

      toast({
        title: "Success!",
        description:
          "You've been added to our waitlist. We'll be in touch soon!",
      });

      // Rufe onSuccess-Callback auf, wenn vorhanden
      if (onSuccess) {
        onSuccess();
      }

      // Weiterleitung, falls URL angegeben
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Oops!",
        description:
          error instanceof Error
            ? error.message
            : "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-3">
            {includeNameField && (
              <Input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-[#0f1521] border-[#2a3042] text-[#e9e9e9] placeholder:text-[#6b7280] focus:border-[#e6a54c] focus:ring-[#e6a54c]"
                disabled={isLoading}
              />
            )}
            <Input
              type="email"
              placeholder={placeholderText}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-[#0f1521] border-[#2a3042] text-[#e9e9e9] placeholder:text-[#6b7280] focus:border-[#e6a54c] focus:ring-[#e6a54c]"
              required
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 bg-[#c48b3c] hover:bg-[#e6a54c] text-[#0f1521] font-medium border border-[#e6a54c]/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Joining...
                </>
              ) : (
                buttonText
              )}
            </Button>
          </div>
          <p className="text-xs text-[#6b7280] text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      ) : (
        <div className="rounded-lg border border-[#c48b3c]/30 bg-[#c48b3c]/10 p-6 text-center">
          <p className="text-lg font-medium text-[#e6a54c] mb-1">
            You&apos;re on the list!
          </p>
          <p className="text-[#a7a7a7]">
            Thanks for signing up! We&apos;ll keep you updated on our progress.
          </p>
        </div>
      )}
    </div>
  );
}
