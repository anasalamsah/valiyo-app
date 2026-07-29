import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonBaseProps = {
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "sm";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/20",
  outline: "bg-surface text-text border border-border hover:border-primary/40",
  ghost: "bg-transparent text-text hover:bg-black/5",
};

const sizeStyles: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2 text-xs",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if ("href" in props && props.href) {
      const { href, ...anchorProps } = props;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
