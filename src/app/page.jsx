import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FlowEditLandingPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);}
