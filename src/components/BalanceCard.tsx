import { motion } from 'framer-motion';
import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface BalanceCardProps {
  title: string;
  balance: number;
  accountNumber: string;
  type?: 'primary' | 'secondary';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  delay?: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  title,
  balance,
  accountNumber,
  type = 'secondary',
  trend = 'neutral',
  trendValue,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const isPrimary = type === 'primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-shadow duration-300
        ${isPrimary 
          ? 'bg-gradient-to-br from-navy to-navy-light text-white shadow-lg hover:shadow-xl' 
          : 'bg-card border border-border/50 shadow-card hover:shadow-card-hover'
        }
      `}
    >
      {/* Background decoration */}
      {isPrimary && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm font-medium ${isPrimary ? 'text-white/80' : 'text-muted-foreground'}`}>
            {title}
          </span>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className={`p-1.5 rounded-lg transition-colors ${
              isPrimary ? 'hover:bg-white/10' : 'hover:bg-secondary'
            }`}
          >
            {isVisible ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="mb-3">
          <span className={`text-3xl font-bold tracking-tight ${isPrimary ? 'text-white' : 'text-foreground'}`}>
            {isVisible ? formatCurrency(balance) : '••••••••'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-sm font-mono ${isPrimary ? 'text-white/60' : 'text-muted-foreground'}`}>
            {accountNumber}
          </span>
          
          {trend !== 'neutral' && trendValue && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend === 'up' ? 'text-emerald' : 'text-tomato'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </div>

      {/* Gold accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${isPrimary ? 'bg-accent' : 'bg-gradient-to-r from-accent to-gold-dark'}`} />
    </motion.div>
  );
};

export default BalanceCard;
