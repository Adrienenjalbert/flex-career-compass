import { useParams } from "react-router-dom";
import GuidesArticlePage from "./GuidesArticlePage";
import SeasonalLocationArticlePage from "./SeasonalLocationArticlePage";
import { parseSeasonalLocationUrl } from "@/data/articles/seasonal-location-data";

/**
 * Both regular guides and seasonal location guides share the same URL pattern:
 *   /career-hub/guides/:slug
 *
 * We route based on whether the slug matches the seasonal-location format
 * (e.g. "black-friday-hiring-houston").
 */
const GuidesSlugRouter = () => {
  const { slug } = useParams<{ slug: string }>();

  const isSeasonalLocation = !!slug && parseSeasonalLocationUrl(slug) !== null;

  return isSeasonalLocation ? <SeasonalLocationArticlePage /> : <GuidesArticlePage />;
};

export default GuidesSlugRouter;
