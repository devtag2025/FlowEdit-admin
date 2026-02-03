export const workflowSteps = [
  {
    id: "submitted",
    label: "Submitted",
    roles: [{ name: "SM", role: "Client", color: "bg-[#5C6BC0]" }],
  },
  {
    id: "processing",
    label: "Processing",
    roles: [
      { name: "JC", role: "Offline Editor", color: "bg-[#EF5350]" },
      { name: "AL", role: "Primary Editor", color: "bg-[#26A69A]" },
      { name: "TD", role: "Finishing Editor", color: "bg-[#AB47BC]" },
    ],
  },
  {
    id: "review",
    label: "Review",
    roles: [
      { name: "AD", role: "Reviewer", color: "bg-[#FFA726]" },
      { name: "SM", role: "Client", color: "bg-[#5C6BC0]" },
    ],
  },
  {
    id: "revision",
    label: "Revision",
    roles: [{ name: "TD", role: "Finishing Editor", color: "bg-[#AB47BC]" }],
  },
  {
    id: "completed",
    label: "Completed",
    roles: [{ name: "TD", role: "Finishing Editor", color: "bg-[#AB47BC]" }],
  },
  {
    id: "published",
    label: "Published",
    roles: [{ name: "AD", role: "Reviewer", color: "bg-[#FFA726]" }],
  },
];
