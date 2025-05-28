"use client";

import { CardHeader, CardBody, Button } from "@nextui-org/react";
import { ArrowRight, Download } from "lucide-react";
import type { Message, Attachment } from "@/types";

interface EmailViewProps {
  selectedMessage: Message;
  onBack: () => void;
  onDownloadAttachment: (fileName: string) => void;
  isDownloading: boolean;
}

export default function EmailView({
  selectedMessage,
  onBack,
  onDownloadAttachment,
  isDownloading,
}: EmailViewProps) {
  const processNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      let childrenHtml = "";
      el.childNodes.forEach(child => {
        childrenHtml += processNode(child);
      });

      // Simplified switch for focused debugging
      const tagName = el.tagName.toLowerCase();
      if (tagName === "a") {
        const href = el.getAttribute("href") || "#";
        const safeHref = (href.startsWith("http:") || href.startsWith("https:") || href.startsWith("mailto:") || href.startsWith("/") || href.startsWith("#")) ? href : "#";
        return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">${childrenHtml}</a>`;
      } else if (tagName === "p") {
        return `<p style="margin-bottom: 1em;">${childrenHtml}</p>`;
      } else if (tagName === "br") {
        return "<br />";
      } else if (tagName === "strong" || tagName === "b") {
        return `<strong>${childrenHtml}</strong>`;
      } else if (tagName === "em" || tagName === "i") {
        return `<em>${childrenHtml}</em>`;
      }
      // For all other tags, try to reconstruct them simply or just pass children
      // This is to see if the basic structure is preserved
      if (el.childNodes.length > 0) { // If it has children, reconstruct the tag
        return `<${tagName}>${childrenHtml}</${tagName}>`;
      } else { // If it's an empty tag (like <hr> potentially, though <br> is handled)
        return `<${tagName} />`;
      }
    }
    return "";
  };

  let processedEmailBody = "";
  if (typeof window !== "undefined" && selectedMessage.body) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(selectedMessage.body, "text/html");
      if (doc.body) {
        // Simpler loop for processing
        doc.body.childNodes.forEach(node => {
          processedEmailBody += processNode(node);
        });

        // Fallback if processing results in nothing substantial
        if (processedEmailBody.replace(/<[^>]*>/g, '').trim().length < (selectedMessage.body.replace(/<[^>]*>/g, '').trim().length / 2) && doc.body.textContent) {
           // If processed body is much shorter than original text content, maybe parser stripped too much.
           // Fallback to a more direct rendering of paragraphs from text content.
           // TODO: Replace with structured warning logging (e.g., logger.warn)
           console.warn("Parser might have stripped too much content, using textContent fallback.");
           const rawText = doc.body.textContent;
           processedEmailBody = rawText.split(/\n\s*\n|\n/)
                               .map(para => para.trim())
                               .filter(para => para)
                               .map(para => `<p style="margin-bottom: 1em;">${para.replace(/\n/g, "<br />")}</p>`)
                               .join('');
        }
        if (processedEmailBody.trim() === "") {
             processedEmailBody = `<p style="margin-bottom: 1em;">${doc.body.textContent || "No displayable content."}</p>`;
        }

      } else {
        processedEmailBody = "<p style='margin-bottom: 1em;'>Error: Parsed document has no body.</p>";
      }
    } catch (e: any) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Error parsing email HTML:", e); 
      processedEmailBody = `<p style='margin-bottom: 1em;'>Error parsing email: ${e.message}. See console for details.</p>`;
    }
  } else {
    processedEmailBody = "<p class='email-paragraph'>No content available.</p>";
  }
  
  const iframeSrcDoc = `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: auto; 
            overflow: hidden; 
          }
          html {
             background-color: #f8f9fa;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            line-height: 1.65;
            color: #333;
            background-color: #ffffff;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box; 
          }
          .email-container {
            padding: 24px; 
            box-sizing: border-box;
            word-wrap: break-word; 
          }
          .email-paragraph { margin-top: 0; margin-bottom: 1.25em; }
          .email-heading, h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.75em; line-height: 1.3; font-weight: 600; color: #111827; }
          h1, .h1.email-heading { font-size: 2em; margin-top: 0; } 
          h2, .h2.email-heading { font-size: 1.5em; } 
          h3, .h3.email-heading { font-size: 1.25em; } 
          h4, .h4.email-heading { font-size: 1em; } 
          a, a[href] { color: #2563eb; text-decoration: underline; font-weight: 500; }
          a:hover, a[href]:hover { color: #1d4ed8; text-decoration: underline; }
          .email-image, img { max-width: 100%; height: auto; display: block; border-radius: 6px; margin-top: 0.5em; margin-bottom: 0.5em; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); }
          .email-table, table { border-collapse: collapse; width: 100%; margin-bottom: 1.5em; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; }
          .email-table th, .email-table td, table th, table td { border: 1px solid #e5e7eb; padding: 10px 14px; text-align: left; vertical-align: top; }
          .email-table th, table th { background-color: #f9fafb; font-weight: 600; color: #374151; }
          .email-table td, table td { color: #4b5563; }
          .email-pre, pre { font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; white-space: pre-wrap; word-wrap: break-word; background-color: #f3f4f6; padding: 16px; border-radius: 6px; overflow-x: auto; font-size: 0.9em; line-height: 1.5; color: #1f2937; border: 1px solid #e5e7eb; }
          .email-code, code { font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; padding: 0.2em 0.4em; margin: 0 0.1em; font-size: 85%; background-color: #e5e7eb; border-radius: 4px; color: #c026d3; }
          .email-pre > code, pre > code { padding: 0; margin: 0; font-size: inherit; background-color: transparent; border-radius: 0; color: inherit; border: none; }
          .email-blockquote, blockquote { border-left: 4px solid #9ca3af; padding: 12px 20px; margin: 1.5em 0; background-color: #f9fafb; color: #4b5563; font-style: normal; border-radius: 0 4px 4px 0; }
          .email-blockquote p { margin-bottom: 0.5em; }
          .email-blockquote p:last-child { margin-bottom: 0; }
          .email-list, ul, ol { margin-top: 0; margin-bottom: 1.25em; padding-left: 1.8em; }
          .email-list-item, li { margin-bottom: 0.5em; }
          .email-hr, hr { border: none; border-top: 1px solid #e5e7eb; margin: 2.5em 0; }
          .email-generic-div, .email-generic-span, .email-unhandled-block { display: block; margin-bottom: 0.5em; } /* Basic styling for generic/unhandled blocks */
          .email-generic-span { display: inline; margin-bottom: 0; }
          .email-unhandled-block { border: 1px dashed #ccc; padding: 4px; margin: 4px 0; }

          .button, a.button, button.button, a.btn, button.btn, a[role="button"], button[role="button"], table[role="presentation"] a[href*="://"] { display: inline-block; padding: 10px 24px; background-color: #2563eb; color: white !important; text-decoration: none !important; border-radius: 6px; font-weight: 500; text-align: center; border: 1px solid transparent; transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06); }
          .button:hover, a.button:hover, button.button:hover, a.btn:hover, button.btn:hover, a[role="button"]:hover, button[role="button"]:hover, table[role="presentation"] a[href*="://"]:hover { background-color: #1d4ed8; text-decoration: none !important; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); }
          .text-small { font-size: 0.875em; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="email-container">
          ${processedEmailBody}
        </div>
      </body>
    </html>
  `;

  return (
    <>
      <CardHeader className="flex flex-col items-start p-4 border-b-2 border-divider">
        <Button
          size="sm"
          variant="flat" 
          onPress={onBack}
          startContent={<ArrowRight className="h-4 w-4 rotate-180" />}
          className="mb-3 text-sm text-foreground-600 hover:bg-content2"
        >
          Back to Inbox
        </Button>
        <h1 className="text-2xl font-semibold text-foreground mb-2 break-words leading-tight">
          {selectedMessage.subject || "(No Subject)"}
        </h1>
        <div className="w-full text-sm text-foreground-600 space-y-1">
          <div className="flex">
            <span className="font-medium w-16 shrink-0">From:</span>
            <span className="truncate">{selectedMessage.from}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-16 shrink-0">Date:</span>
            <span>
              {new Date(selectedMessage.timestamp).toLocaleString(undefined, { 
                dateStyle: 'medium', 
                timeStyle: 'short' 
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0 flex flex-col overflow-hidden">
        <iframe
          srcDoc={iframeSrcDoc}
          style={{ width: "100%", height: "100%", border: "none", flexGrow: 1 }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation-by-user-activation"
          title={`Email: ${selectedMessage.subject}`}
          className="bg-white dark:bg-content1" 
        />
        {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
          <div className="p-4 border-t border-divider bg-content2">
            <h4 className="font-semibold mb-2 text-sm text-foreground-700">
              Attachments:
            </h4>
            <ul className="space-y-2 list-none p-0">
              {selectedMessage.attachments.map((att: Attachment) => (
                <li
                  key={att.id || att.filename}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-content3"
                >
                  <span className="text-sm truncate max-w-[calc(100%-120px)] text-foreground-700">
                    {att.filename}
                  </span>
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    isLoading={isDownloading}
                    onPress={() => onDownloadAttachment(att.filename)}
                    startContent={<Download className="h-4 w-4" />}
                    className="text-xs"
                  >
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
    </>
  );
}
