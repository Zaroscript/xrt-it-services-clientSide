"use client";
import { case_study } from "../config/constants";
import Image from "next/image";

export default function Studies() {
  return (
    <section className="py-16 dark:bg-[#1a1a1a] text-white">
      <div className="page-container px-6">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-gray-400">CASE STUDIES</p>
          <h4 className="text-2xl md:text-4xl font-semibold text-primary dark:text-white/50">
            Proud projects that{" "}
            <span className="text-[#d3b073]">make us stand out</span>
          </h4>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center page-container">
          <div>
            <h3 className="text-2xl md:text-3xl font-light mb-3 text-primary dark:text-white/50">
              ACAF Systems Website Redesign
            </h3>
            <h5 className="text-[#d3b073] font-semiboldmb-3">
              Conversion-Focused Web Experience
            </h5>
            <p className="text-gray-400 leading-relaxed">
              XRT Tech rebuilt ACAF Systems’ website from the ground up to
              modernize their online presence, increase quote and project
              inquiries, and make system selection easier. The new site delivers
              a clean, user-friendly interface that guides visitors through
              products, case studies, and contact forms for a smoother
              path to conversion.
            </p>
          </div>

          <div>
            <Image
              src={case_study}
              alt="Case Study"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
