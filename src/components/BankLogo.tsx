import { motion } from 'framer-motion';

interface BankLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'light' | 'dark';
}

const BankLogo: React.FC<BankLogoProps> = ({ size = 'md', showText = true, variant = 'dark' }) => {
  const sizes = {
    sm: { logo: 'w-8 h-8 text-sm', text: 'text-sm' },
    md: { logo: 'w-12 h-12 text-lg', text: 'text-lg' },
    lg: { logo: 'w-16 h-16 text-2xl', text: 'text-2xl' },
  };

  const colors = {
    light: {
      bg: 'bg-accent',
      text: 'text-navy',
      label: 'text-white',
    },
    dark: {
      bg: 'bg-accent',
      text: 'text-navy',
      label: 'text-foreground',
    },
  };

  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`${sizes[size].logo} ${colors[variant].bg} rounded-xl flex items-center justify-center font-bold ${colors[variant].text} shadow-gold`}
      >
        M&T
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${sizes[size].text} ${colors[variant].label} leading-tight`}>
            M & T HERITAGE
          </span>
          <span className={`text-xs ${variant === 'light' ? 'text-white/70' : 'text-muted-foreground'} tracking-wider`}>
            UNION BANK
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default BankLogo;
