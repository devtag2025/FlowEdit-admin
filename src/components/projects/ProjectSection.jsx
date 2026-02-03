"use client";
import React, { useState } from "react";
import { X, Play, ArrowLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectDetails from "./ProjectDetails";
import { Card, CardContent } from "../ui/card";
import { projects } from "@/utils/dashboard";
import Link from "next/link";
import ProjectComments from "./ProjectComments";
import ProjectWorkflow from "./ProjectWorkflow";

function ProjectSection({ projectId }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const project = projects.find((p) => String(p.id) === String(projectId));

  if (!project) {
    return (
      <div className="p-10 text-center text-accent/60">Project not found</div>
    );
  }

  return (
    <Card className="bg-white rounded-3xl">
      <CardContent className="md:px-10 md:py-8">
        <div className="flex flex-col items-start justify-center gap-5">
          <Link href={"/dashboard"}>
            <span className="flex items-center text-slate-500 text-sm md:text-lg">
              <ArrowLeft className="w-4 h-4 md:mt-1 mr-1" /> Back to Dashboard
            </span>
          </Link>

          <h2 className="text-xl md:text-4xl font-semibold my-2">
            {project.name}
          </h2>

          <div className="flex items-center gap-3">
            <span className="bg-slate-200 text-xs md:text-sm border rounded-full px-4 py-1 font-bold">
              {project.platform}
            </span>
            <Badge className="bg-slate-200 text-primary text-xs md:text-sm border px-4 py-1">
              {project.status}
            </Badge>
            <span className="text-xs md:text-sm">
              Updated on {project.lastUpdated}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 h-full">
          <div className="p-3 md:p-6 space-y-4 overflow-hidden">
            <div className="aspect-video bg-slate-black  rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/80" />
              <div className="relative z-10 text-center">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white backdrop-blur rounded-full flex items-center justify-center mb-3 mx-auto cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 md:w-8 md:h-8 ml-1" />
                </div>
                <p className="text-white/80 text-xs md:text-sm">
                  Video preview coming soon
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-sm md:text-lg font-semibold">
                Video Project Version: 5
              </span>

              <Button
                variant="ghost"
                onClick={() => setShowWorkflow(!showWorkflow)}
                className="text-tertiary bg-primary rounded-full text-xs md:text-base hover:bg-accent/5 md:px-5 md:py-6 cursor-pointer"
              >
                Workflow
              </Button>
            </div>

            {showWorkflow && (
              <div className="mt-6">
                <ProjectWorkflow currentStep={project.status.toLowerCase()} />
              </div>
            )}

            <div className="text-sm md:text-base bg-tertiary/60 shadow-lg rounded-xl p-4 border border-accent/20">
              <p className="leading-relaxed">{project.description}</p>

              <div
                onClick={() => setShowDetails((prev) => !prev)}
                className=" mt-1 flex items-center justify-end gap-2 cursor-pointer text-primary font-semibold text-xs md:text-base"
              >
                <span>
                  {showDetails ? "Hide Project Details" : "See Project Details"}
                </span>
                <MoveRight className="h-4 w-4" />
              </div>
            </div>

            {showDetails && (
              <div className="mt-6">
                <ProjectDetails />
              </div>
            )}
          </div>

          <ProjectComments />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectSection;
