import { Chip } from "@nextui-org/react";
import { CheckCircle, Zap, Shield, Globe } from "lucide-react";

export default function HeroIntro() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-800 dark:to-sky-900 py-16 shadow-sm">
      <section className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Free <span className="text-blue-600">Temporary Gmail Account</span>
            <br className="md:hidden" /> with Inbox
          </h1>
          <p className="text-xl md:text-2xl text-black dark:text-gray-100 mb-8 leading-relaxed">
            Generate temporary Gmail accounts with full inbox access instantly. Perfect for testing, registrations, and
            privacy protection. No sign-up required - completely free temp Gmail account generator.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Chip color="success" variant="flat" startContent={<CheckCircle className="h-4 w-4 text-green-700 dark:text-green-500" />}>
              100% Free
            </Chip>
            <Chip color="primary" variant="flat" startContent={<Zap className="h-4 w-4 text-blue-700 dark:text-blue-500" />}>
              Instant Generation
            </Chip>
            <Chip color="secondary" variant="flat" startContent={<Shield className="h-4 w-4 text-purple-700 dark:text-purple-500" />}>
              Privacy Protected
            </Chip>
            <Chip color="warning" variant="flat" startContent={<Globe className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />}>
              Real Gmail
            </Chip>
          </div>
        </div>
        {/* The interactive EmailClient component will be placed after this by the main page */}
      </section>
    </div>
  );
}
