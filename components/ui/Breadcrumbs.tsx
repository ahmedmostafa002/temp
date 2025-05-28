"use client"; // If using NextUI components or hooks like usePathname, otherwise can be server component

import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react'; // Or your preferred icon library

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      <ol className="flex items-center space-x-1.5 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <ChevronRightIcon className="h-4 w-4 mx-1.5 md:mx-2 flex-shrink-0 text-gray-400 dark:text-gray-500" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
