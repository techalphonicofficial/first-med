import { redirect } from "next/navigation";

export default function VendorRootPage() {
  // Redirect the base /vendor route to the vendor dashboard
  redirect("/vendor/dashboard");
}
