import { motion } from 'framer-motion';

interface TransactionRowProps {
  transaction: {
    id: number;
    date: string;
    description: string;
    amount: number;
    status: string;
    initiatedBy: string;
    runningBalance: number;
    category: string;
    icon: string;
  };
  index: number;
  showRunningBalance?: boolean;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  index,
  showRunningBalance = false 
}) => {
  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isPositive = transaction.amount >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="transaction-row group"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg shrink-0">
          {transaction.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{transaction.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{formatDate(transaction.date)}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline truncate">{transaction.initiatedBy}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <p className={`font-semibold ${isPositive ? 'amount-positive' : 'amount-negative'}`}>
            {formatCurrency(transaction.amount)}
          </p>
          {showRunningBalance && (
            <p className="text-xs text-muted-foreground">
              Bal: ${transaction.runningBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          )}
        </div>
        
        <span className="status-badge status-badge-completed hidden sm:inline">
          {transaction.status}
        </span>
      </div>
    </motion.div>
  );
};

export default TransactionRow;
