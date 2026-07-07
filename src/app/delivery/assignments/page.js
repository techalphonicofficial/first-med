import { redirect } from "next/navigation";

export default function DeliveryAssignmentsRedirect() {
  // Redirect to the implemented orders dashboard based on the updated structure
  redirect("/delivery/orders");
}
