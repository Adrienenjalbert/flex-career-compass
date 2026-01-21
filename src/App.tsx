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
import ChildcareCalculator from "./pages/career-hub/tools/ChildcareCalculator";
import CommuteCalculator from "./pages/career-hub/tools/CommuteCalculator";
import DataVerification from "./pages/career-hub/tools/DataVerification";
import WorkTalk from "./pages/career-hub/tools/WorkTalk";
import CocktailQuiz from "./pages/career-hub/tools/CocktailQuiz";
import SafetyFirst from "./pages/career-hub/tools/SafetyFirst";
import MenuMaster from "./pages/career-hub/tools/MenuMaster";
import IndustryPage from "./pages/career-hub/IndustryPage";
import RolePage from "./pages/career-hub/RolePage";
import LocationPage from "./pages/career-hub/LocationPage";
import LocationRolePage from "./pages/career-hub/LocationRolePage";
import GuidesPage from "./pages/career-hub/GuidesPage";
import FinancialTipsPage from "./pages/career-hub/FinancialTipsPage";
import ResourcesPage from "./pages/career-hub/ResourcesPage";
import GuidesSlugRouter from "./pages/career-hub/articles/GuidesSlugRouter";
import FinancialTipsArticlePage from "./pages/career-hub/articles/FinancialTipsArticlePage";
import LLMPage from "./pages/career-hub/LLMPage";
import CityPage from "./pages/career-hub/CityPage";
import CitiesIndexPage from "./pages/career-hub/CitiesIndexPage";
import CityRolePage from "./pages/career-hub/CityRolePage";
import ActiveMarketsPage from "./pages/career-hub/ActiveMarketsPage";
import ProgrammaticRouter from "./pages/career-hub/programmatic/ProgrammaticRouter";
import SeasonalHiringPage from "./pages/career-hub/SeasonalHiringPage";
import PresentationPage from "./pages/career-hub/PresentationPage";
import JobApplicationToolkitPage from "./pages/career-hub/JobApplicationToolkitPage";
import ResumeExamplesIndexPage from "./pages/career-hub/resume-examples/ResumeExamplesIndexPage";
import ResumeExamplePage from "./pages/career-hub/resume-examples/ResumeExamplePage";
import TemplatesIndexPage from "./pages/career-hub/templates/TemplatesIndexPage";
import TemplatePage from "./pages/career-hub/templates/TemplatePage";
import ActionVerbsPage from "./pages/career-hub/resources/ActionVerbsPage";
import BulletGeneratorPage from "./pages/career-hub/resources/BulletGeneratorPage";
import CoverLettersIndexPage from "./pages/career-hub/templates/CoverLettersIndexPage";
import CoverLetterPage from "./pages/career-hub/templates/CoverLetterPage";
import ResearchAdminPage from "./pages/career-hub/admin/ResearchAdminPage";
import { 
  ForStudentsPage, 
  ForFreshersPage, 
  ForImmigrantsPage,
  ForCareerChangersPage,
  ForParentsPage,
  ForSeasonalWorkersPage,
  ForSideGigPage
} from "./pages/career-hub/personas";

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
          <Route path="/career-hub/tools/childcare-calculator" element={<ChildcareCalculator />} />
          <Route path="/career-hub/tools/commute-calculator" element={<CommuteCalculator />} />
          <Route path="/career-hub/tools/data-verification" element={<DataVerification />} />
          <Route path="/career-hub/tools/worktalk" element={<WorkTalk />} />
          <Route path="/career-hub/tools/cocktail-quiz" element={<CocktailQuiz />} />
          <Route path="/career-hub/tools/safety-first" element={<SafetyFirst />} />
          <Route path="/career-hub/tools/menu-master" element={<MenuMaster />} />
          <Route path="/career-hub/industries/:industryId" element={<IndustryPage />} />
          <Route path="/career-hub/roles/:roleSlug" element={<RolePage />} />
          <Route path="/career-hub/locations" element={<ActiveMarketsPage />} />
          <Route path="/career-hub/locations/:locationSlug" element={<LocationPage />} />
          <Route path="/career-hub/locations/:locationSlug/:roleSlug" element={<LocationRolePage />} />
          <Route path="/career-hub/guides" element={<GuidesPage />} />
          <Route path="/career-hub/guides/:slug" element={<GuidesSlugRouter />} />
          <Route path="/career-hub/financial-tips" element={<FinancialTipsPage />} />
          <Route path="/career-hub/financial-tips/:slug" element={<FinancialTipsArticlePage />} />
          <Route path="/career-hub/resources" element={<ResourcesPage />} />
          <Route path="/career-hub/resources/action-verbs" element={<ActionVerbsPage />} />
          <Route path="/career-hub/resources/bullet-generator" element={<BulletGeneratorPage />} />
          <Route path="/career-hub/cities" element={<CitiesIndexPage />} />
          <Route path="/career-hub/cities/:citySlug" element={<CityPage />} />
          <Route path="/career-hub/cities/:citySlug/:roleSlug" element={<CityRolePage />} />
          <Route path="/career-hub/llm" element={<LLMPage />} />
          <Route path="/career-hub/seasonal-hiring" element={<SeasonalHiringPage />} />
          <Route path="/career-hub/presentation" element={<PresentationPage />} />
          <Route path="/career-hub/job-application-toolkit" element={<JobApplicationToolkitPage />} />
          <Route path="/career-hub/resume-examples" element={<ResumeExamplesIndexPage />} />
          <Route path="/career-hub/resume-examples/:roleSlug" element={<ResumeExamplePage />} />
          <Route path="/career-hub/resume-examples/:roleSlug/:variation" element={<ResumeExamplePage />} />
          <Route path="/career-hub/templates" element={<TemplatesIndexPage />} />
          <Route path="/career-hub/templates/:templateSlug" element={<TemplatePage />} />
          <Route path="/career-hub/cover-letters" element={<CoverLettersIndexPage />} />
          <Route path="/career-hub/cover-letters/:templateSlug" element={<CoverLetterPage />} />
          <Route path="/career-hub/admin/research" element={<ResearchAdminPage />} />
          
          {/* Persona Landing Pages */}
          <Route path="/career-hub/for-students" element={<ForStudentsPage />} />
          <Route path="/career-hub/for-freshers" element={<ForFreshersPage />} />
          <Route path="/career-hub/for-immigrants" element={<ForImmigrantsPage />} />
          <Route path="/career-hub/for-career-changers" element={<ForCareerChangersPage />} />
          <Route path="/career-hub/for-parents" element={<ForParentsPage />} />
          <Route path="/career-hub/for-seasonal-workers" element={<ForSeasonalWorkersPage />} />
          <Route path="/career-hub/for-side-gig" element={<ForSideGigPage />} />
          
          {/* Programmatic SEO Routes */}
          <Route path="/:slug" element={<ProgrammaticRouter />} />
          
          <Route path="*" element={<NotFound />} />
          
          {/* Programmatic SEO Routes */}
          <Route path="/:slug" element={<ProgrammaticRouter />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
