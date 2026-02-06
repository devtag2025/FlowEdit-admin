"use client";
import React from "react";
import { workflowSteps } from "@/utils/workflowSteps";

const ProjectWorkflow = ({ currentStep }) => {
  return (
    <div className="w-full py-4 md:py-8">
      <div className="flex items-start w-full gap-6 overflow-x-auto scrollbar-hide">
        {workflowSteps.map((step) => {
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="pt-2 flex flex-col items-center flex-shrink-0 w-[140px] md:w-auto md:flex-1"
            >
              <div
                className={`px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 text-center ${
                  isActive
                    ? "bg-primary text-white shadow-lg ring-8 ring-gray-300"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.label}
              </div>

              <div className="flex justify-center gap-2 mt-6 w-full flex-nowrap">
                {step.roles.map((role, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center  text-xs md:text-sm text-white font-bold transition-all duration-300 opacity-40 ${
                        role.color
                      } ${
                        isActive && role.role.includes("Primary")
                          ? "ring-[6px] ring-gray-500/50 opacity-60"
                          : ""
                      }`}
                    >
                      {role.name}
                    </div>

                    <span
                      className={`text-[9px] md:font-semibold uppercase text-center leading-tight max-w-[80px] text-slate-400`}
                    >
                      {role.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectWorkflow;
