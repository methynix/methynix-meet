import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-neon-cyan mb-2 text-sm uppercase tracking-wider">{label}</label>}
      <input
        ref={ref}
        className={`w-full bg-black/40 border ${error ? 'border-neon-red' : 'border-glass-border'} 
        rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:shadow-[0_0_10px_rgba(188,19,254,0.3)] transition`}
        {...props}
      />
      {error && <p className="text-neon-red text-xs mt-1">{error.message}</p>}
    </div>
  );
});

export default Input;