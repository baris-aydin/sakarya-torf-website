import { cx } from "@/lib/cx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Checkout uses a tighter measure than the marketing pages. */
  width?: "default" | "narrow";
};

export default function Container({
  children,
  className,
  width = "default",
}: ContainerProps) {
  return (
    <div
      className={cx(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        width === "narrow" ? "max-w-[1040px]" : "max-w-[1264px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
