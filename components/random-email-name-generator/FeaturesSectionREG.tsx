import { Card, CardBody } from "@nextui-org/react";
import { Zap, Shield, Cpu, ListChecks, Edit3, Globe } from "lucide-react";

export default function FeaturesSectionREG() {
  const features = [
    {
      icon: <Cpu className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
      title: "AI-Powered Suggestions",
      description: "Leverage advanced AI to generate creative and contextually relevant email names.",
    },
    {
      icon: <Edit3 className="h-12 w-12 text-green-500 mx-auto mb-4" />,
      title: "Customizable Inputs",
      description: "Include specific names, keywords, or themes to guide the AI in its generation process.",
    },
    {
      icon: <Globe className="h-12 w-12 text-purple-500 mx-auto mb-4" />,
      title: "Multiple Domain Options",
      description: "Choose from popular providers like Gmail, Outlook, or input your own custom domain.",
    },
    {
      icon: <ListChecks className="h-12 w-12 text-yellow-500 mx-auto mb-4" />,
      title: "Bulk Generation",
      description: "Generate multiple unique email name suggestions at once, saving you time and effort.",
    },
    {
      icon: <Zap className="h-12 w-12 text-orange-500 mx-auto mb-4" />,
      title: "Instant Results",
      description: "Get your list of generated email names immediately, with no waiting or sign-ups required.",
    },
    {
      icon: <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />,
      title: "Privacy Focused",
      description: "Create email names for various purposes without revealing your primary email address.",
    },
  ];

  return (
    <section id="features-reg" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Key Features of Our Email Name Generator
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover why our AI-powered tool is perfect for creating unique and professional email names.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
            <CardBody className="text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
