import { ChevronDown } from "lucide-react";
import { cx } from "@/lib/cx";

const controlBase =
  "w-full rounded-md border border-line bg-white px-3.5 text-[0.95rem] text-ink shadow-[0_1px_2px_rgba(18,61,42,0.04)] transition-colors placeholder:text-muted/60 focus:border-moss focus:outline-none";

type FieldShellProps = {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
};

function FieldShell({ id, label, className, children }: FieldShellProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.85rem] font-medium text-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  wrapperClassName?: string;
};

export function TextField({
  id,
  label,
  wrapperClassName,
  className,
  ...props
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} className={wrapperClassName}>
      <input id={id} name={id} className={cx(controlBase, "h-11", className)} {...props} />
    </FieldShell>
  );
}

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  wrapperClassName?: string;
};

export function SelectField({
  id,
  label,
  wrapperClassName,
  className,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} className={wrapperClassName}>
      <div className="relative">
        <select
          id={id}
          name={id}
          className={cx(controlBase, "h-11 appearance-none pr-10", className)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  );
}

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  wrapperClassName?: string;
};

export function TextAreaField({
  id,
  label,
  wrapperClassName,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} className={wrapperClassName}>
      <textarea
        id={id}
        name={id}
        className={cx(controlBase, "resize-y py-3", className)}
        {...props}
      />
    </FieldShell>
  );
}
