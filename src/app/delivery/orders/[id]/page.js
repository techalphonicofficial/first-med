import { DemoPanel } from "@/components/dashboard/DemoPanel";

export default function DeliveryOrderDetailPage({ params }) {
  return <DemoPanel title={`Delivery ${params.id}`} eyebrow="Fast delivery" items={[
    { label: "Pickup", title: "Sector 21 Pharmacy", text: "Vendor pickup address with navigation support." },
    { label: "Customer", title: "Home delivery", text: "Customer information and masked phone UI." },
    { label: "Actions", title: "Delivered", text: "Accept, picked up, out for delivery and delivered." }
  ]} />;
}
