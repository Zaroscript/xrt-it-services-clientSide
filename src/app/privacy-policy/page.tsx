import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | XRT Tech',
  description: 'Read our privacy policy to understand how we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">🔒 XRT Tech – Privacy Policy</h1>
      <p className="text-gray-600 text-center mb-12">Effective Date: October 2025</p>
      
      <div className="prose max-w-none">
        <p className="mb-8">
          At XRT Tech LLC ("XRT Tech," "we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website xrt-tech.com or use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">We may collect the following types of information:</p>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details.</li>
          <li><strong>Payment Information:</strong> Billing address, payment method, and transaction details.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> To enhance your experience on our website.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We may use your information to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Provide, operate, and maintain our services</li>
          <li>Process transactions and send related information</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Improve our website and services</li>
          <li>Send promotional communications (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
        <p className="mb-6">
          We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Sharing and Disclosure</h2>
        <p className="mb-4">We may share your information with:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Service providers who assist in our business operations</li>
          <li>Business partners with your consent</li>
          <li>Legal authorities when required by law</li>
          <li>Third parties in connection with a business transaction</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Access and receive a copy of your personal data</li>
          <li>Rectify any inaccurate or incomplete information</li>
          <li>Request deletion of your personal data</li>
          <li>Restrict or object to processing of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
        <p className="mb-6">
          We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Third-Party Links</h2>
        <p className="mb-6">
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
        <p className="mb-6">
          Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
        <p className="mb-6">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p className="mb-6">
          If you have any questions about this Privacy Policy, please contact us at:
          <br /><br />
          XRT Tech LLC<br />
          Email: privacy@xrt-tech.com<br />
          Phone: +1 (234) 567-8900
        </p>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-600">Last Updated: October 2025</p>
          <p className="text-gray-600">© 2025 XRT Tech LLC – All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
