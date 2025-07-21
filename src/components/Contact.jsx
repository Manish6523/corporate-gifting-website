import { Mail, MapPin, Phone, PhoneIcon } from "lucide-react";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "../../utils/Contactusbase.js";


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

const InputField = ({ id, label, placeholder, type = "text", value, onChange }) => (
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const { fullName, email, subject, message } = formData;

  //   const { error } = await supabase.from("inquiries").insert([
  //     {
  //       full_name: fullName,
  //       email,
  //       subject,
  //       message,
  //     },
  //   ]);

  //   if (error) {
  //     console.error("Supabase insert error:", error.message);
  //     alert("Failed to send inquiry. Please try again.");
  //     return;
  //   }

  //   setFormData({
  //     fullName: "",
  //     email: "",
  //     subject: "",
  //     message: "",
  //   });

  //   alert("Inquiry sent!");
  // };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const { fullName, email, subject, message } = formData;

  const { error } = await supabase.from("inquiries").insert([
    {
      full_name: fullName,
      email,
      subject,
      message,
    },
  ]);

  if (error) {
    alert("Failed to send inquiry. Please try again.");
    return;
  }

  setFormData({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  alert("Inquiry saved! Redirecting to Gmail...");

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1
    &to=${encodeURIComponent("info@legacygifts.com")}
    &cc=${encodeURIComponent(email)}
    &su=${encodeURIComponent(subject)}
    &body=${encodeURIComponent(`Name: ${fullName}\nEmail: ${email}\n\n${message}`)}`;

  window.location.href = gmailUrl;
};



  



  return (
    <>
      <section
        className="relative bg-black text-white py-55 px-4 overflow-hidden"
        id="hero"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="src/images/1752942401268.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-40 blur-sm"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold  flex flex-col gap-2"
          >
            <div className="text-primary">
              Contact <span className="text-primary">Us</span>
            </div>
            <p className="mt-4 text-lg md:text-2xl text-gray-300 font-light">
              We’re here to help! Whether you have a question, need support, or just want to say hello, feel free to reach out.
              You can contact us by sending us an email, or giving us a call.
              Our team will get back to you as soon as possible.            
            </p>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-300"
          ></motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-center gap-4 flex-wrap"
          ></motion.div>
        </div>
      </section>
      <div className="bg-gray-100 min-h-screen p-10 flex justify-center items-start">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50 p-10 rounded-lg shadow-md">
          {/* Contact Info */}
          <div className="space-y-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Contact Information
            </h2>

            <ContactInfoItem
              iconText=<PhoneIcon />
              title="Phone"
              subtitle="+91 98765 43210"
            />
            <ContactInfoItem
              iconText=<Mail />
              title="Email"
              subtitle="info@legacygifts.com"
            />
            <ContactInfoItem
              iconText=<MapPin />
              title="Office"
              subtitle={`123 Builder Avenue\nLos Angeles, LA 10001`}
            />
          </div>

          {/* Contact Form */}
          <form
            className="bg-white p-8 rounded-lg shadow-md space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-5">
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
                placeholder="Tell us about your issue or inquiry..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="height-250 resize-none w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary transition-colors text-white font-semibold py-3 rounded-md"
            >
              Send Inquiry →
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
