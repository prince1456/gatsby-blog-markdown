import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
// import Helmet from 'react-helmet'
const PostPage = ({ data }) => {
  const {
    markdownRemark: { frontmatter: post, html },
  } = data
  return (
    <div style={{ width: '70vw', margin: '0 auto', border: '1px solid rgba(0, 0,0, 0.1'}}>
      <h1 style={{textAlign: 'center'}}>title: {post.title}</h1>
      <div style={{height:400, maxWidth: 400 }}>
          <Img fluid={post.image.childImageSharp.fluid} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
export default PostPage

export const postPageQuery = graphql`
  query blogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        path
        author
        category
        tags
        date(formatString: "LLL")
        image {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
