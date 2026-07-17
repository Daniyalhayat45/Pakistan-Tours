"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mountain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-onyx px-4">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-charcoal p-8">
        <div className="mb-8 flex flex-col items-center text-white">
          <Mountain className="h-8 w-8 text-gold" />
          <h1 className="mt-3 font-display text-xl font-bold">Admin Login</h1>
          <p className="text-sm text-white/50">Pakistan Tourism Gateway</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border-white/20 bg-white/5 text-white" />
          </div>
          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="border-white/20 bg-white/5 text-white" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={pending} className="w-full" size="lg">
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
