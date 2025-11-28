import FormField from "../FormField";
import Input from "../Input";

interface MeasurementInputProps {
  label: string;
  value: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
  unit: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function MeasurementInput({
  label,
  value,
  onChange,
  isError,
  errorMessage,
  unit,
  placeholder = "00.0",
  disabled,
}: MeasurementInputProps) {
  return (
    <FormField
      label={label}
      error={isError}
      errorMessage={errorMessage}
      className="w-full"
      labelClassName="!w-full"
      errorClassName="!w-full"
    >
      <div className="relative w-full">
        <Input
          type="text"
          placeholder={placeholder}
          inputMode="numeric"
          maxLength={3}
          value={value || ""}
          onChange={onChange}
          style={{
            borderColor: isError ? "red" : "#ccc",
          }}
          className="w-full pr-10 text-left placeholder:text-left"
          disabled={disabled}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
          {unit}
        </span>
      </div>
    </FormField>
  );
}
