export interface Account {
  email: string;
  token: string;
  expiresAt: string;
}

export interface Attachment {
  id: string; // Or whatever identifier the API provides
  filename: string;
  contentType: string;
  size: number; // Or string
}

export interface Message {
  id: string;
  from: string;
  subject: string;
  timestamp: string;
  isRead: boolean;
  hasAttachments: boolean;
  body?: string;
  attachments?: Attachment[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Types for Sanity integration
export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImageReference {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  // You can add more fields here if your image schema has them (e.g., caption)
}

export interface SanityPortableText {
  // This is a very basic representation. For rich text, you might need a more detailed type
  // or use a library like @portabletext/react with its own types.
  _type: string;
  [key: string]: any; 
}

export interface SanityReference {
  _type: 'reference';
  _ref: string;
}

export interface SanityAuthor {
  _id: string;
  _type: 'author';
  name?: string;
  slug?: SanitySlug;
  image?: SanityImageReference;
  bio?: SanityPortableText[] | any[];
}

export interface SanityCategory {
  _id: string;
  _type: 'category';
  title?: string;
  slug?: SanitySlug;
  description?: string;
}

export interface SanityBlogPost {
  _id: string;
  title?: string;
  slug?: SanitySlug;
  mainImage?: SanityImageReference;
  excerpt?: string;
  publishedAt?: string; // ISO date string
  body?: SanityPortableText[] | any[]; // Portable Text array
  author?: SanityAuthor | SanityReference; // Can be expanded or just a reference
  categories?: (SanityCategory | SanityReference)[]; // Array of expanded or reference
  
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: SanityImageReference;
}
