"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner"; // For displaying notifications

interface GeneratedEmail {
  id: string;
  email: string;
}

export default function EmailGeneratorForm() {
  const [nameText, setNameText] = useState("");
  const [provider, setProvider] = useState("gmail.com");
  const [customDomain, setCustomDomain] = useState("");
  const [quantity, setQuantity] = useState<number | string>(5);
  const [generatedEmails, setGeneratedEmails] = useState<GeneratedEmail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setGeneratedEmails([]); // Clear previous results

    if (!quantity || +quantity <= 0 || +quantity > 50) {
      toast.error("Please enter a valid quantity between 1 and 50.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameText,
          provider: provider === "custom_input" ? customDomain : provider,
          quantity: Number(quantity),
        }),
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate emails.");
      }

      const data = await response.json();
      setGeneratedEmails(data.emails.map((email: string, index: number) => ({ id: `email-${index}-${Date.now()}`, email })));
      toast.success("Emails generated successfully!");

    } catch (error) {
      setIsLoading(false);
      console.error("Error generating emails:", error);
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
    }
  };

  const handleCopyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email)
      .then(() => {
        toast.success(`Copied "${email}" to clipboard!`);
      })
      .catch(err => {
        toast.error("Failed to copy to clipboard.");
        console.error('Failed to copy: ', err);
      });
  };

  const handleCopyAllToClipboard = () => {
    if (generatedEmails.length === 0) return;
    const allEmailsText = generatedEmails.map(item => item.email).join("\n");
    navigator.clipboard.writeText(allEmailsText)
      .then(() => {
        toast.success("All emails copied to clipboard!");
      })
      .catch(err => {
        toast.error("Failed to copy all emails.");
        console.error('Failed to copy all: ', err);
      });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Random Email Generator
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 pt-2">
          Instantly create unique email addresses. Just set your preferences and generate!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nameText" className="font-medium text-gray-700 dark:text-gray-300">
              Include Name/Text (Optional)
            </Label>
            <Input
              id="nameText"
              type="text"
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
              placeholder="e.g., john.doe, test.user"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="provider" className="font-medium text-gray-700 dark:text-gray-300">
                Email Provider
              </Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger id="provider" className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  <SelectItem value="gmail.com">Gmail (@gmail.com)</SelectItem>
                  <SelectItem value="outlook.com">Outlook (@outlook.com)</SelectItem>
                  <SelectItem value="live.com">Live (@live.com)</SelectItem>
                  <SelectItem value="yahoo.com">Yahoo (@yahoo.com)</SelectItem>
                  <SelectItem value="protonmail.com">ProtonMail (@protonmail.com)</SelectItem>
                  <SelectItem value="mail.com">Mail.com (@mail.com)</SelectItem>
                  <SelectItem value="custom_input">Custom</SelectItem>
                </SelectContent>
              </Select>
              {provider === "custom_input" && (
                <Input
                  id="customDomain"
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value.startsWith('@') ? e.target.value : `@${e.target.value}`)}
                  placeholder="e.g., @yourdomain.com"
                  className="mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required={provider === "custom_input"}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="font-medium text-gray-700 dark:text-gray-300">
                Number of Emails (1-50)
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === '' ? '' : Math.max(1, Math.min(50, parseInt(e.target.value, 10))))}
                placeholder="e.g., 10"
                min="1"
                max="50"
                required
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>

          <Button type="submit" className="w-full font-semibold text-lg py-3 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Emails"}
          </Button>
        </form>

        {generatedEmails.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Generated Emails:</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAllToClipboard}
                className="text-xs dark:bg-gray-600 dark:text-white dark:border-gray-500 hover:dark:bg-gray-500"
              >
                Copy All
              </Button>
            </div>
            <ul className="space-y-3">
              {generatedEmails.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-sm font-mono text-gray-700 dark:text-gray-200 break-all">{item.email}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyToClipboard(item.email)}
                    className="ml-3 text-xs dark:bg-gray-600 dark:text-white dark:border-gray-500 hover:dark:bg-gray-500"
                  >
                    Copy
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
