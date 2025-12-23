import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Bell, Fingerprint, LogOut, ChevronRight, Key, Smartphone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { accountHolders } from '@/data/bankData';
import { Switch } from '@/components/ui/switch';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const settingsSections = [
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Face ID / Touch ID', description: 'Use biometric authentication', toggle: true, enabled: true },
        { label: 'Change PIN', description: 'Update your security PIN', action: true },
        { label: 'Two-Factor Authentication', description: 'Add extra security layer', toggle: true, enabled: true },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Transaction Alerts', description: 'Get notified for every transaction', toggle: true, enabled: true },
        { label: 'Balance Updates', description: 'Daily balance notifications', toggle: true, enabled: false },
        { label: 'Security Alerts', description: 'Important security notifications', toggle: true, enabled: true },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white text-3xl font-bold">
            AF
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl font-bold text-foreground">{accountHolders.primary.name}</h2>
            <p className="text-muted-foreground">{accountHolders.primary.role}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-semibold">
                Premium Member
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-semibold">
                Verified
              </span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 rounded-xl bg-secondary hover:bg-muted text-foreground font-medium transition-colors"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Mail className="w-5 h-5 text-navy" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium text-foreground">{user?.email || 'annie.ramirez@email.com'}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Phone className="w-5 h-5 text-navy" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium text-foreground">+1 (555) 123-4567</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-navy" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium text-foreground">1234 Heritage Lane, Suite 500</p>
              <p className="text-sm text-muted-foreground">New York, NY 10001</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + sectionIndex * 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <section.icon className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
          </div>

          <div className="space-y-3">
            {section.items.map((item, itemIndex) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.toggle ? (
                  <Switch defaultChecked={item.enabled} />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={handleLogout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive/20 font-semibold transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </motion.button>
    </div>
  );
};

export default Profile;
