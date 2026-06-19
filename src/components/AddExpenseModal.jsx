import { useRef, useEffect } from 'react';

// Modal that displays a success/info message and auto-closes after 5 seconds
function AddExpenseModal({ onClose, message }) {

  const modalContentRef = useRef(null);

  // Auto-close the modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); 

    return () => clearTimeout(timer);
  }, [onClose]); 

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 px-20">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <p className="text-black font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#1E5128] text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddExpenseModal;