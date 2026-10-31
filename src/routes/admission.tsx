import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/AppShell";

export const Route = createFileRoute("/admission")({
  head: () => ({
    meta: [
      { title: "Admission — Manager Edu" },
      { name: "description", content: "Manager Edu admission module for schools." },
      { property: "og:title", content: "Admission — Manager Edu" },
      { property: "og:description", content: "Manager Edu admission module for schools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdmissionPage,
});

function AdmissionPage() {
  return <ModulePage title="Admission" stats={[["Applications", "318"], ["Approved", "204"], ["Pending", "86"], ["Seats Left", "64"]] as [string, string, string?][]} panels={[{"title": "Recent Applications", "rows": [["Riya Sharma — Grade 1", "Pending"], ["Kabir Mehta — Grade 6", "Approved"], ["Ananya Rao — Grade 9", "Interview"]]}, {"title": "By Grade", "rows": [["Pre-primary", "92"], ["Primary", "131"], ["Secondary", "95"]]}] as { title: string; rows: [string, string][] }[]} />;
}
