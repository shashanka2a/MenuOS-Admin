"use client";

import { useState } from "react";
import { ThemeProvider } from "../../src/context/ThemeContext";
import { Layout } from "../../src/components/Layout";
import { DashboardHome } from "../../src/components/DashboardHome";
import { Analytics } from "../../src/components/Analytics";
import { MenuManagement } from "../../src/components/MenuManagement";
import { Orders } from "../../src/components/Orders";
import { Staff } from "../../src/components/Staff";
import { TablesQR } from "../../src/components/TablesQR";
import { Settings } from "../../src/components/Settings";

export default function DashboardPage() {
  const [currentScreen, setCurrentScreen] =
    useState<"dashboard" | "analytics" | "menu" | "orders" | "staff" | "tables" | "settings">("dashboard");

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <DashboardHome />;
      case "analytics":
        return <Analytics />;
      case "menu":
        return <MenuManagement />;
      case "orders":
        return <Orders />;
      case "staff":
        return <Staff />;
      case "tables":
        return <TablesQR />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <ThemeProvider>
      <Layout
        currentScreen={currentScreen}
        onNavigate={(screen) =>
          setCurrentScreen(
            screen as
              | "dashboard"
              | "analytics"
              | "menu"
              | "orders"
              | "staff"
              | "tables"
              | "settings",
          )
        }
      >
        {renderScreen()}
      </Layout>
    </ThemeProvider>
  );
}

