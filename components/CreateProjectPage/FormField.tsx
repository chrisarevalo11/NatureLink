import { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  inputType: string;
  placeholder: string;
  inputName: string;
  isRequired: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormField({
  label,
  inputType,
  placeholder,
  inputName,
  isRequired,
  handleChange,
}: FormFieldProps): ReactNode {
  return (
    <>
      <label className="label ">
        <span className="label-text text-base-100 whitespace-nowrap">
          {isRequired && <span className="text-red-500">* </span>}
          {label}
        </span>
      </label>
      <input
        type={inputType}
        placeholder={placeholder}
        name={inputName}
        onChange={handleChange}
        required={isRequired}
        className="input input-bordered w-full bg-gray-700 text-base-100"
      />
    </>
  );
}
