"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
} from "@nextui-org/react";
import { Mail, Copy, RefreshCw, Clock, User } from "lucide-react";
import { toast } from "sonner"; // Changed to sonner
import type { Account, Message } from "@/types";
import EmailListItem from "@/components/EmailListItem";
import EmailView from "@/components/EmailView";

export default function EmailClient() {
  const [account, setAccount] = useState<Account | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageDetailCache, setMessageDetailCache] = useState<Map<string, Message>>(new Map());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const generateAccount = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/account", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate account");
      }

      const data = await response.json();
      setAccount(data);
      setMessages([]);
      setSelectedMessage(null); // Clear selected message on new account
      setMessageDetailCache(new Map()); // Clear message detail cache on new account
      toast.success("Temporary Gmail account generated successfully!");
    } catch (error) {
      toast.error("Failed to generate account. Please try again.");
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Account generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchMessages = async () => {
    if (!account) return;

    setIsLoadingMessages(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: account.email,
          token: account.token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      toast.error("Failed to fetch messages");
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Messages fetch error:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const fetchMessageDetail = async (messageId: string) => {
    if (!account) return;

    // Check cache first
    if (messageDetailCache.has(messageId)) {
      setSelectedMessage(messageDetailCache.get(messageId)!);
      return;
    }

    // Optimistically set selected message to show loading in EmailView
    // or handle loading state within EmailView itself if preferred
    const optimisticMessage = messages.find(m => m.id === messageId);
    if (optimisticMessage) {
        setSelectedMessage({...optimisticMessage, body: "Loading..."}); 
    }

    try {
      // Changed to use the POST /api/message endpoint which handles transformations
      // and expects address, token, and messageId in the body.
      const response = await fetch(`/api/message`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: messageId,
          address: account.email,
          token: account.token,
        }),
      });
    
      if (!response.ok) {
         // Try to parse error from API
        let errorMsg = "Failed to fetch message details.";
        try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
                errorMsg = errorData.error;
            }
        } catch (parseError) {
            // Ignore if error response is not JSON
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setMessageDetailCache(prevCache => new Map(prevCache).set(messageId, data));
      setSelectedMessage(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load message details.");
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Message detail fetch error:", error);
      if (optimisticMessage) setSelectedMessage(optimisticMessage); // Revert on error
      else setSelectedMessage(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const downloadAttachment = async (fileName: string) => {
    if (!selectedMessage || !account) {
      toast.error("No message selected or account not found.");
      return;
    }
    setIsDownloading(true);
    try {
      const response = await fetch("/api/attachment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName,
          messageId: selectedMessage.id,
          address: account.email, // Assuming API needs this for context
          token: account.token, // Assuming API needs this for auth
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to download attachment." }));
        throw new Error(errorData.error || "Failed to download attachment");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success(`Downloaded ${fileName}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to download attachment.");
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Attachment download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  const clearSelectedMessage = () => {
    setSelectedMessage(null);
  };

  useEffect(() => {
    if (account) {
      fetchMessages(); // Initial fetch
      const interval = setInterval(fetchMessages, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [account]);

  return (
    <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
      {/* Account Generator */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader className="flex flex-col items-start"> {/* Ensure header items can stack */}
            <div className="flex items-center gap-2 mb-1"> {/* Add margin bottom for spacing */}
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Account Generator</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm"> {/* Removed mt-1 as mb-1 on title div handles it */}
              Generate a temporary Gmail account that expires in 10 minutes.
            </p>
          </CardHeader>
          <CardBody className="space-y-4">
            {!account ? (
              <Button
                size="lg"
                color="primary"
                className="w-full"
                isLoading={isGenerating}
                onPress={generateAccount}
                startContent={!isGenerating && <Mail className="h-5 w-5" />}
              >
                {isGenerating ? "Generating..." : "Generate Free Temp Gmail"}
              </Button>
            ) : (
              <div className="space-y-4">
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Chip color="success" variant="flat" startContent={<Clock className="h-3 w-3" />}>
                        Active
                      </Chip>
                    </div>
                    <div className="font-mono text-sm break-all mb-3 p-2 bg-white dark:bg-gray-800 rounded">
                      {account.email}
                    </div>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="w-full"
                      startContent={<Copy className="h-4 w-4" />}
                      onPress={() => copyToClipboard(account.email)}
                    >
                      Copy Email Address
                    </Button>
                  </CardBody>
                </Card>

                <Button
                  variant="bordered"
                  className="w-full"
                  isLoading={isGenerating}
                  onPress={generateAccount} // This will generate a new account, replacing the old one
                  startContent={!isGenerating && <RefreshCw className="h-4 w-4" />}
                >
                  Generate New Account
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Messages / Selected Message View */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] overflow-y-auto"> {/* Ensure consistent height */}
          {!selectedMessage ? (
            // Inbox View
            <>
              <CardHeader className="flex flex-col items-start"> {/* Ensure header items can stack */}
                <div className="flex items-center justify-between w-full mb-1"> {/* Add margin bottom for spacing */}
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <h3 className="text-xl font-semibold">Inbox</h3>
                  </div>
                  {account && (
                    <Button
                      size="sm"
                      variant="bordered"
                      isLoading={isLoadingMessages}
                      onPress={fetchMessages}
                      startContent={!isLoadingMessages ? <RefreshCw className="h-4 w-4" /> : null}
                    >
                      {isLoadingMessages ? "Refreshing..." : "Refresh"}
                    </Button>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 w-full text-left text-sm"> {/* Removed mt-1 */}
                  {account ? <span className="break-all">Messages for {account.email}</span> : "Generate an account to view messages."}
                </p>
              </CardHeader>
              <CardBody className="p-0">
                {!account ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Mail className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Generate a temporary Gmail account to start.</p>
                      <p className="text-sm">Your inbox will appear here with full email functionality.</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full overflow-auto">
                    {isLoadingMessages && messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                      </div>
                    ) : !isLoadingMessages && messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <Mail className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No messages yet.</p>
                          <p className="text-sm">Messages will appear here automatically.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 p-4">
                        {messages.map((message) => (
                          <EmailListItem
                            key={message.id}
                            message={message}
                            onPress={() => fetchMessageDetail(message.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardBody>
            </>
          ) : (
            <EmailView
              selectedMessage={selectedMessage}
              onBack={clearSelectedMessage}
              onDownloadAttachment={downloadAttachment}
              isDownloading={isDownloading}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
