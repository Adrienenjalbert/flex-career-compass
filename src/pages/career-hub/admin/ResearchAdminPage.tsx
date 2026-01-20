import Layout from '@/components/career-hub/Layout';
import SEOHead from '@/components/career-hub/SEOHead';
import { ArticleResearchAdmin } from '@/components/career-hub/admin/ArticleResearchAdmin';

export default function ResearchAdminPage() {
  return (
    <Layout>
      <SEOHead
        title="Article Research Admin | Career Hub"
        description="Admin tool for running Perplexity research enrichment on job application articles"
        canonical="/career-hub/admin/research"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Article Research Admin</h1>
          <p className="text-muted-foreground">
            Run Perplexity AI research to enrich job application articles with 2026 statistics and citations
          </p>
        </div>
        
        <ArticleResearchAdmin />
      </div>
    </Layout>
  );
}