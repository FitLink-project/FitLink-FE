import clsx from 'clsx';
import checkDefault from '../assets/Icon/Check-Default.png';
import checkClick from '../assets/Icon/Check-Click.png';
import checkRed from '../assets/Icon/Check-red.png';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  className?: string | string[] | (string | undefined | null | false)[];
}

export default function Checkbox({
  checked,
  onChange,
  error = false,
  className,
}: CheckboxProps) {
  const getCheckboxImage = () => {
    if (error && !checked) {
      return checkRed;
    }
    if (checked) {
      return checkClick;
    }
    return checkDefault;
  };

  return (
    <div className="relative mr-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={clsx(
          'cursor-pointer',
          'transition-all',
          'flex',
          'items-center',
          'justify-center',
          className
        )}
        style={{ width: '17.19px', height: '17.19px' }}
      >
        <img
          src={getCheckboxImage()}
          alt={checked ? 'Checked' : 'Unchecked'}
          style={{ width: '17.19px', height: '17.19px' }}
        />
      </button>
    </div>
  );
}

