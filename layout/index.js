// Registry: layout -> layout component. Add a category by adding a layout here.
import DefaultLayout from "./DefaultLayout";
import HomeLayout from "./HomeLayout";
import BlogListLayout from "./BlogListLayout";
import BlogLayout from "./BlogLayout";
import ContactLayout from "./ContactLayout";

export const layoutRegistry = {
  default: DefaultLayout,
  home: HomeLayout,
  blogList: BlogListLayout,
  blogPost: BlogLayout,
  contact: ContactLayout,
};

export function getLayout(layout) {
  return layoutRegistry[layout] || layoutRegistry.default;
}
