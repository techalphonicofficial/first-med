import { DemoPanel } from "@/components/dashboard/DemoPanel";

export default async function DeliveryOrderDetailPage({ params }) {
  const { id } = await params;
  return <DemoPanel title={`Delivery ${id}`} eyebrow="Fast delivery" items={[
    { label: "Pickup", title: "Sector 21 Pharmacy", text: "Vendor pickup address with navigation support." },
    { label: "Customer", title: "Home delivery", text: "Customer information and masked phone UI." },
    { label: "Actions", title: "Delivered", text: "Accept, picked up, out for delivery and delivered." }
  ]} />;
}
