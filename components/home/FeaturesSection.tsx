import { Card, CardBody } from "@nextui-org/react";
import { Zap, Shield, Mail, Globe, RefreshCw, Download } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Our Temporary Gmail Generator?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Get the best temp Gmail account free service with full inbox functionality and privacy protection.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="p-6">
          <CardBody className="text-center">
            <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate your temporary Gmail account with inbox access in seconds. No waiting, no delays.
            </p>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardBody className="text-center">
            <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Complete Privacy</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No personal information required. Your privacy is protected with our anonymous temp Gmail service.
            </p>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardBody className="text-center">
            <Mail className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Full Inbox Access</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive and read emails with full inbox functionality. Download attachments and view HTML emails.
            </p>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardBody className="text-center">
            <Globe className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real Gmail Addresses</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get authentic Gmail addresses that work with all services and platforms worldwide.
            </p>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardBody className="text-center">
            <RefreshCw className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Auto Refresh</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automatic inbox refresh every 30 seconds to ensure you never miss important emails.
            </p>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardBody className="text-center">
            <Download className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Attachment Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Download email attachments directly from your temporary Gmail inbox.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
