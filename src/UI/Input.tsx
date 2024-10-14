interface InputProps {
  id: string;
  type: string;
  placeholder?: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  onChange,
  value,
  className,
  id,
  required,
}) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        required={required}
      />
    </div>
  );
};

export default Input;
