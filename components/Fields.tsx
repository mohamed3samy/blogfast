import { useId } from 'react';

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-neutral-900 placeholder:text-neutral-400 focus:border-fancy-yellow focus:outline-none focus:ring-fancy-yellow text-base';

const Label = ({ id, children }: { id: string; children: React.ReactNode }) => {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-bold text-neutral-700 md:text-base"
    >
      {children}
    </label>
  );
};

export const TextField = ({
  label,
  children,
  type = 'text',
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> & {
  label?: string;
  children?: React.ReactNode;
}) => {
  let id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
      {children}
    </div>
  );
};

export const TextArea = ({
  label,
  children,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id'> & {
  label?: string;
  children?: React.ReactNode;
}) => {
  let id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <textarea id={id} className={formClasses} {...props} />
      {children}
    </div>
  );
};
