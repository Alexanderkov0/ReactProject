import React, { useState, useEffect } from "react";
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update the state when the window is resized
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Page>
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row">
          {/* Left Nav */}
          {!isMobile && (
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
              {!minimized && <div style={{ flex: 1 }} />}
              {!minimized && (
                <button
                  className="sidebar-toggle"
                  onClick={() => setMinimized((m) => !m)}
                  style={{ margin: "1rem 0 1rem 1rem", alignSelf: "flex-start" }}
                >
                  Minimize Menu
                </button>
              )}
            </Sidebar>
          )}
          {/* Right Content */}
          <div className={`${!isMobile && minimized ? "col-md-11" : !isMobile ? "col-md-9" : "col-12"} p-4`}>
            <TabPanel tab={selectedTab} />
          </div>
        </div>
        {/* Bottom Nav for mobile */}
        {isMobile && (
          <BottomNav options={tabOptions} selected={selectedTab} onSelect={setSelectedTab} />
        )}
      </div>
    </Page>
  );
}