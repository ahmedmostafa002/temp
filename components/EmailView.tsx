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
    try {
      // Handle text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || "";
      }

      // Handle element nodes
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toLowerCase();
        let childrenHtml = "";
        
        // Process all child nodes
        el.childNodes.forEach(child => {
          childrenHtml += processNode(child);
        });

        // Handle different HTML elements
        switch (tagName) {
          case 'a': {
            const href = el.getAttribute('href') || '#';
            return `<a href="${href}" target="_blank" rel="noopener noreferrer" 
                    style="color: #2563eb; text-decoration: underline; cursor: pointer; word-break: break-all;">
                    ${childrenHtml || href}
                  </a>`;
          }
          case 'p':
            return `<p style="margin: 0 0 1em 0; padding: 0; white-space: pre-line;">${childrenHtml}</p>`;
          case 'br':
            return '<br />';
          case 'strong':
          case 'b':
            return `<strong>${childrenHtml}</strong>`;
          case 'em':
          case 'i':
            return `<em>${childrenHtml}</em>`;
          case 'div':
            return `<div style="margin-bottom: 1em;">${childrenHtml}</div>`;
          case 'span':
            return `<span>${childrenHtml}</span>`;
          case 'img': {
            const src = el.getAttribute('src') || '';
            const alt = el.getAttribute('alt') || '';
            return `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" />`;
          }
          case 'ul':
            return `<ul style="margin: 0.5em 0 1em 1.5em; padding: 0;">${childrenHtml}</ul>`;
          case 'ol':
            return `<ol style="margin: 0.5em 0 1em 1.5em; padding: 0 0 0 1.5em;">${childrenHtml}</ol>`;
          case 'li':
            return `<li style="margin-bottom: 0.25em;">${childrenHtml}</li>`;
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return `<${tagName} style="margin: 1.5em 0 0.75em 0; font-weight: 600; line-height: 1.3;">${childrenHtml}</${tagName}>`;
          default:
            if (el.childNodes.length > 0) {
              return `<${tagName}>${childrenHtml}</${tagName}>`;
            } else {
              return `<${tagName} />`;
            }
        }
      }
      
      return '';
    } catch (error) {
      console.error('Error processing node:', error);
      return '';
    }
  };

  let processedEmailBody = "";
  if (typeof window !== "undefined" && selectedMessage.body) {
    const body = selectedMessage.body;
    
    // Enhanced URL detection pattern
    const urlPattern = /(https?:\/\/[^\s<]+)|(www\.[^\s<]+\.[^\s<]+)|(\b[^\s<@]+@[^\s<]+\.[^\s<]+\b)/gi;
    const hasUrls = urlPattern.test(body);
    
    // Check if it's likely plain text (no HTML tags or minimal HTML)
    const isLikelyPlainText = !/<[a-z][\s\S]*>/i.test(body) || body.includes('\n\n') || body.includes('  ');
    
    try {
      if (isLikelyPlainText) {
        // Process as plain text with enhanced link detection
        const withLinks = body
          // Convert URLs to clickable links
          .replace(/(https?:\/\/[^\s<]+)/g, 
            '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; word-break: break-all;">$1</a>')
          // Convert www links (without http)
          .replace(/([^"'>])(www\.[^\s<]+\.[^\s<]+)/g, 
            '$1<a href="https://$2" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; word-break: break-all;">$2</a>')
          // Convert email addresses
          .replace(/([\w\.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g, 
            '<a href="mailto:$1" style="color: #2563eb; text-decoration: underline;">$1</a>');
        
        // Split into paragraphs and wrap in <p> tags
        processedEmailBody = withLinks
          .split(/\n\s*\n|\n/)
          .map(para => {
            // Trim and skip empty paragraphs
            const trimmed = para.trim();
            if (!trimmed) return '';
            
            // Special handling for common patterns like "Click here: http://..."
            if (trimmed.match(/^[^<]*click\s+here[^<]*http/i)) {
              return `<p style="margin: 0 0 1em 0; padding: 0; white-space: pre-line;">${
                trimmed.replace(/(click\s+here)([^<]*)(https?:\/\/\S+)/i, 
                  '<a href="$3" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; font-weight: 500;">$1</a>$2$3')
              }</p>`;
            }
            
            return `<p style="margin: 0 0 1em 0; padding: 0; white-space: pre-line;">${trimmed}</p>`;
          })
          .join('');
      } else {
        // Process as HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(body, "text/html");
        
        if (doc.body) {
          // Process each top-level node in the body
          doc.body.childNodes.forEach(node => {
            processedEmailBody += processNode(node);
          });
          
          // If we didn't get any meaningful content, fall back to text processing
          const textContent = doc.body.textContent || '';
          if (processedEmailBody.replace(/<[^>]*>/g, '').trim().length < textContent.trim().length / 2) {
            processedEmailBody = body; // Fall back to original body
          }
        }
      }
    } catch (e) {
      console.error("Error processing email content:", e);
      // Fallback to simple text processing with link detection
      const withLinks = body
        .replace(/(https?:\/\/[^\s<]+)/g, 
          '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; word-break: break-all;">$1</a>')
        .replace(/([^"'>])(www\.[^\s<]+\.[^\s<]+)/g, 
          '$1<a href="https://$2" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; word-break: break-all;">$2</a>');
      
      processedEmailBody = `<div style="white-space: pre-wrap; padding: 1em;">${withLinks}</div>`;
    }
    
    // If we still have no content, show the raw content
    if (!processedEmailBody.trim()) {
      processedEmailBody = `<div style="white-space: pre-wrap; padding: 1em;">${body}</div>`;
    }
  } else {
    processedEmailBody = "<p class='email-paragraph'>No content available.</p>";
  }
  
  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            word-break: break-word;
          }
          p {
            margin: 0 0 0.25em 0;
            padding: 0;
          }
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            overflow: hidden;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.5;
            color: #1a1a1a;
            padding: 0;
            margin: 0;
            min-height: 100%;
            box-sizing: border-box;
          }
          a {
            color: #2563eb;
            text-decoration: underline;
            word-break: break-all;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          .email-container {
            width: 100%;
            margin: 0;
            padding: 12px 16px 0;
            display: block;
            min-height: 100%;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; overflow: visible !important;">
        <div class="email-container">
          ${processedEmailBody}
        </div>
        <script>
          // Send height to parent when content loads
          function updateHeight() {
            const height = Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            );
            window.parent.postMessage({ type: 'setHeight', height: height }, '*');
          }
          
          // Update height on load and resize
          window.addEventListener('load', updateHeight);
          window.addEventListener('resize', updateHeight);
          
          // Initial height update
          updateHeight();
          
          // Additional updates to catch dynamic content
          setTimeout(updateHeight, 500);
          setTimeout(updateHeight, 1000);
        </script>
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
      <CardBody className="p-0 flex flex-col h-full">
        <div className="flex-1 overflow-hidden">
          <iframe
            srcDoc={iframeSrcDoc}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "100%",
              border: "none",
              display: "block",
              margin: 0,
              padding: 0
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation-by-user-activation"
            title={`Email: ${selectedMessage.subject}`}
            className="bg-white dark:bg-content1"
          />
        </div>
        {(selectedMessage.hasAttachments || (selectedMessage.attachments && selectedMessage.attachments.length > 0)) && (
          <div className="p-4 border-t border-divider bg-content2">
            <h4 className="font-semibold mb-2 text-sm text-foreground-700">
              Attachments:
            </h4>
            <ul className="space-y-2 list-none p-0">
              {selectedMessage.attachments && selectedMessage.attachments.length > 0 ? (
                // Show actual attachments if available
                selectedMessage.attachments.map((att: Attachment) => (
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
                ))
              ) : (
                // Show a generic download button if hasAttachments is true but no attachments array
                <li className="flex items-center justify-between p-2 rounded-md hover:bg-content3">
                  <span className="text-sm text-foreground-700">
                    File attachment
                  </span>
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    isLoading={isDownloading}
                    onPress={() => onDownloadAttachment('attachment')}
                    startContent={<Download className="h-4 w-4" />}
                    className="text-xs"
                  >
                    Download
                  </Button>
                </li>
              )}
            </ul>
          </div>
        )}
      </CardBody>
    </>
  );
}
