import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function checkAccess() {
  try {
    const session = await auth();
    const userName = session?.user?.name;

    if (!userName) {
      redirect("/admin-login");
    } else {
      return session.user;
    }
  } catch (error) {
    console.error("Error while checking admin status:", error);
    redirect("/admin-login");
  }
}
