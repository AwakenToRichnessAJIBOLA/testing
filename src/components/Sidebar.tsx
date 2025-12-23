import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ArrowUpDown, 
  Wallet, 
  User, 
  TrendingUp,
  LogOut,
  X,
  ChevronLeft
} from 'lucide-react';
import BankLogo from './BankLogo';
import { useAuth } from '@/contexts/AuthContext';
import { bankInfo } from '@/data/bankData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/transactions', icon: ArrowUpDown, label: 'Transactions' },
  { path: '/accounts', icon: Wallet, label: 'Accounts' },
  { path: '/investments', icon: TrendingUp, label: 'Investments' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed top-0 left-0 h-full w-[280px] bg-sidebar z-50
          flex flex-col border-r border-sidebar-border
          lg:translate-x-0 lg:static
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <BankLogo size="md" variant="light" />
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Joint Account Badge */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-sidebar-accent">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-sidebar-primary animate-pulse-soft" />
            <span className="text-xs font-semibold text-sidebar-primary uppercase tracking-wider">
              Joint Account
            </span>
          </div>
          <p className="text-xs text-sidebar-foreground/70">
            Member since {bankInfo.memberSince}
          </p>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="nav-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
