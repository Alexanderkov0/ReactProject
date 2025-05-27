import React, { useState, useEffect } from "react";
import Tabs from "../home/Tabs";
import TabPanel from "../home/TabPanel";
import { Page } from "../layout/Page";
import Sidebar from "../home/Sidebar";
import NavHeader from "../home/NavHeader";
import { HouseIcon } from "../ui/HouseIcon";
import BottomNav from "../home/BottomNav";
import { useLocation } from "wouter"; // <-- Added for URL-based tab state
import overviewIcon from "../../../assets/overview.png";
import transactionsIcon from "../../../assets/transactions.png";
import budgetsIcon from "../../../assets/budgets.png";
import potsIcon from "../../../assets/pots.png";
import recurringBillsIcon from "../../../assets/recurringBills.png";


const tabOptions = [
  { label: "Overview", value: "overview", icon: overviewIcon },
  { label: "Transactions", value: "transactions", icon: transactionsIcon },
  { label: "Budgets", value: "budgets", icon: budgetsIcon },
  { label: "Pots", value: "pots", icon: potsIcon },
  { label: "RecurringBills", value: "recurring bills", icon: recurringBillsIcon },
];

export default function Overview() {
  // const [selectedTab, setSelectedTab] = useState(tabOptions[0].value); // Default to the first tab
  const [minimized, setMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // --- wouter location for tab state ---
  const [location, setLocation] = useLocation(); // <-- Added
  const tabFromUrl = location.split("/")[2] || "overview"; // <-- Added

  // Update the state when the window is resized
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // function handleTabChange(tab) { setSelectedTab(tab); } // <-- Old way
  function handleTabChange(tab) {
    setLocation(`/overview/${tab}`); // <-- New: update URL to reflect tab
  }

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
                  selected={tabFromUrl} // <-- Use tab from URL
                  onSelect={handleTabChange} // <-- Use URL-based handler
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
            <TabPanel tab={tabFromUrl} /> {/* <-- Use tab from URL */}
          </div>
        </div>
        {/* Bottom Nav for mobile */}
        {isMobile && (
          <BottomNav
            options={tabOptions}
            selected={tabFromUrl} // <-- Use tab from URL
            onSelect={handleTabChange} // <-- Use URL-based handler
          />
        )}
      </div>
    </Page>
  );
}