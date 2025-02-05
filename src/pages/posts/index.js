import * as React from "react";
import { Link, graphql } from 'gatsby'

import Layout from "../../components/Layout";

const BlogIndexPage = ({ data, pageContext, location }) => {
  console.log(data)
  const posts = data.allMarkdownRemark.edges;
  console.log(posts)
  return (
    <Layout>
      <section>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article className="max-w-sm mx-auto duration-300 transform shadow-md cursor-pointer hover:-translate-y-1 hover:shadow-xl">
            <header>
              <h3>
                <Link to={node.fields.slug}> {title} </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt }} />
            </section>
          </article>
        )
      })}
      </section>
    </Layout>
  );
}
export default BlogIndexPage;

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY.MM.DD")
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 120
                  quality: 100
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }`