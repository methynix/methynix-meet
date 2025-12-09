import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/axiosInstance';
import Input from '../atoms/Input';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      login(response.data.token, response.data.data);
      toast.success('Identity Verified. Welcome to the Network. 🌌');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Registration Failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="holo-card p-8 w-full max-w-md border-neon-cyan/30"
      >
        <h2 className="text-3xl font-orbitron text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
          NEW IDENTITY
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
            label="Full Name" 
            {...register('name', { required: 'Name is required', minLength: 3 })} 
            error={errors.name}
          />
          
          <Input 
            label="Email" 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            error={errors.email}
          />
          
          <Input 
            label="Password" 
            type="password" 
            {...register('password', { required: 'Password is required', minLength: 6 })} 
            error={errors.password}
          />

          <button 
            disabled={isSubmitting}
            className="w-full mt-4 bg-neon-cyan text-black font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:bg-cyan-400 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Upload Identity'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already in the system? <Link to="/login" className="text-neon-purple hover:underline">Access Terminal</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;