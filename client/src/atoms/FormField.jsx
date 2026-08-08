import { forwardRef } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const FormField = forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      error,
      required,
      className = '',
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            {label}
            {required && <span className="text-neon-red ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`
              w-full px-4 py-3 rounded-lg
              bg-white/5 border border-white/10
              text-white placeholder-gray-500
              focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan
              transition duration-200
              ${error ? 'border-neon-red focus:border-neon-red focus:ring-neon-red' : ''}
              ${className}
            `}
            {...props}
          />

          {error && (
            <FaExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-red text-sm" />
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-neon-red flex items-center gap-1">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
