"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 text-white focus:border-red-500 focus:outline-none disabled:opacity-60";
const labelClass = "mb-1.5 block text-sm font-medium text-zinc-300";
const hintClass = "text-xs";
const linkClass = "text-red-400 hover:underline disabled:opacity-60";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  useEffect(() => {
    if (session) router.replace("/account");
  }, [session, router]);

  const [sessionChecked, setSessionChecked] = useState(false);
  if (!sessionLoading && !sessionChecked) setSessionChecked(true);

  if (!sessionChecked || session) return null;

  const nameTooShort =
    isRegistering &&
    name.trim().length > 0 &&
    name.trim().length < MIN_NAME_LENGTH;
  const passwordTooShort =
    isRegistering &&
    password.length > 0 &&
    password.length < MIN_PASSWORD_LENGTH;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    setErrorMessage("");

    if (isRegistering) {
      if (name.trim().length < MIN_NAME_LENGTH) {
        setErrorMessage(
          `Username must be at least ${MIN_NAME_LENGTH} characters.`,
        );
        return;
      }
      if (password.length < MIN_PASSWORD_LENGTH) {
        setErrorMessage(
          `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
        );
        return;
      }
    }

    setIsPending(true);

    const fetchOptions = {
      onSuccess: () => router.push("/account"),
      onError: (ctx: { error: { message?: string } }) =>
        setErrorMessage(
          ctx.error.message || "Something went wrong. Please try again.",
        ),
    };

    try {
      if (isRegistering) {
        await authClient.signUp.email({
          email,
          password,
          name: name.trim(),
          fetchOptions,
        });
      } else {
        await authClient.signIn.email({ email, password, fetchOptions });
      }
    } catch {
      setErrorMessage(
        "Couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-white">
          {isRegistering ? "Create an account" : "Log in"}
        </h1>
        <p className="mt-2 mb-8 text-zinc-400">
          {isRegistering
            ? "Choose an email, username, and password."
            : "Wecome back."}
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-900 bg-red-950 px-3.5 py-3 text-sm text-red-300"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
              className={inputClass}
            />
          </div>

          {isRegistering && (
            <div>
              <label htmlFor="name" className={labelClass}>
                Username
              </label>
              <input
                id="name"
                type="text"
                autoComplete="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={MIN_NAME_LENGTH}
                aria-describedby="name-hint"
                disabled={isPending}
                className={inputClass}
              />
              <p
                id="name-hint"
                className={`${hintClass} mt-1.5 ${
                  nameTooShort ? "text-red-400" : "text-zinc-500"
                }`}
              >
                {nameTooShort
                  ? `Too short. Usernames need to be at least ${MIN_NAME_LENGTH} characters.`
                  : `At least ${MIN_NAME_LENGTH} characters.`}
              </p>
            </div>
          )}

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isRegistering ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={isRegistering ? MIN_PASSWORD_LENGTH : undefined}
              aria-describedby={isRegistering ? "password-hint" : undefined}
              disabled={isPending}
              className={inputClass}
            />
            <div className="mt-1.5 flex items-start justify-between gap-4">
              {isRegistering ? (
                <p
                  id="password-hint"
                  className={`${hintClass} ${
                    passwordTooShort ? "text-red-400" : "text-zinc-500"
                  }`}
                >
                  {passwordTooShort
                    ? `Too short. Passwords need to be at least ${MIN_PASSWORD_LENGTH} characters.`
                    : `At least ${MIN_PASSWORD_LENGTH} characters.`}
                </p>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className={`${hintClass} shrink-0 ${linkClass}`}
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-500 disabled:opacity-60"
          >
            {isPending ? "Please wait" : isRegistering ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          {isRegistering ? "Already have an account? " : "New user? "}
          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMessage("");
            }}
            className={linkClass}
          >
            {isRegistering ? "Log in" : "Create an account"}
          </button>
        </p>
      </div>
    </div>
  );
}
