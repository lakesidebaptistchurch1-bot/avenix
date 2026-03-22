type Props = {
  kind?: "error" | "info" | "success";
  children: React.ReactNode;
  className?: string; // ✅ ADD THIS
};

export function Alert({ kind = "error", children, className = "" }: Props) {
  const styles =
    kind === "success"
      ? "border-emerald-600/20 bg-emerald-50 text-emerald-800"
      : kind === "info"
      ? "border-blue-700/20 bg-blue-50 text-blue-800"
      : "border-red-700/20 bg-red-50 text-red-800";

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${styles} ${className}`}
    >
      {children}
    </div>
  );
}