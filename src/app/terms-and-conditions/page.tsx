import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | XRT Tech',
  description: 'Read the terms and conditions for using XRT Tech services.',
};

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">🧾 XRT Tech – Terms & Conditions</h1>
      <p className="text-gray-600 text-center mb-12">Effective Date: October 2025</p>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          <strong>Company:</strong> XRT Tech LLC ("XRT Tech," "we," "our," or "us")<br />
          <strong>Website:</strong> xrt-tech.com
        </p>
        <p className="mb-8">By using this website or engaging our services, you ("Client") agree to the following legally binding terms.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Authorization & Access</h2>
        <p className="mb-6">
          The Client authorizes XRT Tech to access hosting accounts, domains, and related services necessary to design, develop, deploy, or maintain digital assets. The Client also authorizes XRT Tech to submit the website to search engines unless otherwise requested in writing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Scope of Services</h2>
        <p className="mb-6">
          XRT Tech provides website design, hosting, maintenance, online-ordering systems, IT support, cloud setup, and other digital solutions as detailed in each written proposal, service plan, or invoice. Services outside that scope require a separate written agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Independent Contractor Status</h2>
        <p className="mb-6">
          XRT Tech operates solely as an independent contractor. No employment, partnership, or joint-venture relationship is created between the Client and XRT Tech.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Hosting & Domain Management</h2>
        <p className="mb-4">
          Hosting is provided either by XRT Tech or a third-party of the Client's choice.
        </p>
        <p className="mb-4">
          XRT Tech is not responsible for downtime, security breaches, or data loss on third-party servers.
        </p>
        <p className="mb-4">
          Domains registered by XRT Tech are transferred to the Client after full payment.
        </p>
        <p className="mb-6">
          The Client is responsible for renewals unless a separate management agreement exists.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property & Ownership</h2>
        <p className="mb-4">
          The Client warrants that all materials provided (text, graphics, trademarks, data, etc.) are owned or licensed for use and agrees to indemnify XRT Tech against all third-party claims.
        </p>
        <p className="mb-4">
          XRT Tech retains copyright to all work until full payment is received. Upon payment, ownership of the final deliverables transfers to the Client, excluding:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Pre-existing code libraries, frameworks, or licensed third-party components.</li>
          <li>Proprietary tools or systems developed by XRT Tech.</li>
        </ul>
        <p className="mb-6">
          XRT Tech may display completed work in its portfolio unless the Client requests confidentiality in writing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Confidentiality & Data Security</h2>
        <p className="mb-6">
          Each party agrees to keep confidential information private and use it solely for performing this agreement. XRT Tech follows commercially reasonable security practices but cannot guarantee absolute security of data transmitted over the internet.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Accessibility & Legal Compliance</h2>
        <p className="mb-6">
          XRT Tech applies best practices (WCAG 2.1 AA). The Client acknowledges full compliance depends on ongoing content and operational management. XRT Tech is not liable for legal actions under ADA, GDPR, CCPA, or other regulations unless explicitly contracted for compliance consulting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Payments & Billing</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>50% deposit due before project start; remaining 50% due at completion or 90 days, whichever comes first.</li>
          <li>Subscription plans (hosting, maintenance, online-ordering) are billed monthly or annually.</li>
          <li>Overdue balances accrue 1.5% monthly interest; services may be suspended after 30 days.</li>
          <li>Payments are non-refundable once work has begun, except as required by law.</li>
          <li>All fees are in USD.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Change Requests & Revisions</h2>
        <p className="mb-6">
          One round of minor revisions is included within 30 days of delivery. Significant redesigns or new functionality requests will be billed at the current hourly rate or quoted separately.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Subcontractors & Third-Party Tools</h2>
        <p className="mb-6">
          XRT Tech may use qualified subcontractors or third-party tools to complete work efficiently. XRT Tech remains responsible for overall quality and coordination.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Post-Launch Maintenance</h2>
        <p className="mb-6">
          XRT Tech is not responsible for performance issues caused by edits made by the Client or others after launch. Corrective work requested for such issues is billable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Service Level & Disclaimers</h2>
        <p className="mb-4">
          XRT Tech will use reasonable skill and care but provides all services "as is" without warranties of merchantability, fitness for a particular purpose, or uninterrupted operation.
        </p>
        <p className="mb-4">
          XRT Tech is not liable for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Indirect or consequential damages (loss of profits, data, or reputation).</li>
          <li>Failures of third-party platforms (hosting, payment gateways, APIs).</li>
          <li>Force Majeure events (natural disasters, cyber-attacks, outages, etc.).</li>
        </ul>
        <p className="mb-6">
          Maximum aggregate liability is limited to the total fees paid by the Client for the service giving rise to the claim.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Indemnification</h2>
        <p className="mb-6">
          The Client agrees to defend and hold harmless XRT Tech, its officers, and employees from any claims, damages, or expenses arising from:
          <br />(a) content supplied by the Client;
          <br />(b) misuse of the website or systems; or
          <br />(c) violation of laws or third-party rights.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">14. Cancellations & Termination</h2>
        <p className="mb-6">
          Either party may terminate with written notice. The Client must pay for all work completed to date. No refunds are issued for completed or delivered work. XRT Tech may terminate immediately for non-payment, breach, or unlawful use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">15. Credit Link</h2>
        <p className="mb-6">
          A small "Developed by XRT Tech" credit may appear in the website footer unless removal is requested in writing before launch.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">16. Governing Law & Dispute Resolution</h2>
        <p className="mb-4">
          These Terms are governed by the laws of the Commonwealth of Massachusetts, USA.
        </p>
        <p className="mb-6">
          Disputes shall first attempt resolution through negotiation; failing that, they will be settled by binding arbitration in Boston, MA, under the rules of the American Arbitration Association.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">17. Entire Agreement</h2>
        <p className="mb-6">
          This document constitutes the entire agreement and supersedes all prior discussions. Modifications must be in writing and signed by both parties.
        </p>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-600">Last Updated: October 2025</p>
          <p className="text-gray-600">© 2025 XRT Tech LLC – All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
