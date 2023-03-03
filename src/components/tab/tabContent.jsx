export const TabContent = ({ id, activeTab, children }) => {
  if (activeTab !== id) return null;
  return <div className="flight__tab">{children}</div>;
};
