import { TrackingClient } from "@/components/tracking/TrackingClient";

export default function TrackPage({ params }) {
  return <TrackingClient id={params.trackingId} />;
}
