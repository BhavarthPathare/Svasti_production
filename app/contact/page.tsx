import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Book Us - Contact Svasti Production',
  description: 'Get in touch to book your wedding photography and cinematography services.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07)',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            We love to create new stories...
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4">
            Our Wedding Package Starts from ₹1,50,000 per day
          </p>
          <div className="mt-6 space-y-2 text-lg">
            <p>📧 bpathare22cs@student.mes.ac.in</p>
            <p>📞 +91 9519222422</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="font-playfair text-3xl font-bold mb-6 text-center">
            Tell Us About Your Special Day
          </h2>
          <p className="text-gray-600 text-center mb-8">
            We aim to respond within 48 hours. If you don't hear from us, please give us a call.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
