"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) return <div className="p-12 text-center text-slate-500">Loading profile</div>;
  
  if (!session) return null; 

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Account Settings</h1>
          <p className="text-slate-600">Manage your profile.</p>
        </div>

        <button
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push("/"),
              }
            });
          }}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-slate-500 mb-1">Display Name</label>
            <input
              type="text"
              defaultValue={session.user.name}
              disabled
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-900 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-500 mb-1">Email Address</label>
            <input
              type="email"
              defaultValue={session.user.email}
              disabled
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-900 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}