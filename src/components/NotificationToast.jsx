import { AnimatePresence, motion } from "framer-motion";

function NotificationToast({ message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-[#181C14] border-2 border-green-700 text-white rounded-xl shadow-xl px-5 py-3 font-semibold">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotificationToast;