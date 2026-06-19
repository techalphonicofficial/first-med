import { DemoPanel } from "@/components/dashboard/DemoPanel";

export default function VendorOrderDetailPage({ params }) {
  return <DemoPanel title={`Vendor order ${params.id}`} eyebrow="Vendor portal" items={[
    { label: "Action", title: "Accept", text: "Primary vendor decision action." },
    { label: "Action", title: "Reject", text: "Reject workflow placeholder." },
    { label: "Action", title: "Mark ready", text: "Signals delivery assignment." }
  ]} />;
}
