"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { isRateLimited } from "@/lib/rateLimit";

function getHash(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// Get client IP helper
async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headersList.get("x-real-ip") || "127.0.0.1";
}

export async function loginAdmin(prevState: any, formData: FormData) {
  const ip = await getClientIp();

  // 1. Rate Limiting: max 5 login attempts per minute per IP
  if (isRateLimited(`login_${ip}`, 5, 60 * 1000)) {
    return { error: "Demasiados intentos de acceso. Por favor, espera un minuto." };
  }

  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // 2. Prevent login if not configured in the environment
  if (!adminPassword) {
    console.error("[SECURITY WARNING] ADMIN_PASSWORD is not set in the environment. Login is disabled.");
    return { error: "El acceso no está configurado en el servidor." };
  }

  if (!password) {
    return { error: "La contraseña es obligatoria." };
  }

  const enteredHash = getHash(password);
  const correctHash = getHash(adminPassword);

  if (enteredHash !== correctHash) {
    return { error: "Contraseña incorrecta. Inténtalo de nuevo." };
  }

  // 3. Set the cookie with high-security attributes
  const cookieStore = await cookies();
  cookieStore.set("admin_session", correctHash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Strict sameSite prevents CSRF entirely
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Redirect to admin panel
  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/");
}
