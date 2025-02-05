import * as React from "react";
import { Link, graphql } from 'gatsby'

export const BlogIndex = props => {
  const { pageContext } = props;
  const { previousPagePath, nextPagePath } = pageContext;

  return (
    <div>
      {props.data.posts.edges.map(edge => <div post={edge.node} />)}
      <div>
        {previousPagePath ? <Link to={previousPagePath}>Previous</Link> : null}
        {nextPagePath ? <Link to={nextPagePath}>Next</Link> : null}
      </div>
    </div>
  );
};

// export default class BlogIndexPage extends React.Component {
//   render() {
//     const posts = data.allMarkdownRemark.edges;
//     console.log(posts)
//     return (
//       <Layout>
//         <section>
//           <article className="max-w-sm mx-auto duration-300 transform shadow-md cursor-pointer hover:-translate-y-1 hover:shadow-xl">
//           </article>
//         </section>
//       </Layout>
//     );
//   }
// }

// export const blogListQuery = graphql`
//   query blogListQuery($skip: Int!, $limit: Int!) {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
//       skip: $skip
//       limit: $limit
//     ) {
//       edges {
//         node {
//           excerpt(pruneLength: 400)
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             templateKey
//             date(formatString: "YYYY.MM.DD")
//             cover {
//               childImageSharp {
//                 gatsbyImageData(
//                   width: 120
//                   quality: 100
//                   layout: CONSTRAINED
//                 )
//               }
//             }
//           }
//         }
//       }
//     }
//   }`