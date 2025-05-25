import React, { useState } from "react";
import Tabs from "../home/Tabs";
import TabPanel from "../home/TabPanel";
import { Page } from "../layout/Page"; // Import Page
import Sidebar from "../home/Sidebar"; // Import Sidebar
import NavHeader from "../home/NavHeader";
import { HouseIcon } from "../ui/HouseIcon";
import BottomNav from "../home/BottomNav";


const tabOptions = [
  { label: "Overview", value: "overview" },
  { label: "Transactions", value: "transactions" },
  { label: "Budgets", value: "budgets" },
    { label: "Pots", value: "pots" },
    { label: "RecurringBills", value: "recurring bills" },
];

export default function Overview() {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value); // Default to the first tab
    const [minimized, setMinimized] = useState(false);

  return (
    <Page>
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row">
          {/* Left Nav */}
          <Sidebar minimized={minimized} className={minimized ? "minimized" : ""}>
        {minimized && (
            <button
                className="sidebar-toggle"
                onClick={() => setMinimized((m) => !m)}
                style={{ margin: "2rem 0 1rem 1rem", alignSelf: "flex-start" }}
            >
                <HouseIcon />
            </button>
            )}
            {!minimized && <NavHeader>finance</NavHeader>}
            {!minimized && (
              <Tabs
                options={tabOptions}
                selected={selectedTab}
                onSelect={setSelectedTab}
              />
            )}
             {!minimized && <div style={{ flex: 1 }} /> } 
             {!minimized && <button
              className="sidebar-toggle"
              onClick={() => setMinimized((m) => !m)}
              style={{ margin: "1rem 0 1rem 1rem", alignSelf: "flex-start"}}
            >
              Minimize Menu
            </button> }
          </Sidebar>
          
          {/* Right Content */}
          <div className={`${minimized ? "col-md-11" : "col-md-9"} p-4 `}>
            <TabPanel tab={selectedTab} />
          </div>
        </div>
        {/* Bottom Nav for mobile */}
        <BottomNav options={tabOptions} selected={selectedTab} onSelect={setSelectedTab} />
      </div>
    </Page>
  );
}