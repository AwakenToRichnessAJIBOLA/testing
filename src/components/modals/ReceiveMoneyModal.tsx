import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, QrCode, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { accounts, bankInfo } from '@/data/bankData';

interface ReceiveMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReceiveMoneyModal: React.FC<ReceiveMoneyModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const bankDetails = {
    bankName: bankInfo.name,
    routingNumber: '021000089',
    accountNumber: accounts.checking.number,
    accountType: 'Checking',
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm"
          onClick={onClose}
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
                  <Download className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-white">Receive Money</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* QR Code placeholder */}
              <div className="flex justify-center">
                <div className="w-40 h-40 rounded-2xl bg-secondary flex items-center justify-center border-2 border-dashed border-border">
                  <QrCode className="w-20 h-20 text-muted-foreground" />
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Share your account details or scan QR code to receive funds
              </p>

              {/* Bank Details */}
              <div className="space-y-3">
                <DetailRow
                  label="Bank Name"
                  value={bankDetails.bankName}
                  onCopy={() => handleCopy(bankDetails.bankName, 'Bank name')}
                  copied={copied === 'Bank name'}
                />
                <DetailRow
                  label="Routing Number"
                  value={bankDetails.routingNumber}
                  onCopy={() => handleCopy(bankDetails.routingNumber, 'Routing number')}
                  copied={copied === 'Routing number'}
                />
                <DetailRow
                  label="Account Number"
                  value={bankDetails.accountNumber}
                  onCopy={() => handleCopy(bankDetails.accountNumber, 'Account number')}
                  copied={copied === 'Account number'}
                />
                <DetailRow
                  label="Account Type"
                  value={bankDetails.accountType}
                  onCopy={() => handleCopy(bankDetails.accountType, 'Account type')}
                  copied={copied === 'Account type'}
                />
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-accent hover:bg-gold-dark text-navy font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, onCopy, copied }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
    <button
      onClick={onCopy}
      className="p-2 rounded-lg hover:bg-secondary transition-colors"
    >
      {copied ? (
        <CheckCircle className="w-5 h-5 text-emerald" />
      ) : (
        <Copy className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  </div>
);

export default ReceiveMoneyModal;
