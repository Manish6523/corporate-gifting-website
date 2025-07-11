import { Gift, Users, ShoppingCart, Sparkles } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Tell Us Your Needs",
      description:
        "Share your gifting goals, recipient count, and branding preferences.",
      icon: <Users className="h-8 w-8  text-white" />,
      bg: "bg-primary",
    },
    {
      id: "02",
      title: "We Curate & Customize",
      description:
        "Our experts craft tailored gift options, personalized with your logo and message.",
      icon: <Gift className="h-8 w-8  text-white" />,
      bg: "bg-primary",
    },
    {
      id: "03",
      title: "Delivered Nationwide",
      description:
        "We handle packaging and doorstep delivery across India — hassle-free.",
      icon: <ShoppingCart className="h-8 w-8  text-white" />,
      bg: "bg-primary",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          How Corporate <span className="text-[#5C4400]">Gifting Works</span>
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          A seamless 3-step process to make gifting meaningful, easy, and memorable
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`p-4 rounded-full ${step.bg}`}>
                  {step.icon}
                </div>
              </div>
              <h3 className="text-primary font-bold text-lg mb-1">STEP {step.id}</h3>
              <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
