"use client";
import React, { useState } from "react";
import {
  X,
  Check,
  TextAlignJustify,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  LinkIcon,
  ImageIcon,
  Bold,
  Italic,
  UnderlineIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import toast from "react-hot-toast";
import { useCreateBroadcast } from "@/hooks/useBroadcast";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";

const NewBroadcast = ({ onCancel }) => {
  const [isScheduled, setIsScheduled]   = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [formData, setFormData]         = useState({
    title:      "",
    recipients: "All",
    priority:   "Active",
  });

  const { mutate: createBroadcast, isPending } = useCreateBroadcast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write your broadcast message here...",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Link,
    ],
    content: "",
    immediatelyRender: false,
  });

  const handleSubmit = () => {
    const content = editor?.getHTML() || "";
    const isEmpty = !content || content === "<p></p>" || content.trim() === "";

    if (!formData.title.trim())  return toast.error("Title is required");
    if (isEmpty)                  return toast.error("Message is required");
    if (isScheduled && (!scheduleDate || !scheduleTime)) {
      return toast.error("Please select a date and time");
    }

    createBroadcast(
      {
        ...formData,
        content,
        isScheduled,
        scheduleDate,
        scheduleTime,
      },
      {
        onSuccess: () => onCancel(),
      }
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">New Broadcast</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-accent/5 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-accent" />
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="font-bold text-accent mb-2 block">Title</label>
          <Input
            placeholder="Enter broadcast title..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-tertiary border-accent/20 h-10 font-medium"
          />
        </div>

        {/* Recipients */}
        <div>
          <label className="font-bold text-accent mb-2 block">Recipients</label>
          <Select
            value={formData.recipients}
            onValueChange={(value) =>
              setFormData({ ...formData, recipients: value })
            }
          >
            <SelectTrigger className="w-full h-12 border-accent/20 text-accent transition-all">
              <SelectValue placeholder="Select recipient..." />
            </SelectTrigger>
            <SelectContent className="border-accent/20 shadow-lg p-1">
              {["All", "Management", "Contractors", "Clients"].map((option) => {
                const isSelected = formData.recipients === option;
                return (
                  <SelectItem
                    key={option}
                    value={option}
                    className={`flex items-center gap-3 px-2 py-2 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "text-accent hover:bg-accent/5"
                    }`}
                  >
                    {option}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div>
          <label className="font-bold text-accent mb-2 block">Priority</label>
          <Select
            value={formData.priority}
            onValueChange={(value) =>
              setFormData({ ...formData, priority: value })
            }
          >
            <SelectTrigger className="w-full h-12 border-accent/20 text-accent transition-all">
              <SelectValue placeholder="Select priority..." />
            </SelectTrigger>
            <SelectContent className="border-accent/20 shadow-lg p-1">
              {["Immediate", "Scheduled", "Active", "Admin"].map((option) => {
                const isSelected = formData.priority === option;
                return (
                  <SelectItem
                    key={option}
                    value={option}
                    className={`flex items-center gap-3 px-2 py-2 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "text-accent hover:bg-accent/5"
                    }`}
                  >
                    {option}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Schedule Toggle */}
        <div>
          <label className="font-bold text-accent mb-2 block">Schedule</label>
          <button
            type="button"
            onClick={() => setIsScheduled(!isScheduled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
              isScheduled
                ? "bg-primary/10 border-primary text-primary"
                : "border-accent/20 text-accent hover:bg-accent/5"
            }`}
          >
            {isScheduled ? "Scheduled" : "Send Now"}
          </button>
        </div>

        {/* Schedule Date/Time */}
        {isScheduled && (
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm text-accent/60 mb-1 block">Date</label>
              <Input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="bg-tertiary border-accent/20 text-accent h-10"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-accent/60 mb-1 block">Time</label>
              <Input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="bg-tertiary border-accent/20 text-accent h-10"
              />
            </div>
          </div>
        )}

        {/* Content Editor */}
        <div>
          <label className="font-bold text-accent mb-2 block">Content</label>
          <div className="rounded-xl border border-accent/10 bg-tertiary/80 p-3">

            {/* Toolbar */}
            <div className="flex gap-2 lg:gap-3 border-b border-accent/10 text-accent pb-2 flex-wrap">
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`cursor-pointer p-1 rounded transition-colors ${
                  editor?.isActive("bold") ? "bg-primary/20 text-primary" : "hover:bg-accent/10"
                }`}
              >
                <Bold className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`cursor-pointer p-1 rounded transition-colors ${
                  editor?.isActive("italic") ? "bg-primary/20 text-primary" : "hover:bg-accent/10"
                }`}
              >
                <Italic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                className={`cursor-pointer p-1 rounded transition-colors ${
                  editor?.isActive("underline") ? "bg-primary/20 text-primary" : "hover:bg-accent/10"
                }`}
              >
                <UnderlineIcon className="w-4 h-4" />
              </button>

              <div className="w-px bg-accent/10 mx-1" />

              <button
                type="button"
                onClick={() => editor?.chain().focus().setTextAlign("left").run()}
                className="cursor-pointer p-1 rounded hover:bg-accent/10 transition-colors"
              >
                <TextAlignStart className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => editor?.chain().focus().setTextAlign("center").run()}
                className="cursor-pointer p-1 rounded hover:bg-accent/10 transition-colors"
              >
                <TextAlignCenter className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => editor?.chain().focus().setTextAlign("right").run()}
                className="cursor-pointer p-1 rounded hover:bg-accent/10 transition-colors"
              >
                <TextAlignEnd className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
                className="cursor-pointer p-1 rounded hover:bg-accent/10 transition-colors"
              >
                <TextAlignJustify className="w-4 h-4" />
              </button>

              <div className="w-px bg-accent/10 mx-1" />

              <button
                type="button"
                onClick={() => {
                  const url = prompt("Enter image URL");
                  if (url) editor?.chain().focus().setImage({ src: url }).run();
                }}
                className="cursor-pointer p-1 rounded hover:bg-accent/10 transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const url = prompt("Enter URL");
                  if (url) editor?.chain().focus().setLink({ href: url }).run();
                }}
                className="cursor-pointer p-1 rounded hover:bg-accent/10 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Editor */}
            <EditorContent
              editor={editor}
              className="mt-3 min-h-[150px] text-accent text-sm lg:text-base focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-row pt-2 justify-between">
        <Button
          type="button"
          className="bg-accent/10 text-primary rounded-xl hover:bg-accent/40 hover:text-white"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 px-4"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : isScheduled ? (
            <>
              Schedule Broadcast
              <Check className="w-4 h-4 text-white" />
            </>
          ) : (
            <>
              Send Broadcast
              <Check className="w-4 h-4 text-white" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewBroadcast;