export const TabNavItem = ({ children, id, activeTab, setActiveTab }) => {
  const handleClick = () => {
    if (activeTab === id) setActiveTab("");
    else setActiveTab(id);
  };

  return (
    <div
      aria-hidden="true"
      onClick={() => handleClick()}
      className={`d-flex h-100 cursor-pointer ${
        activeTab === id ? "active" : ""
      }`}
    >
      {children}
    </div>
  );
};
