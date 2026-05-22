import React, { useState } from 'react';
import './Tabs.css';

interface TabsProps {
  children: React.ReactNode;
}

interface TabPanelProps {
  label: string;
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface TabsComponent extends React.FC<TabsProps> {
  Panel: typeof TabPanel;
}

export const Tabs: TabsComponent = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = React.Children.toArray(children) as React.ReactElement<TabPanelProps>[];

  return (
    <div className="tabs-container">
      <div className="tabs-list">
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;

          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`tab ${isActive ? 'active' : ''}`}
            >
              {tab.props.label}
            </button>
          );
        })}
      </div>
      <div className="tab-content">
        {tabs[activeTab]}
      </div>
    </div>
  );
};

Tabs.Panel = TabPanel;

export default Tabs;
