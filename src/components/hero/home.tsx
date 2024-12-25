import { cn } from "@/lib/utils";

export const HomeHero = () => {
  return (
    <section className="w-full">
      <section
        className={cn(
          "relative rounded-2xl w-full layout bg-gradient-to-b from-yellow-400 to-yellow-300 text-gray-900",
          "text-center lg:text-left px-6 lg:px-12 py-16"
        )}
      >
        <div className="col-span-2 lg:col-span-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Simplify Compliance & Risk.
            <br />
            <span className="text-background md:text-7xl">With AI.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            Kopexa helps businesses streamline compliance processes, reduce
            risks, and save time. Leverage AI to get actionable insights in just
            15 minutes.
          </p>
          <ul className="mt-6 text-left space-y-4">
            <li className="flex items-start gap-3">
              <span className="bg-gray-900 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">
                ✓
              </span>
              <p>AI-powered recommendations to optimize audits.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-gray-900 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">
                ✓
              </span>
              <p>Save hours on compliance preparation.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-gray-900 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">
                ✓
              </span>
              <p>Custom workflows for ISO, GDPR, and more.</p>
            </li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/demo"
              className="bg-gray-900 text-white py-3 px-6 rounded-md font-semibold text-lg hover:bg-gray-800 transition"
            >
              Request a Demo
            </a>
            <a
              href="/product"
              className="bg-white text-gray-900 border border-gray-300 py-3 px-6 rounded-md font-semibold text-lg hover:bg-gray-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative col-span-2 lg:col-span-6">
          <img
            src="https://placehold.co/600x400"
            alt="AI Dashboard Illustration"
            className="w-full max-w-lg mx-auto lg:mx-0"
          />
          <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <h3 className="text-sm font-medium text-gray-700">AI Insights</h3>
            <p className="text-xs text-gray-500">
              &quot;Focus on high-impact tasks: ISO 27001 Section 6.1.&quot;
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};
