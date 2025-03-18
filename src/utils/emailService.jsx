import emailjs from "emailjs-com";

// Configure your EmailJS account details
const SERVICE_ID = "your_service_id"; // Replace with your EmailJS service ID
const TEMPLATE_ID = "your_template_id"; // Replace with your EmailJS template ID
const USER_ID = "your_user_id"; // Replace with your EmailJS user ID

/**
 * Sends an email with the user's monthly performance data.
 * @param {string} email - The recipient's email address.
 * @param {string} name - The user's name.
 * @param {string} month - The month of the report.
 * @param {Object[]} routineSummary - An array of objects summarizing routine performance.
 * @returns {Promise} A promise resolving with the email-sending result.
 */
export const sendMonthlyPerformanceEmail = (email, name, month, routineSummary) => {
  const formattedSummary = routineSummary
    .map(
      (item) =>
        `${item.routine}: ${item.daysCompleted} days completed out of ${item.totalDays}`
    )
    .join("\n");

  const templateParams = {
    user_name: name,
    user_email: email,
    month: month,
    performance_summary: formattedSummary,
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
};
