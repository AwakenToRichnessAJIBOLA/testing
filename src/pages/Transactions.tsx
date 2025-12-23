import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import TransactionRow from '@/components/TransactionRow';
import { transactions } from '@/data/bankData';

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterYear, setFilterYear] = useState<'all' | '2024' | '2025'>('all');

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredTransactions = sortedTransactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === 'all' ||
      (filterType === 'income' && t.amount > 0) ||
      (filterType === 'expense' && t.amount < 0);
    const matchesYear =
      filterYear === 'all' || t.date.startsWith(filterYear);
    return matchesSearch && matchesType && matchesYear;
  });

  const totalIncome = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Transaction History</h1>
          <p className="text-muted-foreground">
            {filteredTransactions.length} transactions found
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-gold-dark text-navy font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 border border-border/50 shadow-card"
        >
          <p className="text-sm text-muted-foreground mb-1">Total Income</p>
          <p className="text-2xl font-bold text-emerald">
            +${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-5 border border-border/50 shadow-card"
        >
          <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-tomato">
            -${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 border border-border/50 shadow-card"
        >
          <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
          <p className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-emerald' : 'text-tomato'}`}>
            ${(totalIncome - totalExpenses).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-2xl p-4 border border-border/50 shadow-card"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="appearance-none px-4 py-3 pr-10 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Year Filter */}
          <div className="relative">
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value as typeof filterYear)}
              className="appearance-none px-4 py-3 pr-10 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all cursor-pointer"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
      >
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
          <div className="col-span-5">Description</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-2 text-right">Balance</div>
          <div className="col-span-1 text-center">Status</div>
        </div>

        {/* Transactions */}
        <div className="divide-y divide-border">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                index={index}
                showRunningBalance={true}
              />
            ))
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-lg">No transactions found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Transactions;
