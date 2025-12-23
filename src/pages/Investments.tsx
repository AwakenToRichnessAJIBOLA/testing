import { motion } from 'framer-motion';
import { TrendingUp, Calendar, ArrowUpRight, DollarSign, PieChart } from 'lucide-react';
import { accounts, iraContributions, iraGrowthData } from '@/data/bankData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Investments: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const totalIRA = accounts.ira2024.balance + accounts.ira2023.balance;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Investments & IRA</h1>
          <p className="text-muted-foreground">Track your retirement savings and growth</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald/10 border border-emerald/30">
          <TrendingUp className="w-4 h-4 text-emerald" />
          <span className="text-sm font-medium text-emerald">+11.2% YTD</span>
        </div>
      </motion.div>

      {/* Total IRA Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Total IRA Balance</p>
            <p className="text-4xl lg:text-5xl font-bold mb-2">{formatCurrency(totalIRA)}</p>
            <div className="flex items-center gap-2 text-emerald">
              <ArrowUpRight className="w-5 h-5" />
              <span className="font-medium">+$15,400.45 from last year</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center p-4 rounded-xl bg-white/10">
              <p className="text-white/70 text-sm mb-1">2024 Balance</p>
              <p className="text-xl font-bold">{formatCurrency(accounts.ira2024.balance)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10">
              <p className="text-white/70 text-sm mb-1">2023 Balance</p>
              <p className="text-xl font-bold">{formatCurrency(accounts.ira2023.balance)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <PieChart className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">IRA Growth</h2>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">2024</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-navy" />
              <span className="text-muted-foreground">2023</span>
            </div>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={iraGrowthData}>
              <defs>
                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(51, 100%, 50%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(51, 100%, 50%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNavy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(210, 55%, 11%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(210, 55%, 11%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
              <XAxis dataKey="month" stroke="hsl(210, 20%, 45%)" fontSize={12} />
              <YAxis 
                stroke="hsl(210, 20%, 45%)" 
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)', 
                  border: '1px solid hsl(210, 20%, 90%)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Area 
                type="monotone" 
                dataKey="value2024" 
                stroke="hsl(51, 100%, 50%)" 
                fillOpacity={1} 
                fill="url(#colorGold)"
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="value2023" 
                stroke="hsl(210, 55%, 11%)" 
                fillOpacity={1} 
                fill="url(#colorNavy)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Contribution History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Contribution History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              {iraContributions.slice().reverse().map((contribution, index) => (
                <motion.tr
                  key={`${contribution.year}-${contribution.month}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-medium text-foreground">{contribution.month} {contribution.year}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contribution.type === 'Regular' 
                        ? 'bg-navy/10 text-navy' 
                        : contribution.type === 'Catch-up'
                        ? 'bg-accent/20 text-accent-foreground'
                        : 'bg-emerald/10 text-emerald'
                    }`}>
                      {contribution.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-semibold text-emerald">+{formatCurrency(contribution.amount)}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* IRA Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">2024 Contribution Limit</h3>
              <p className="text-sm text-muted-foreground">Annual maximum</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">$7,000</p>
              <p className="text-sm text-muted-foreground">+$1,000 catch-up if 50+</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Contributed</p>
              <p className="text-lg font-semibold text-emerald">$22,000</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Average Annual Return</h3>
              <p className="text-sm text-muted-foreground">Based on performance</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-emerald">+8.5%</p>
              <p className="text-sm text-muted-foreground">5-year average</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">This year</p>
              <p className="text-lg font-semibold text-emerald">+11.2%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Investments;
