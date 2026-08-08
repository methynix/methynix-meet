import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/axiosInstance'; // Direct API call or via service layer
import Input from '../atoms/Input';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      login(response.data.token, response.data.data);
      toast.success(`Welcome back, ${response.data.data.name}! 🚀`);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid Coordinates (Credentials incorrect)');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="holo-card p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-orbitron text-center mb-6 text-neon-cyan">
          ACCESS TERMINAL
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
            label="Email" 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            error={errors.email}
          />
          <Input 
            label="Password" 
            type="password" 
            {...register('password', { required: 'Password is required' })} 
            error={errors.password}
          />

          <button 
            disabled={isSubmitting}
            className="w-full mt-4 bg-neon-purple hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(188,19,254,0.4)] transition disabled:opacity-50"
          >
            {isSubmitting ? 'Scanning...' : 'Initialize Session'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          New to the system? <Link to="/register" className="text-neon-cyan hover:underline">Register Identity</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;