export default function Footer() {
  return (
<footer className="border-t border-zinc-200 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-zinc-500">
          Ac {new Date().getFullYear()}{" "}
          <span className="font-medium text-zinc-800">Arya Agung</span>. Dibuat
          dengan <span className="text-indigo-600">Next.js</span> & Tailwind CSS.
        </p>
        <a
          href="#beranda"
          className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-indigo-600"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
            AA
          </span>
          Kembali ke atas
        </a>
      </div>
    </footer>
  );
}
