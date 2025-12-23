import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Download, Receipt, ArrowLeftRight, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SendMoneyModal from './modals/SendMoneyModal';
import TransferModal from './modals/TransferModal';
import PayBillsModal from './modals/PayBillsModal';
import ReceiveMoneyModal from './modals/ReceiveMoneyModal';

const actions = [
  { icon: Send, label: 'Send Money', color: 'text-emerald', action: 'send' },
  { icon: Download, label: 'Receive', color: 'text-navy', action: 'receive' },
  { icon: Receipt, label: 'Pay Bills', color: 'text-gold-dark', action: 'bills' },
  { icon: ArrowLeftRight, label: 'Transfer', color: 'text-navy-light', action: 'transfer' },
  { icon: TrendingUp, label: 'Invest', color: 'text-emerald', action: 'invest' },
  { icon: Plus, label: 'More', color: 'text-muted-foreground', action: 'more' },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [billsModalOpen, setBillsModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);

  const handleAction = (action: string) => {
    switch (action) {
      case 'send':
        setSendModalOpen(true);
        break;
      case 'receive':
        setReceiveModalOpen(true);
        break;
      case 'bills':
        setBillsModalOpen(true);
        break;
      case 'transfer':
        setTransferModalOpen(true);
        break;
      case 'invest':
        navigate('/investments');
        break;
      case 'more':
        navigate('/accounts');
        break;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {actions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction(action.action)}
              className="quick-action-btn group"
            >
              <div className={`p-3 rounded-xl bg-secondary group-hover:bg-accent/20 transition-colors duration-200`}>
                <action.icon className={`w-5 h-5 ${action.color} group-hover:text-accent-foreground transition-colors`} />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <SendMoneyModal isOpen={sendModalOpen} onClose={() => setSendModalOpen(false)} />
      <TransferModal isOpen={transferModalOpen} onClose={() => setTransferModalOpen(false)} />
      <PayBillsModal isOpen={billsModalOpen} onClose={() => setBillsModalOpen(false)} />
      <ReceiveMoneyModal isOpen={receiveModalOpen} onClose={() => setReceiveModalOpen(false)} />
    </>
  );
};

export default QuickActions;
