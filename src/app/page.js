"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const token = null;

  if (!token) {
    router.push("/login");
    return null;
  } else {
    router.push("/checkToken");
    return null;
  }
}
