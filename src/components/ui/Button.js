import Link from "next/link";

export function Button({ href, className = "", children, ...props }) {
  const classes = `blue-button px-5 py-2.5 ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
