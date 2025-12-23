import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeftRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { accounts } from '@/data/bankData';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
  const [fromAccount, setFromAccount] = useState('checking');
  const [toAccount, setToAccount] = useState('savings');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const accountOptions = [
    { id: 'checking', name: 'Checking Account', balance: accounts.checking.balance, number: accounts.checking.number },
    { id: 'savings', name: 'Savings Account', balance: accounts.savings.balance, number: accounts.savings.number },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || fromAccount === toAccount) {
      toast.error(fromAccount === toAccount ? 'Please select different accounts' : 'Please enter an amount');
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setStep('success');
    toast.success('Transfer completed');
  };

  const handleClose = () => {
    setStep('form');
    setAmount('');
    onClose();
  };

  const getAccountInfo = (id: string) => accountOptions.find(a => a.id === id)!;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-navy to-navy-light">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <ArrowLeftRight className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-white">Transfer Funds</h2>
              </div>
              <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            <div className="p-6">
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">From Account</label>
                    <select
                      value={fromAccount}
                      onChange={(e) => setFromAccount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    >
                      {accountOptions.map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} - {formatCurrency(acc.balance)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">To Account</label>
                    <select
                      value={toAccount}
                      onChange={(e) => setToAccount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    >
                      {accountOptions.map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} - {formatCurrency(acc.balance)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-accent hover:bg-gold-dark text-navy font-semibold transition-colors"
                  >
                    Continue
                  </button>
                </form>
              )}

              {step === 'confirm' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-secondary/50 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From</span>
                      <span className="font-medium text-foreground">{getAccountInfo(fromAccount).name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To</span>
                      <span className="font-medium text-foreground">{getAccountInfo(toAccount).name}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-bold text-xl text-foreground">${parseFloat(amount).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('form')}
                      className="flex-1 py-3 rounded-xl border border-border hover:bg-secondary transition-colors font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={isProcessing}
                      className="flex-1 py-3 rounded-xl bg-accent hover:bg-gold-dark text-navy font-semibold transition-colors disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin mx-auto" />
                      ) : (
                        'Confirm Transfer'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Transfer Complete</h3>
                  <p className="text-muted-foreground mb-6">
                    ${parseFloat(amount).toFixed(2)} transferred successfully
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full py-3 rounded-xl bg-accent hover:bg-gold-dark text-navy font-semibold transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransferModal;
