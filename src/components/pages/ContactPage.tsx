// src/pages/ContactPage.tsx
import React, { useEffect, useState } from "react";
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { MapPin, Mail, Phone } from "lucide-react";
import { Theme, Page } from "@/types";
import { useTranslation } from "react-i18next";
import { client } from "@/lib/sanity";
import groq from "groq";

interface ContactPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

interface ContactData {
  pageTitle: string;
  pageSubtitle: string;
  formTitle: string;
  address: string;
  phone: string;
  email: string;
}

const query = groq`*[_type == "contactSettings"][0]`;

const ContactPage: React.FC<ContactPageProps> = ({ theme, onNavigate }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<ContactData | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    client.fetch<ContactData>(query).then(setData);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (!formData.name || !formData.email || formData.message.length < 10) {
      setSubmissionStatus("error");
      setIsSubmitting(false);
      return;
    }
    console.log("Form Data Submitted:", formData);
    setSubmissionStatus("success");
    setIsSubmitting(false);
  };

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6'>{data?.pageTitle || t("contact.title")}</h1>
          <p className='text-gray-400 text-lg'>{data?.pageSubtitle || t("contact.subtitle")}</p>
        </div>

        <div className='grid lg:grid-cols-2 gap-16 p-6 rounded-2xl bg-[#110e0d]/90 backdrop-blur-md '>
          <div className=''>
            <h3 className='text-2xl font-bold mb-6 text-white'>{data?.formTitle || t("contact.form_title")}</h3>
            <form onSubmit={handleSubmit} className='space-y-6 p-6'>
              {submissionStatus === "success" && (
                <div className='p-4 bg-green-500/20 border border-green-500 rounded-xl text-center'>
                  <p className='font-semibold text-lg text-white'>{t("contact.success_title")}</p>
                  <p className='text-sm text-white/80 mt-1'>{t("contact.success_desc")}</p>
                </div>
              )}
              {submissionStatus === "error" && (
                <div className='p-4 bg-red-500/20 border border-red-500 rounded-xl text-center'>
                  <p className='font-semibold text-lg text-white'>{t("contact.error_title")}</p>
                  <p className='text-sm text-white/80 mt-1'>{t("contact.error_desc")}</p>
                </div>
              )}

              <div>
                <label htmlFor='name' className='block text-sm font-medium mb-2 text-gray-300'>
                  {t("contact.label_name")}
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={(e) => handleInputChange(e)}
                  className='w-full p-3 border border-gray-700 rounded-lg bg-[#110e0d] text-white focus:ring-2 focus:ring-orange-500 transition'
                  placeholder={t("contact.placeholder_name")}
                />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium mb-2 text-gray-300'>
                  {t("contact.label_email")}
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                  className='w-full p-3 border border-gray-700 rounded-lg bg-[#110e0d] text-white focus:ring-2 focus:ring-orange-500 transition'
                  placeholder={t("contact.placeholder_email")}
                />
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-medium mb-2 text-gray-300'>
                  {t("contact.label_message")}
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange(e)}
                  className='w-full p-3 border border-gray-700 rounded-lg bg-[#110e0d] text-white focus:ring-2 focus:ring-orange-500 transition'
                  placeholder={t("contact.placeholder_message")}
                />
              </div>

              <div className='pt-4'>
                <DynamicGradientButton onClick={handleSubmit} active={true} theme={theme}>
                  {isSubmitting ? t("contact.btn_sending") : t("contact.btn_send")}
                </DynamicGradientButton>
              </div>
            </form>
          </div>

          <div className='space-y-8'>
            <div className='gap-6 grid'>
              <h3 className='text-2xl font-bold mb-6 text-white'>{t("contact.details_title")}</h3>

              <div className='flex items-start gap-4 p-4 hover:bg-[#1c1816]/50 transition duration-300 rounded-lg border-l-4 border-orange-500/70'>
                <MapPin className={`${theme.accent} flex-shrink-0 mt-1`} size={28} />
                <div>
                  <h4 className='text-xl font-semibold text-white'>{t("contact.location_label")}</h4>
                  <p className='text-sm text-gray-400 mt-1'>{data?.address || t("contact.location_value")}</p>
                </div>
              </div>

              <div className='flex items-start gap-4 p-4 hover:bg-[#1c1816]/50 transition duration-300 rounded-lg border-l-4 border-orange-500/70'>
                <Mail className={`${theme.accent} flex-shrink-0 mt-1`} size={28} />
                <div>
                  <h4 className='text-xl font-semibold text-white'>{t("contact.email_label")}</h4>
                  <p className='text-sm text-gray-400 mt-1'>{data?.email || t("contact.email_value")}</p>
                </div>
              </div>

              <div className='flex items-start gap-4 p-4 hover:bg-[#1c1816]/50 transition duration-300 rounded-lg border-l-4 border-orange-500/70'>
                <Phone className={`${theme.accent} flex-shrink-0 mt-1`} size={28} />
                <div>
                  <h4 className='text-xl font-semibold text-white'>{t("contact.phone_label")}</h4>
                  <p className='text-sm text-gray-400 mt-1'>{data?.phone || t("contact.phone_value")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;