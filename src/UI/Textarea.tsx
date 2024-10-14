interface TextareaProps {
  id: string;
  placeholder?: string;
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  className?: string;
  rows?: number;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  onChange,
  value,
  className,
  rows,
  id,
  required,
}) => {
  return (
    <div>
      <textarea
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        rows={rows}
        required={required}
      />
    </div>
  );
};

export default Textarea;
