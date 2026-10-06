// Registry: layout -> layout component. Add a category by adding a layout here.
import DefaultLayout from "./DefaultLayout";
import HomeLayout from "./HomeLayout";
import BlogListLayout from "./BlogListLayout";
import BlogLayout from "./BlogLayout";
import PortfolioListLayout from "./PortfolioListLayout";
import PortfolioItemLayout from "./PortfolioItemLayout";
import ContactLayout from "./ContactLayout";
import PricingLayout from "./PricingLayout";
import SearchLayout from "./SearchLayout";
import FaqLayout from "./FaqLayout";
import JobListLayout from "./JobListLayout";
import JobLayout from "./JobLayout";
import DirectoryLayout from "./DirectoryLayout";
import CompanyLayout from "./CompanyLayout";
import ClassifiedListLayout from "./ClassifiedListLayout";
import ClassifiedLayout from "./ClassifiedLayout";
import ClassifiedFormLayout from "./ClassifiedFormLayout";

export const layoutRegistry = {
  default: DefaultLayout,
  home: HomeLayout,
  blogList: BlogListLayout,
  blogPost: BlogLayout,
  portfolioList: PortfolioListLayout,
  portfolioItem: PortfolioItemLayout,
  contact: ContactLayout,
  pricing: PricingLayout,
  search: SearchLayout,
  faq: FaqLayout,
  newsList: BlogListLayout,
  newsItem: BlogLayout,
  jobList: JobListLayout,
  job: JobLayout,
  directory: DirectoryLayout,
  directoryCategory: DirectoryLayout,
  directorySub: DirectoryLayout,
  company: CompanyLayout,
  classifiedList: ClassifiedListLayout,
  classified: ClassifiedLayout,
  classifiedForm: ClassifiedFormLayout,
};

export function getLayout(layout) {
  return layoutRegistry[layout] || layoutRegistry.default;
}
