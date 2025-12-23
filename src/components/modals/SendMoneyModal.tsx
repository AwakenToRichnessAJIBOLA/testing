import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, DollarSign, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendMoneyModal: React.FC<SendMoneyModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
    toast.success('Transfer completed successfully');
  };

  const handleClose = () => {
    setStep('form');
    setRecipient('');
    setAmount('');
    setMemo('');
    onClose();
  };

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
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-navy to-navy-light">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Send className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-white">Send Money</h2>
              </div>
              <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Recipient
                    </label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Name or account number"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Amount
                    </label>
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

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Memo (Optional)
                    </label>
                    <input
                      type="text"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      placeholder="What's this for?"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    />
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
                      <span className="text-muted-foreground">To</span>
                      <span className="font-medium text-foreground">{recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-bold text-xl text-foreground">${parseFloat(amount).toFixed(2)}</span>
                    </div>
                    {memo && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Memo</span>
                        <span className="text-foreground">{memo}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From</span>
                      <span className="text-foreground">Checking ****4521</span>
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
                        'Confirm & Send'
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
                    ${parseFloat(amount).toFixed(2)} sent to {recipient}
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

export default SendMoneyModal;
