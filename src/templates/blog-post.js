import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import { CalendarIcon, ChatAlt2Icon } from '@heroicons/react/solid'


import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const BlogPostTemplate = ({
  content,
  contentComponent,
  date,
  description,
  helmet,
  path,
  id,
  siteUrl,
  tags,
  title,
}) => {
  const PostContent = contentComponent || Content;
  const disqusConfig = {
    url: `${siteUrl+path}`,
    id,
    title,
    language: 'zh'
  }

  return (
    <article
      className="px-2 py-2 prose prose-stone max-w-none prose-a:text-sky-600 hover:prose-a:text-sky-500 sm:px-6 sm:py-6 lg:px-8 lg:py-8" 
      itemScope
      itemType="http://schema.org/Article"
    >
      {helmet || ""}
      <div className="flex gap-4">
        <div className="flex items-center gap-2"><CalendarIcon className="inline-block w-5 h-5"/><span>{date}</span></div>
        <div className="flex items-center gap-2"><ChatAlt2Icon className="inline-block w-5 h-5"/><CommentCount config={disqusConfig} placeholder={'...'} /></div>
      </div>
      {tags && tags.length ? (
        <div className="py-2 not-prose">
          <ul className="flex gap-2">
            {tags.map((tag) => (
              <li key={tag + `tag`} className="inline-block px-2 py-1 text-xs text-white bg-teal-600 rounded">
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <h1 className="mb-0" itemProp="headline">{title}</h1>
      <p className="my-4 text-gray-600" itemProp="abstract">{description}</p>
      <div className="content">
        <PostContent content={content} />
        <p className="copyright">
          <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
            <img className="inline" alt="知识共享许可协议" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" />
          </a>
          本文由<a href="mailto:zy3861@163.com">张杨</a>采用<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">知识共享署名-非商业性使用 4.0 国际许可协议</a>进行许可。转载请注明出处，感谢配合！
        </p>
        <Disqus config={disqusConfig} />
      </div>
    </article>
  );
};

BlogPostTemplate.propTypes = {
  id: PropTypes.string,
  siteUrl: PropTypes.string,
  path: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  date: PropTypes.string
};

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post, site } = data;

  return (
    <Layout>
      <BlogPostTemplate
        id={post.id}
        siteUrl={site.siteMetadata.siteUrl}
        path={location.pathname}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    site: PropTypes.object
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        title
        description
        tags
      }
    }
  }
`;