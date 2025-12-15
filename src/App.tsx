import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Career Hub Pages
import CareerHubHome from "./pages/career-hub/CareerHubHome";
import ToolsPage from "./pages/career-hub/ToolsPage";
import PayCalculator from "./pages/career-hub/tools/PayCalculator";
import ShiftPlanner from "./pages/career-hub/tools/ShiftPlanner";
import CostOfLivingComparison from "./pages/career-hub/tools/CostOfLivingComparison";
import IndustryPage from "./pages/career-hub/IndustryPage";
import RolePage from "./pages/career-hub/RolePage";
import LocationPage from "./pages/career-hub/LocationPage";
import GuidesPage from "./pages/career-hub/GuidesPage";
import FinancialTipsPage from "./pages/career-hub/FinancialTipsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/career-hub" replace />} />
          
          {/* Career Hub Routes */}
          <Route path="/career-hub" element={<CareerHubHome />} />
          <Route path="/career-hub/tools" element={<ToolsPage />} />
          <Route path="/career-hub/tools/pay-calculator" element={<PayCalculator />} />
          <Route path="/career-hub/tools/shift-planner" element={<ShiftPlanner />} />
          <Route path="/career-hub/tools/cost-of-living" element={<CostOfLivingComparison />} />
          <Route path="/career-hub/industries/:industryId" element={<IndustryPage />} />
          <Route path="/career-hub/roles/:roleSlug" element={<RolePage />} />
          <Route path="/career-hub/locations/:locationSlug" element={<LocationPage />} />
          <Route path="/career-hub/guides" element={<GuidesPage />} />
          <Route path="/career-hub/financial-tips" element={<FinancialTipsPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
