import { createContext, useContext, useState } from 'react';
import GuidancePopup from '../components/GuidancePopup';

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);

  const openEnquiry = () => setIsOpen(true);
  const closeEnquiry = () => setIsOpen(false);

  const openGuidance = () => setIsGuidanceOpen(true);
  const closeGuidance = () => setIsGuidanceOpen(false);

  return (
    <EnquiryContext.Provider value={{ isOpen, openEnquiry, closeEnquiry, isGuidanceOpen, openGuidance, closeGuidance }}>
      {children}
      <GuidancePopup isOpen={isGuidanceOpen} onClose={closeGuidance} />
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    // Return a safe fallback to prevent crashes if used outside provider
    return { 
      isOpen: false, 
      openEnquiry: () => console.warn('EnquiryProvider missing'), 
      closeEnquiry: () => {},
      isGuidanceOpen: false,
      openGuidance: () => {},
      closeGuidance: () => {}
    };
  }
  return context;
};
