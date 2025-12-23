import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Receipt, Zap, Wifi, Home, Phone, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PayBillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const billers = [
  { id: 'power', name: 'City Power & Light', icon: Zap, amount: 145.50, dueDate: 'Dec 25, 2024' },
  { id: 'internet', name: 'FastNet Internet', icon: Wifi, amount: 89.99, dueDate: 'Dec 28, 2024' },
  { id: 'mortgage', name: 'Home Mortgage', icon: Home, amount: 2450.00, dueDate: 'Jan 1, 2025' },
  { id: 'phone', name: 'Mobile Services', icon: Phone, amount: 125.00, dueDate: 'Dec 30, 2024' },
];

const PayBillsModal: React.FC<PayBillsModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [selectedBill, setSelectedBill] = useState<typeof billers[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectBill = (bill: typeof billers[0]) => {
    setSelectedBill(bill);
    setStep('confirm');
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
    toast.success('Bill payment scheduled');
  };

  const handleClose = () => {
    setStep('select');
    setSelectedBill(null);
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
            <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-navy to-navy-light">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-white">Pay Bills</h2>
              </div>
              <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            <div className="p-6">
              {step === 'select' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">Select a bill to pay</p>
                  {billers.map((bill) => (
                    <motion.button
                      key={bill.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectBill(bill)}
                      className="w-full p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 transition-all flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <bill.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-foreground">{bill.name}</p>
                        <p className="text-sm text-muted-foreground">Due: {bill.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">${bill.amount.toFixed(2)}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {step === 'confirm' && selectedBill && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <selectedBill.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{selectedBill.name}</h3>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/50 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount Due</span>
                      <span className="font-bold text-xl text-foreground">${selectedBill.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due Date</span>
                      <span className="text-foreground">{selectedBill.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pay From</span>
                      <span className="text-foreground">Checking ****4521</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('select')}
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
                        'Pay Now'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === 'success' && selectedBill && (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Payment Scheduled</h3>
                  <p className="text-muted-foreground mb-6">
                    ${selectedBill.amount.toFixed(2)} to {selectedBill.name}
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

export default PayBillsModal;
