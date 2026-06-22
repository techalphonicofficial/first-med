import { TrackingClient } from "@/components/tracking/TrackingClient";

export default async function TrackPage({ params }) {
  const { trackingId } = await params;
  return <TrackingClient id={trackingId} />;
}
