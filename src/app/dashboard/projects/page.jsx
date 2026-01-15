"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Play,
  Share2,
  Download,
  Calendar,
  ExternalLink,
  Send,
  AlertCircle,
  MessageSquare,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const page = () => {
  const [note, setNote] = useState("");

  const project = {
    title: "Summer Campaign Promo",
    status: "Review",
    date: "Oct 25, 2023",
    description:
      "Upbeat summer vibes, fast cuts, use the provided logo overlay.",
    platform: "Instagram Reels",
    sourceFiles: "https://drive.google.com/...",
  };

  const messages = [
    {
      id: 1,
      user: "Sarah",
      role: "Editor",
      time: "7:00 PM",
      message: "First draft is ready for review!",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 2,
      user: "Marcus",
      role: null,
      time: "7:35 PM",
      message: "Looking good, just a few tweaks needed on the outro.",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      isUser: true,
    },
  ];

  const handleSendNote = () => {
    if (note.trim()) {
      alert(`Note sent: ${note}`);
      setNote("");
    }
  };
  return (
    <div className="min-h-screen bg-secondary  md:p-8">
      <Link href="/dashboard">
        <div className="flex gap-2 items-center justify-start">
          <ArrowLeft className="text-accent pb-2" />
          <h1 className="text-md font-medium text-accent mb-2">
            Back to Dashboard
          </h1>
        </div>
      </Link>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-[1fr_500px] h-full ">
          <div className="relative   ">
            <img
              src="https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg"
              alt="Project preview"
              className="w-full h-full object-cover rounded-l-3xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-gray-700 ml-1 fill-gray-700" />
              </button>
            </div>


            <div className="absolute bottom-0 left-0 right-0 bg-accent/95 backdrop-blur p-6 flex items-center justify-between rounded-bl-3xl">
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-tertiary h-full overflow-y-auto flex flex-col rounded-r-3xl">
            <div className="p-6 space-y-6 flex-1">
              <div className="flex items-center justify-between">
                <Badge className="bg-primary text-white border-0 font-semibold px-3 py-1">
                  {project.status}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-accent/60">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-accent mb-4">
                  {project.title}
                </h1>
                <p className="text-accent/70 text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-accent/60" />
                  <span className="text-accent/80">{project.platform}</span>
                </div>
                <a
                  href={project.sourceFiles}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Source Files
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="border-t border-accent/10 pt-6">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-accent text-lg">
                    Notes & Activity
                  </h3>
                </div>

                <div className="space-y-6 mb-6">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${
                        msg.isUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={msg.avatar} alt={msg.user} />
                        <AvatarFallback className="bg-primary text-white">
                          {msg.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div
                        className={`flex-1 ${
                          msg.isUser ? "items-end" : "items-start"
                        } flex flex-col`}
                      >
                        <div
                          className={`flex items-center gap-2 mb-2 ${
                            msg.isUser ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <span className="text-sm font-semibold text-accent">
                            {msg.user}{" "}
                            {msg.role && (
                              <span className="text-accent/60">
                                ({msg.role})
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-accent/50">
                            {msg.time}
                          </span>
                        </div>
                        <div
                          className={`px-5 py-3 rounded-2xl max-w-md ${
                            msg.isUser
                              ? "bg-primary text-white rounded-br-md"
                              : "bg-white text-accent rounded-bl-md border border-accent/10"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-accent/10 bg-white p-6 space-y-3">
              <Textarea
                placeholder="Type a note to your editor..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-white border-accent/20 text-accent placeholder:text-accent/40 focus:border-primary focus:ring-primary resize-none min-h-20"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-accent/50">Press Enter to send</p>
                <Button
                  variant="ghost"
                  className="text-danger hover:bg-danger/10 hover:text-danger gap-2 font-medium"
                >
                  <AlertCircle className="w-4 h-4" />
                  Request Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
