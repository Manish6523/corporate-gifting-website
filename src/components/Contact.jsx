import { Mail, MapPin, Phone, PhoneIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import image from "../../public/contact.jpg";

const ContactInfoItem = ({ iconText, title, subtitle }) => (
  <div className="flex items-start gap-4">
    <div className="flex justify-center items-center rounded-full bg-primary w-12 h-12 mt-1 text-white text-xl">
      {iconText}
    </div>
    <div>
      <p className="font-semibold text-gray-700">{title}</p>
      <p className="text-gray-500 text-sm whitespace-pre-line">{subtitle}</p>
    </div>
  </div>
);

const InputField = ({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) => (
  <div className="flex-1">
    <label htmlFor={id} className="block mb-1 text-gray-700 font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
      required
    />
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });

    toast.success("Inquiry sent successfully!");
  };

  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <section
        className="relative bg-black text-white min-h-[60vh] flex items-center justify-center px-4 overflow-hidden"
        id="hero"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt="Background"
            className="w-full h-full object-cover opacity-40 blur-sm"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug"
          >
            <span className="text-primary">Contact Us</span>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 font-light">
              We’re here to help! Whether you have a question or just want to
              say hello, feel free to reach out.
            </p>
          </motion.h1>
        </div>
      </section>

      <div className="bg-gray-100 py-10 px-4 flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-lg shadow-md">
          {/* Contact Info Section */}
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-800">
              Contact Information
            </h2>
            <ContactInfoItem
              iconText={<PhoneIcon />}
              title="Phone"
              subtitle="+91 98765 43210"
            />
            <ContactInfoItem
              iconText={<Mail />}
              title="Email"
              subtitle="info@legacygifts.com"
            />
            <ContactInfoItem
              iconText={<MapPin />}
              title="Office"
              subtitle={`123 Builder Avenue\nLos Angeles, LA 10001`}
            />
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-5">
              <InputField
                id="fullName"
                label="Full Name"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
              <InputField
                id="email"
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <InputField
              id="subject"
              label="Subject"
              placeholder="Product Inquiry"
              value={formData.subject}
              onChange={handleChange}
            />

            <div>
              <label
                htmlFor="message"
                className="block mb-1 text-gray-700 font-medium"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Tell us about your issue or inquiry..."
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              ></textarea>
            </div>

            {/* <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark transition-colors text-white font-semibold py-3 rounded-md"
      >
        Send Inquiry →
      </button> */}
            <button
              type="submit"
              className="cursor-pointer w-full relative text-[#bc8f14] font-bold py-2 px-6 border-2 border-[#bc8f14] overflow-hidden group rounded-lg"
            >
              <span className="relative z-10 group-hover:text-white">
                Send Enquiry →
              </span>
              <span className="absolute inset-0 bg-[#bc8f14] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
