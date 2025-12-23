import { motion } from 'framer-motion';
import { ArrowLeftRight, ArrowUpRight, Shield, Users, CreditCard, Building2 } from 'lucide-react';
import { accounts, accountHolders } from '@/data/bankData';

const Accounts: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const allAccounts = [
    { ...accounts.checking, icon: CreditCard },
    { ...accounts.savings, icon: Building2 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Account Management</h1>
        <p className="text-muted-foreground">Manage your accounts and permissions</p>
      </motion.div>

      {/* Account Holders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Account Holders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-navy/5 to-navy/10 border border-navy/10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white text-lg font-semibold">
              {accountHolders.primary.avatar}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{accountHolders.primary.name}</p>
              <p className="text-sm text-muted-foreground">{accountHolders.primary.role}</p>
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-emerald" />
                <span className="text-xs text-emerald font-medium">Full Access</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-gold/5 to-gold/10 border border-gold/10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-dark to-accent flex items-center justify-center text-navy text-lg font-semibold">
              {accountHolders.secondary.avatar}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{accountHolders.secondary.name}</p>
              <p className="text-sm text-muted-foreground">{accountHolders.secondary.role}</p>
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-emerald" />
                <span className="text-xs text-emerald font-medium">Full Access</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-accent" />
            <span className="font-medium text-foreground">Permissions:</span>
            <span className="text-muted-foreground">Both holders have full access to all accounts</span>
          </div>
        </div>
      </motion.div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allAccounts.map((account, index) => (
          <motion.div
            key={account.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <account.icon className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{account.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{account.number}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-semibold">
                Active
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(account.balance)}</p>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-navy text-white font-medium hover:bg-navy-light transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
                Transfer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-muted transition-colors"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transfer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeftRight className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Quick Transfer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">From Account</label>
            <select className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent outline-none">
              <option>Checking ****4892</option>
              <option>Savings ****7631</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">To Account</label>
            <select className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent outline-none">
              <option>Savings ****7631</option>
              <option>Checking ****4892</option>
              <option>External Account</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
            <input
              type="text"
              placeholder="$0.00"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent outline-none"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full sm:w-auto px-8 py-3 rounded-xl bg-accent hover:bg-gold-dark text-navy font-semibold transition-colors shadow-gold"
        >
          Transfer Funds
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Accounts;
