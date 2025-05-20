import React, { useState } from "react";
import Tabs from "../home/Tabs";
import TabPanel from "../home/TabPanel";
import { Page } from "../layout/Page"; // Import Page
import Sidebar from "../home/Sidebar"; // Import Sidebar
import NavHeader from "../home/NavHeader";


const tabOptions = [
  { label: "Overview", value: "overview" },
  { label: "Transactions", value: "transactions" },
  { label: "Budgets", value: "budgets" },
    { label: "Pots", value: "pots" },
    { label: "RecurringBills", value: "recurring bills" },
];

export default function Overview() {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value); // Default to the first tab

  return (
    <Page>
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row">
          {/* Left Nav */}
          <Sidebar className="">
            <NavHeader>finance</NavHeader>
            <Tabs
              options={tabOptions}
              selected={selectedTab}
              onSelect={setSelectedTab}
            />
          </Sidebar>
          
          {/* Right Content */}
          <div className="col-md-9 p-4">
            <TabPanel tab={selectedTab} />
          </div>
        </div>
      </div>
    </Page>
  );
}