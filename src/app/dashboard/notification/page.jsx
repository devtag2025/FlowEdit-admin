"use client";

import { Button } from "@/components/common/Button";
import NotificationBar from "@/components/notification/NotificationBar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const NotificationPage = () => {
  const btns = [
    {
      label: "All",
      type: "all",
    },
    {
      label: "Project Updates",
      type: "project",
    },
    {
      label: "System Alerts",
      type: "system",
    },
    {
      label: "Billing",
      type: "billing",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      type: "project",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Nec nunc aenean orci odio tincidunt odio",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      type: "system",
      time: "2 hours ago",
    },
    {
      id: 3,
      title: "A bibendum arcu faucibus in. Morbi in",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      type: "billing",
      time: "2 hours ago",
    },
    {
      id: 4,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      type: "other",
      time: "2 hours ago",
    },
    {
      id: 5,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      type: "billing",
      time: "2 hours ago",
    },
    {
      id: 6,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      type: "system",
      time: "2 hours ago",
    },
    {
      id: 7,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      type: "other",
      time: "2 hours ago",
    },
  ];

  const [active, setActive] = useState("All");

  const activeBtn = btns.find((b) => b.label === active);

  const filteredNotifications =
    activeBtn?.type === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeBtn?.type);

  return (
    <main className="min-h-screen bg-secondary px-3 md:px-8 py-5 pb-10 ">
      <h1 className="text-accent font-semibold text-2xl md:text-3xl">
        Notifications
      </h1>

      {btns.map((btn) => (
        <Button
          key={btn.label}
          onClick={() => setActive(btn.label)}
          className={`text-sm px-2 md:px-4 py-1 rounded-lg mr-1 md:mr-3 my-4 md:my-8  ${
            active === btn.label
              ? `bg-primary text-white`
              : `bg-tertiary text-accent`
          }`}
        >
          {btn.label}
        </Button>
      ))}

      <section className="flex justify-between items-center border border-slate-400 b-2 rounded-2xl p-4 md:p-6 gap-2">
        <div className="flex flex-col">
          <h3 className="text-accent font-semibold text-xl md:text-2xl mb-2">
            Important Updates
          </h3>
          <p className="text-accent text-xs md:text-lg">
            Choose the plan that best fits your content needs. All plans include
            professional editing and fast delivery.
          </p>
        </div>

        <Link href="/dashboard/service">
          <ChevronRight className="flex items-center text-accent w-6 h-6 md:w-10 md:h-10 " />
        </Link>
      </section>

      <NotificationBar notifications={filteredNotifications} />
    </main>
  );
};

export default NotificationPage;
