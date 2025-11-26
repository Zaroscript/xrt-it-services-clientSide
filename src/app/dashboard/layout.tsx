// src/app/(protected)/profile/page.tsx
"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
