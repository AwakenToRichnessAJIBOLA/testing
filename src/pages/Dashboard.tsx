import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Users, Calendar, TrendingUp, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import BalanceCard from '@/components/BalanceCard';
import QuickActions from '@/components/QuickActions';
import TransactionRow from '@/components/TransactionRow';
import { accounts, transactions, monthlySummary, bankInfo, accountHolders } from '@/data/bankData';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const recentTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const totalBalance = accounts.checking.balance + accounts.savings.balance + accounts.ira2024.balance + accounts.ira2023.balance;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Annie'}
          </h1>
          <p className="text-muted-foreground mt-1">Here's your financial overview for today</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald/10 border border-emerald/30"
          >
            <Shield className="w-4 h-4 text-emerald" />
            <span className="text-sm font-medium text-emerald">Account Secured</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30"
          >
            <Users className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Joint Account</span>
            <span className="text-xs text-muted-foreground">• Since {bankInfo.memberSince}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Total Portfolio Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-navy via-navy-light to-navy rounded-2xl p-6 lg:p-8 border border-border/50 shadow-card"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm font-medium mb-1">Total Portfolio Value</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">{formatCurrency(totalBalance)}</h2>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-emerald" />
              <span className="text-emerald text-sm font-medium">+$32,450.00 (6.2%) this month</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/50 text-sm">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BalanceCard
          title="Checking Account"
          balance={accounts.checking.balance}
          accountNumber={accounts.checking.number}
          type="primary"
          trend="up"
          trendValue="+12.5%"
          delay={0.1}
        />
        <BalanceCard
          title="Savings Account"
          balance={accounts.savings.balance}
          accountNumber={accounts.savings.number}
          type="primary"
          trend="up"
          trendValue="+8.2%"
          delay={0.15}
        />
        <BalanceCard
          title="IRA 2024"
          balance={accounts.ira2024.balance}
          accountNumber={accounts.ira2024.number}
          type="primary"
          trend="up"
          trendValue="+15.3%"
          delay={0.2}
        />
        <BalanceCard
          title="IRA 2023"
          balance={accounts.ira2023.balance}
          accountNumber={accounts.ira2023.number}
          type="primary"
          trend="up"
          trendValue="+6.8%"
          delay={0.25}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Monthly Summary & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Monthly Summary</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>December 2024</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-emerald/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald/20 flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-emerald" />
                </div>
                <span className="font-medium text-foreground">Income</span>
              </div>
              <span className="font-bold text-emerald">{formatCurrency(monthlySummary.income)}</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-tomato/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tomato/20 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-tomato" />
                </div>
                <span className="font-medium text-foreground">Expenses</span>
              </div>
              <span className="font-bold text-tomato">{formatCurrency(monthlySummary.expenses)}</span>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Net Change</span>
                <span className="text-xl font-bold text-emerald">
                  +{formatCurrency(monthlySummary.netChange)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border/50 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <Link to="/transactions" className="text-sm font-medium text-accent hover:text-gold-dark transition-colors">
              View All →
            </Link>
          </div>

          <div className="space-y-1">
            {recentTransactions.map((transaction, index) => (
              <TransactionRow key={transaction.id} transaction={transaction} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Account Holders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Account Holders</h3>
          <span className="text-sm text-muted-foreground">Both holders have full access</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-navy/5 to-navy/10 border border-navy/10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white font-semibold text-lg">
              {accountHolders.primary.avatar}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{accountHolders.primary.name}</p>
              <p className="text-sm text-muted-foreground">{accountHolders.primary.role}</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-medium">
              Active
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-dark to-accent flex items-center justify-center text-navy font-semibold text-lg">
              {accountHolders.secondary.avatar}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{accountHolders.secondary.name}</p>
              <p className="text-sm text-muted-foreground">{accountHolders.secondary.role}</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-medium">
              Active
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
