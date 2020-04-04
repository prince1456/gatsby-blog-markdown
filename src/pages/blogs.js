import React from "react"
import Img from "gatsby-image"
import { List, Avatar } from "antd"
import { Link } from "gatsby"
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { graphql } from "gatsby"

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)

const Blogs = ({ data: { allMarkdownRemark } }) => {
  const { edges } = allMarkdownRemark
  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={edges}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={({ node }) => {
          const {
            title,
            description,
            path,
            author,
            category,
            tags,
            date,
            image,
          } = node.frontmatter
          console.log(node)
          return (
            <List.Item
              key={title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                <p>{date}</p>
              ]}
              extra={
                <div style={{ width: 150 }}>
                  <Img fluid={image.childImageSharp.fluid} />
                </div>
              }
            >
              <List.Item.Meta
                //   avatar={<Avatar src={item.avatar} />}
                title={<Link to={path}>{title}</Link>}
                description={description}
              />
              <div dangerouslySetInnerHTML={{ __html: node.html }} />
            </List.Item>
          )
        }}
      />
      {/* {edges.map(({node}) => {
                console.log(node)
                return (
                    <div key={node.id}>
                            title: {node.frontmatter.title}
                            <Img fluid={node.frontmatter.image.childImageSharp.fluid} />
                            </div>
                    </div>
                )
            })} */}
    </div>
  )
}
export default Blogs

export const blogQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
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
                fluid(maxWidth: 250) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
