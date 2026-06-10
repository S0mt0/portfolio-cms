export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-8 py-8 sm:px-12 lg:px-16">
      <div className="border-y border-border/20 py-16">
        <p className="font-sketch text-4xl font-bold text-tomato">Loading...</p>
        <div className="mt-6 h-3 w-64 animate-pulse bg-ink/10" />
        <div className="mt-3 h-3 w-40 animate-pulse bg-sky/20" />
      </div>
    </main>
  );
}
