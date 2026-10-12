import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../store';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export function CartNotification() {
  const { cart } = useStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [prevCartLength, setPrevCartLength] = useState(cart.length);

  useEffect(() => {
    if (cart.length > prevCartLength) {
      const lastItem = cart[cart.length - 1];
      const notification: Notification = {
        id: Date.now().toString(),
        message: `${lastItem.product.name} added to cart`,
        type: 'success',
      };
      setNotifications(prev => [...prev, notification]);
      
      // Auto remove after 3 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 3000);
    }
    setPrevCartLength(cart.length);
  }, [cart.length]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto glass rounded-xl p-4 shadow-2xl border border-white/30 min-w-[280px] max-w-[350px]"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0"
              >
                <Check className="w-5 h-5 text-green-600" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Added to Cart</p>
                <p className="text-xs text-gray-500 truncate">{notification.message}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeNotification(notification.id)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-smooth"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            {/* Progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3, ease: 'linear' }}
              className="h-0.5 bg-green-500 rounded-full mt-3"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
