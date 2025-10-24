import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Asterisk } from "lucide-react";

const Form = ({ 
  initialValues = {
    campaignName: "",
    campaignDescription: "",
    startDate: "",
    endDate: "",
    dailyDigest: false,
    keywords: "",
    digestFrequency: "",
  },
  onSubmit,
}) => {
  const [digestEnabled, setDigestEnabled] = useState(initialValues?.dailyDigest || false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      campaignName: Yup.string().required("Campaign name is required"),
      startDate: Yup.string().required("Start date is required"),
      keywords: Yup.string().required("Keywords are required"),
    }),
    onSubmit: (values) => {
      const formData = { ...values, dailyDigest: digestEnabled };
      onSubmit(formData);
    },
  });

  const formFields = [
    {
      label: "Campaign Name",
      name: "campaignName",
      placeholder: "e.g. The Future is now",
      type: "text",
      required: true,
    },
    {
      label: "Campaign Description",
      name: "campaignDescription",
      placeholder: "Please add a description to your campaign",
      type: "textarea",
    },
    {
      label: "Start Date",
      name: "startDate",
      type: "date",
      required: true,
      group: "date",
    },
    {
      label: "End Date",
      name: "endDate",
      type: "date",
      group: "date",
    },
    {
      label: "Want to receive daily digest about the campaign?",
      name: "dailyDigest",
      type: "toggle",
    },
    {
      label: "Linked Keywords",
      name: "keywords",
      placeholder: "To add keywords, type your keyword and press enter",
      type: "text",
      required: true,
    },
    {
      label: "Kindly select how often you want to receive daily digest",
      name: "digestFrequency",
      type: "select",
      options: ["Daily", "Weekly", "Monthly"],
    },
  ];

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6"
    >
      {formFields.map((field, index) => {
        if (field.group === "date" && index === 2) {
          return (
            <div key="date-group" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formFields
                .filter((f) => f.group === "date")
                .map((dateField) => (
                  <div key={dateField.name}>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      {dateField.label}
                      {dateField.required && (
                        <Asterisk size={10} className="text-red-500 ml-1" />
                      )}
                    </label>
                    <input
                      type="date"
                      name={dateField.name}
                      onChange={formik.handleChange}
                      value={formik.values[dateField.name]}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
                    />
                    {formik.touched[dateField.name] &&
                      formik.errors[dateField.name] && (
                        <p className="text-xs text-red-500 mt-1">
                          {formik.errors[dateField.name]}
                        </p>
                      )}
                  </div>
                ))}
            </div>
          );
        }
        if (field.group === "date" && index > 2) return null;

        if (field.type === "toggle") {
          return (
            <div
              key={field.name}
              className="flex items-center justify-between py-2"
            >
              <span className="text-sm text-gray-700">{field.label}</span>
              <button
                type="button"
                onClick={() => setDigestEnabled(!digestEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  digestEnabled ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    digestEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name}>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                {field.label}
              </label>
              <select
                name={field.name}
                onChange={formik.handleChange}
                value={formik?.values[field.name]}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
              >
                <option value="">Select</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && (
                <Asterisk size={10} className="text-red-500 ml-1" />
              )}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                value={formik.values[field.name]}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                value={formik?.values[field.name]}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
              />
            )}
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        );
      })}

     
    </form>
  );
};

export default Form;