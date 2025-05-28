import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardBody className="p-10 md:p-16">
          <div className="md:flex md:items-center md:justify-between text-center md:text-left">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Ready to Get Your Free Temporary Gmail Account?</h2>
              <p className="text-lg md:text-xl opacity-90">
                Generate your temp Gmail account with inbox access in seconds. No sign-up required!
              </p>
            </div>
            <Link href="/#email-client-section" passHref legacyBehavior>
              <a className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg text-md hover:bg-gray-100 transition-colors shadow-md shrink-0">
                Get Your Free Account Now
              </a>
            </Link>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
