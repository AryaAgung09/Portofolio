"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Loader2,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useId, useState } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "mt-2 w-full rounded-xl border border-white/12 bg-white/[0.05] px-3.5 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/40 hover:border-white/20 focus:border-accent focus:bg-white/[0.08]";

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const formId = useId();
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [sentName, setSentName] = useState("");
  const [demo, setDemo] = useState(false);
  const [copied, setCopied] = useState(false);

  const fieldId = (field: string) => `${formId}-${field}`;
  const errorId = (field: string) => `${formId}-${field}-error`;

  const update = (field: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "company") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setServerMessage("");
    }
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (values.name.trim().length < 2) {
      next.name = "Nama minimal 2 karakter.";
    }

    if (!emailPattern.test(values.email.trim())) {
      next.email = "Masukkan alamat email yang valid.";
    }

    if (values.message.trim().length < 10) {
      next.message = "Ceritakan sedikit lebih detail (minimal 10 karakter).";
    }

    return next;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(fieldId(firstField))?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          company: values.company,
        }),
      });

      const data: { ok?: boolean; error?: string; demo?: boolean } =
        await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error ?? "Pesan gagal dikirim. Coba lagi sebentar lagi.",
        );
      }

      setSentName(values.name.trim().split(" ")[0] ?? "");
      setDemo(Boolean(data.demo));
      setStatus("success");
      setValues({ name: "", email: "", message: "", company: "" });
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan yang tidak terduga.",
      );
    }
  };

  return (
    <section id="kontak" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-accent p-6 text-[#0a0c08] sm:rounded-[2.5rem] sm:p-10 lg:p-14">
          {/* Tekstur & tanda sudut */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(10,12,8,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,12,8,0.35) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 80% 70% at 80% 20%, black, transparent 75%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-black/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-14 h-56 w-56 rounded-full border border-black/10"
          />

          <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            {/* Info */}
            <div>
              <SectionHeading
                inverted
                index="06"
                label="Kontak"
                title={
                  <>
                    Punya ide?
                    <br />
                    Mari kita mulai.
                  </>
                }
                description="Saya membalas setiap pesan yang masuk—biasanya dalam 1–2 hari kerja. Tidak perlu formal, cukup ceritakan apa yang ingin kamu bangun."
              />

              <div className="mt-9 space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/15 bg-black/[0.045] px-4 py-3.5">
                  <div className="min-w-0">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-black/50">
                      Email
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-0.5 block truncate text-sm font-medium tracking-tight text-black underline-offset-4 hover:underline"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email tersalin" : "Salin alamat email"}
                    title="Salin email"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/20 text-black/65 transition-colors hover:border-black hover:bg-black hover:text-accent"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden />
                    )}
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={profile.phoneHref}
                    className="group rounded-2xl border border-black/15 bg-black/[0.045] px-4 py-3.5 transition-colors hover:bg-black/[0.08]"
                  >
                    <p className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/50">
                      <Phone className="h-2.5 w-2.5" aria-hidden />
                      Telepon
                    </p>
                    <p className="mt-1 text-[13px] font-medium tracking-tight text-black">
                      {profile.phone}
                    </p>
                  </a>

                  <div className="rounded-2xl border border-black/15 bg-black/[0.045] px-4 py-3.5">
                    <p className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/50">
                      <MapPin className="h-2.5 w-2.5" aria-hidden />
                      Lokasi
                    </p>
                    <p className="mt-1 text-[13px] font-medium tracking-tight text-black">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-black/50">
                  Atau temukan saya di
                </span>
                <SocialLinks inverted size="sm" />
              </div>
            </div>

            {/* Form */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-[#08090b] p-5 text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
                />

                <div className="relative flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/40">
                      Formulir pesan
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
                      Ceritakan proyekmu
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.12em] text-white/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {profile.locationShort}
                  </span>
                </div>

                <div className="relative mt-6 min-h-[380px]">
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                        className="flex min-h-[380px] flex-col items-center justify-center text-center"
                        role="status"
                        aria-live="polite"
                      >
                        <motion.span
                          initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 18,
                            delay: 0.06,
                          }}
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground"
                        >
                          <Check className="h-6 w-6" aria-hidden />
                        </motion.span>
                        <h4 className="mt-5 text-2xl font-semibold tracking-tight">
                          Terkirim. Terima kasih{sentName ? `, ${sentName}` : ""}.
                        </h4>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-white/50">
                          Pesanmu sudah masuk. Saya akan membalas lewat email
                          yang kamu tuliskan.
                        </p>

                        {demo ? (
                          <p className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-[10.5px] leading-5 text-amber-100/80">
                            Mode demo aktif: hubungkan Resend lewat variabel
                            lingkungan agar pesan benar-benar terkirim.
                          </p>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => {
                            setStatus("idle");
                            setDemo(false);
                            setSentName("");
                          }}
                          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-white/70 transition-colors hover:border-accent/60 hover:text-accent"
                        >
                          Kirim pesan lain
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        noValidate
                        onSubmit={handleSubmit}
                        initial={false}
                        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor={fieldId("name")}
                              className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/45"
                            >
                              Nama
                            </label>
                            <input
                              id={fieldId("name")}
                              name="name"
                              type="text"
                              autoComplete="name"
                              required
                              maxLength={80}
                              value={values.name}
                              onChange={(event) =>
                                update("name", event.target.value)
                              }
                              aria-invalid={Boolean(errors.name)}
                              aria-describedby={
                                errors.name ? errorId("name") : undefined
                              }
                              placeholder="Nama lengkap"
                              className={cn(
                                inputClass,
                                errors.name && "border-red-400/60",
                              )}
                            />
                            {errors.name ? (
                              <p
                                id={errorId("name")}
                                className="mt-1.5 text-[11px] text-red-300"
                              >
                                {errors.name}
                              </p>
                            ) : null}
                          </div>

                          <div>
                            <label
                              htmlFor={fieldId("email")}
                              className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/45"
                            >
                              Email
                            </label>
                            <input
                              id={fieldId("email")}
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              maxLength={160}
                              value={values.email}
                              onChange={(event) =>
                                update("email", event.target.value)
                              }
                              aria-invalid={Boolean(errors.email)}
                              aria-describedby={
                                errors.email ? errorId("email") : undefined
                              }
                              placeholder="nama@email.com"
                              className={cn(
                                inputClass,
                                errors.email && "border-red-400/60",
                              )}
                            />
                            {errors.email ? (
                              <p
                                id={errorId("email")}
                                className="mt-1.5 text-[11px] text-red-300"
                              >
                                {errors.email}
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor={fieldId("message")}
                            className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/45"
                          >
                            Pesan
                          </label>
                          <textarea
                            id={fieldId("message")}
                            name="message"
                            required
                            rows={6}
                            maxLength={2000}
                            value={values.message}
                            onChange={(event) =>
                              update("message", event.target.value)
                            }
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={
                              errors.message ? errorId("message") : undefined
                            }
                            placeholder="Saya ingin membangun…"
                            className={cn(
                              inputClass,
                              "resize-none leading-6",
                              errors.message && "border-red-400/60",
                            )}
                          />
                          {errors.message ? (
                            <p
                              id={errorId("message")}
                              className="mt-1.5 text-[11px] text-red-300"
                            >
                              {errors.message}
                            </p>
                          ) : (
                            <p className="mt-1.5 text-right font-mono text-[8.5px] tabular-nums text-white/40">
                              {values.message.length} / 2000
                            </p>
                          )}
                        </div>

                        {/* Honeypot: tidak terlihat oleh manusia, diisi bot. */}
                        <div className="hidden" aria-hidden="true">
                          <label htmlFor={fieldId("company")}>Company</label>
                          <input
                            id={fieldId("company")}
                            name="company"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={values.company}
                            onChange={(event) =>
                              update("company", event.target.value)
                            }
                          />
                        </div>

                        <AnimatePresence initial={false}>
                          {status === "error" ? (
                            <motion.p
                              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                              className="flex items-start gap-2 rounded-lg border border-red-400/25 bg-red-400/10 px-3 py-2.5 text-[11px] leading-5 text-red-200"
                              role="alert"
                            >
                              <AlertCircle
                                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                                aria-hidden
                              />
                              <span>
                                {serverMessage} Kamu juga bisa email langsung ke{" "}
                                <a
                                  href={`mailto:${profile.email}`}
                                  className="underline underline-offset-2"
                                >
                                  {profile.email}
                                </a>
                                .
                              </span>
                            </motion.p>
                          ) : null}
                        </AnimatePresence>

                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(198,242,78,0.55)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2
                                className="h-4 w-4 animate-spin"
                                aria-hidden
                              />
                              Mengirim…
                            </>
                          ) : (
                            <>
                              Kirim pesan
                              <Send
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                aria-hidden
                              />
                            </>
                          )}
                        </button>

                        <p className="text-center text-[11px] leading-5 text-white/45">
                          Datamu hanya dipakai untuk membalas pesan ini.
                        </p>

                        <span className="sr-only" aria-live="polite">
                          {status === "submitting"
                            ? "Sedang mengirim pesan"
                            : ""}
                        </span>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <a
                href={`mailto:${profile.email}`}
                className="mt-4 flex flex-col items-start gap-1.5 rounded-2xl border border-black/15 px-4 py-3 text-xs font-medium text-black/70 transition-colors hover:bg-black/[0.06] hover:text-black sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                Lebih suka email langsung?{" "}
                <span className="inline-flex items-center gap-1.5 font-semibold text-black">
                  {profile.email}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
