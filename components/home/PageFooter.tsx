import Link from "next/link";
import Image from "next/image"; // Added for SVG logo
import { Divider } from "@nextui-org/react"; // Chip no longer needed
// import { Mail } from "lucide-react"; // Mail icon no longer needed for logo
import FooterNewsletter from "./FooterNewsletter"; // Import the new component

export default function PageFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/mytempsmaillogo.svg" alt="My Temps Mail Logo" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold">My Temps Mail</span>
            </div>
            <p className="text-gray-400">
              The best free temporary Gmail account generator with full inbox functionality.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Free Temp Gmail</li>
              <li>Inbox Access</li>
              <li>Privacy Protection</li>
              <li>Instant Generation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <FooterNewsletter />
          </div>
        </div>

        <Divider className="my-8 bg-gray-700" />

        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} My Temps Mail. All rights reserved. Free temporary Gmail account generator service.</p>
        </div>
      </div>
    </footer>
  );
}
