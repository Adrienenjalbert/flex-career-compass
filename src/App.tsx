import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// Career Hub Pages
import CareerHubHome from "./pages/career-hub/CareerHubHome";
import ToolsPage from "./pages/career-hub/ToolsPage";
import PayCalculator from "./pages/career-hub/tools/PayCalculator";
import ShiftPlanner from "./pages/career-hub/tools/ShiftPlanner";
import CostOfLivingComparison from "./pages/career-hub/tools/CostOfLivingComparison";
import TaxCalculator from "./pages/career-hub/tools/TaxCalculator";
import UnemploymentCalculator from "./pages/career-hub/tools/UnemploymentCalculator";
import SkillsAnalyzer from "./pages/career-hub/tools/SkillsAnalyzer";
import CareerPathExplorer from "./pages/career-hub/tools/CareerPathExplorer";
import IndustryPage from "./pages/career-hub/IndustryPage";
import RolePage from "./pages/career-hub/RolePage";
import LocationPage from "./pages/career-hub/LocationPage";
import LocationRolePage from "./pages/career-hub/LocationRolePage";
import GuidesPage from "./pages/career-hub/GuidesPage";
import FinancialTipsPage from "./pages/career-hub/FinancialTipsPage";
import GuidesArticlePage from "./pages/career-hub/articles/GuidesArticlePage";
import FinancialTipsArticlePage from "./pages/career-hub/articles/FinancialTipsArticlePage";
import LLMPage from "./pages/career-hub/LLMPage";
import CityPage from "./pages/career-hub/CityPage";
import CitiesIndexPage from "./pages/career-hub/CitiesIndexPage";
import CityRolePage from "./pages/career-hub/CityRolePage";
import ProgrammaticRouter from "./pages/career-hub/programmatic/ProgrammaticRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/career-hub" replace />} />
          
          {/* Career Hub Routes */}
          <Route path="/career-hub" element={<CareerHubHome />} />
          <Route path="/career-hub/tools" element={<ToolsPage />} />
          <Route path="/career-hub/tools/pay-calculator" element={<PayCalculator />} />
          <Route path="/career-hub/tools/shift-planner" element={<ShiftPlanner />} />
          <Route path="/career-hub/tools/cost-of-living" element={<CostOfLivingComparison />} />
          <Route path="/career-hub/tools/tax-calculator" element={<TaxCalculator />} />
          <Route path="/career-hub/tools/unemployment-calculator" element={<UnemploymentCalculator />} />
          <Route path="/career-hub/tools/skills-analyzer" element={<SkillsAnalyzer />} />
          <Route path="/career-hub/tools/career-path" element={<CareerPathExplorer />} />
          <Route path="/career-hub/industries/:industryId" element={<IndustryPage />} />
          <Route path="/career-hub/roles/:roleSlug" element={<RolePage />} />
          <Route path="/career-hub/locations/:locationSlug" element={<LocationPage />} />
          <Route path="/career-hub/locations/:locationSlug/:roleSlug" element={<LocationRolePage />} />
          <Route path="/career-hub/guides" element={<GuidesPage />} />
          <Route path="/career-hub/guides/:slug" element={<GuidesArticlePage />} />
          <Route path="/career-hub/financial-tips" element={<FinancialTipsPage />} />
          <Route path="/career-hub/financial-tips/:slug" element={<FinancialTipsArticlePage />} />
          <Route path="/career-hub/cities" element={<CitiesIndexPage />} />
          <Route path="/career-hub/cities/:citySlug" element={<CityPage />} />
          <Route path="/career-hub/cities/:citySlug/:roleSlug" element={<CityRolePage />} />
          <Route path="/career-hub/llm" element={<LLMPage />} />
          
          {/* Programmatic SEO Routes */}
          <Route path="/:slug" element={<ProgrammaticRouter />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
