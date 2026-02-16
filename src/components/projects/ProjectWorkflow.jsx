"use client";
import React, { useState, useEffect } from "react";
import { workflowSteps } from "@/utils/workflowSteps";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const ProjectWorkflow = ({ currentStep }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-trigger")) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handlePrimaryClick = (stepId, role, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();

    setDropdownPosition({
      top: rect.bottom + 8,
      left: rect.left,
    });

    setActiveDropdown((prev) =>
      prev?.stepId === stepId && prev?.roleName === role.name
        ? null
        : { stepId, roleName: role.name, options: role.options },
    );
  };

  const handleOptionSelect = (stepId, roleName, option) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [stepId]: { ...prev[stepId], [roleName]: option },
    }));
    setActiveDropdown(null);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-start w-full gap-6 relative pb-6 overflow-x-auto scrollbar-hide">
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
                {step.roles.map((role, idx) => {
                  const isPrimary = role.role.includes("Primary");
                  const selectedName =
                    selectedRoles?.[step.id]?.[role.name] ?? role.name;
                  const isDropdownActive =
                    activeDropdown?.stepId === step.id &&
                    activeDropdown?.roleName === role.name;

                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-3 relative"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`dropdown-trigger w-12 h-12 rounded-full flex items-center justify-center text-xs md:text-sm text-white font-bold transition-all duration-300 opacity-40 ${role.color} ${
                              isActive && isPrimary
                                ? "ring-4 ring-gray-500/50 opacity-60 cursor-pointer hover:opacity-100 hover:ring-0"
                                : ""
                            } ${
                              role.options
                                ? "cursor-pointer hover:scale-110"
                                : ""
                            }`}
                            onClick={(e) =>
                              isPrimary || role.options
                                ? handlePrimaryClick(step.id, role, e)
                                : null
                            }
                          >
                            {getInitials(selectedName)}
                          </div>
                        </TooltipTrigger>

                        <TooltipContent
                          side="top"
                          align="center"
                          className={`max-w-xs text-xs ${
                            isActive && isPrimary ? "opacity-100" : "opacity-30"
                          }`}
                        >
                          {selectedName} - {role.role}
                        </TooltipContent>
                      </Tooltip>

                      {isDropdownActive && role.options && dropdownPosition && (
                        <div
                          className="fixed bg-white border shadow-lg rounded-lg z-[9999] w-48"
                          style={{
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                          }}
                        >
                          {role.options.map((option, i) => (
                            <div
                              key={i}
                              onClick={() =>
                                handleOptionSelect(step.id, role.name, option)
                              }
                              className="px-3 py-3 cursor-pointer hover:bg-gray-100"
                            >
                              <div className="flex gap-2 text-sm items-center">
                                <span
                                  className={`flex items-center justify-center w-7 h-7 rounded-full text-white text-[10px] font-semibold ${role.color}`}
                                >
                                  {getInitials(option)}
                                </span>
                                {option}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <span className="text-[8px] md:font-semibold uppercase text-center leading-tight max-w-20 text-slate-400">
                        {role.role}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default ProjectWorkflow;
