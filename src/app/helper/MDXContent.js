import shortcodes from "@layouts/shortcodes/all";
import "highlight.js/styles/solarized-light.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const MDXContent = ({ content }) => {
  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight, rehypeSlug],
  };

  // Preprocess content to ensure headings without spaces (e.g., ##Heading) are parsed properly
  const processedContent = content ? content.replace(/^(#{1,6})([^\s#].*)$/gm, "$1 $2") : "";

  return (
    <>
      {/* @ts-ignore */}
      <MDXRemote
        source={processedContent}
        components={shortcodes}
        options={{ mdxOptions }}
      />
    </>
  );
};

export default MDXContent;
