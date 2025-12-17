import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { guideCategories } from "@/data/articles/guides";

const GuidesCategorySection = () => {
  const totalArticles = guideCategories.reduce((sum, cat) => sum + cat.articles.length, 0);
  
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Career Guides & Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice and practical tips to help you succeed in flexible work, from your first shift to career advancement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {guideCategories.map((category) => {
            const Icon = category.icon;
            const colorClasses: Record<string, string> = {
              "getting-started": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
              "career-growth": "bg-green-500/10 text-green-600 dark:text-green-400",
              "industry-guides": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
              "professional-development": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
            };
            
            return (
              <Link
                key={category.slug}
                to={`/career-hub/guides?category=${category.slug}`}
                className="group relative bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${colorClasses[category.slug] || "bg-primary/10 text-primary"} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.category}
                      </h3>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {category.articles.length} guides
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Article Previews */}
                <div className="space-y-2 mb-4">
                  {category.articles.slice(0, 3).map((article) => (
                    <div
                      key={article.slug}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      <span className="truncate">{article.title}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  <span>Explore guides</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <Link
            to="/career-hub/guides"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all {totalArticles} career guides
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidesCategorySection;
