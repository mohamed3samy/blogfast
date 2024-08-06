import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonProps = {
  invert?: boolean;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
);

const Button = ({
  invert = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  className = cn(
    'inline-flex justify-center items-center rounded-full px-4 py-1.5 text-sm md:tracking-wide font-semibold transition',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
    className,
  );

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    );
  }

  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  );
};

export default Button;
