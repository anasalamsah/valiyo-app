"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SectionHeader } from "@/components/ui/SectionHeader";

const faqs = [
  {
    question: "What is Valiyo?",
    answer:
      "Valiyo is a digital learning platform designed to support people at different stages of learning and growth — from children discovering how they learn, to students, teachers, and professionals using technology to learn and work smarter.",
  },
  {
    question: "Who can use Valiyo?",
    answer:
      "Valiyo is built for children (2–12) through Valiyo Kids, and is expanding to serve university students, professionals, teachers, and organizations as the rest of the ecosystem launches.",
  },
  {
    question: "What products are currently available?",
    answer:
      "Valiyo Kids is live today, with two products: Valiyo Learn and Valiyo Discovery. Valiyo Students, Valiyo Skill, and Valiyo Teacher are in development. Valiyo AI Future Lab is available as a B2B offering.",
  },
  {
    question: "What is Valiyo Kids?",
    answer:
      "Valiyo Kids is Valiyo's product line for children aged 2–12, focused on learning, play, and discovering potential through Valiyo Learn and Valiyo Discovery.",
  },
  {
    question: "What is the difference between Learn and Discovery?",
    answer:
      "Valiyo Learn offers educational games and missions that build skills like logic and problem solving. Valiyo Discovery helps parents understand a child's unique learning style, strengths, and development areas.",
  },
  {
    question: "Is Valiyo available on mobile?",
    answer:
      "Valiyo Learn and Valiyo Discovery run in your mobile browser today — no app install required.",
  },
  {
    question: "Are all Valiyo products already available?",
    answer:
      "No. Only Valiyo Kids (Learn and Discovery) is live today. Other products in the ecosystem are clearly labeled Coming Soon or B2B until they launch.",
  },
] as const;

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeader eyebrow="FAQ" title="Frequently asked questions" align="center" />

      <div className="mt-10 divide-y divide-border rounded-[28px] bg-surface px-6 shadow-sm shadow-black/5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="py-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="font-display text-sm font-semibold text-text sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "shrink-0 text-text-muted transition-transform duration-200",
                    isOpen && "rotate-180 text-primary"
                  )}
                />
              </button>
              {isOpen && (
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
