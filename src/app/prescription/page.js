import { redirect } from "next/navigation";

export default function PrescriptionRedirectPage() {
  // Redirect singular /prescription to plural /prescriptions to match ROUTES.md
  redirect("/prescriptions");
}
