import { DemoPanel } from "@/components/dashboard/DemoPanel";

export default function VendorProfilePage() {
  return <DemoPanel title="Vendor profile" eyebrow="Vendor portal" items={[
    { label: "Business", title: "FirstMED Plus", text: "Business information and operating hours." },
    { label: "Documents", title: "License files", text: "Document upload slots for pharmacy verification." },
    { label: "Location", title: "Map ready", text: "Vendor location card prepared." }
  ]} />;
}
