"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlanCard from "./PlanCard";

const PlanCards = () => {
  const plans = [
    {
      title: "Starter",
      price: "$ 499",
      description: "Perfect for individuals.",
      features: [
        "2 videos per month",
        "48h Turnaround",
        "Stock Footage included",
        "1 Revision round",
      ],
      buttonText: "Downgrade to Starter",
      highlighted: false,
    },
    {
      title: "Pro",
      price: "$ 999",
      description: "Great for growing brands.",
      features: [
        "8 videos per month",
        "24h Turnaround",
        "Premiuim Stock Assets",
        "Unlimited Revisions",
        "Dedicated Editor",
      ],
      buttonText: "Your Current Plan",
      highlighted: true,
    },
    {
      title: "Agency",
      price: "$ 2499",
      description: "For high-volumes teams.",
      features: [
        "20 videos per month",
        "Priority Support",
        "Custom Motion Graphics",
        "Stack Integration",
        "White-labeling",
      ],
      buttonText: "Upgrade to Agency",
      highlighted: false,
    },
  ];

  return (
    <>
      <section className="text-center my-10">
        <h2 className="text-accent text-2xl font-semibold mb-2">
          Simple, transparent pricing
        </h2>
        <p className="text-accent md:text-slate-600">
          Choose the plan that best fits your content needs. All plans include
          professional editing and fast delivery.
        </p>
      </section>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 max-w-5xl mx-auto my-6">
        {plans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Swiper
          slidesPerView={1.15}
          centeredSlides
          spaceBetween={16}
          initialSlide={plans.findIndex((p) => p.highlighted) || 0}
        >
          {plans.map((plan) => (
            <SwiperSlide key={plan.title}>
              <PlanCard plan={plan} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default PlanCards;
