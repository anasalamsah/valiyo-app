type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`${alignClass} ${className ?? ""}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-semibold text-text sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed text-text-muted ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
