import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const BlogPostTemplate = ({
  id,
  siteUrl,
  path,
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  const disqusConfig = {
    url: `${siteUrl+path}`,
    id,
    title,
  }

  console.log(disqusConfig)

  return (
    <article
      className="section" 
      itemScope
      itemType="http://schema.org/Article"
    >
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1
              className="title is-size-2 has-text-weight-bold is-bold-light"
              itemProp="headline"
            >
              {title}
            </h1>
            <CommentCount config={disqusConfig} placeholder={'...'} />
            <p itemProp="abstract">{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Disqus config={disqusConfig} />
          </div>
        </div>
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
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;