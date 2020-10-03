import React from "react"
import Layout from "../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"
import blogStyles from './blog.module.scss'
import Head from "../components/head"

const BlogPage = () => {
  /* const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
  `) */

  const data = useStaticQuery(graphql`
  query {
    allContentfulBlogPost (
      sort: {
        fields: publishedDate,
        order: DESC
      }
    ){
      edges{
        node{
          title
          slug
          publishedDate(
            formatString: "MMMM Do, YYYY"
          )
        }
      }
    }
  }
  `)

  const posts = data.allContentfulBlogPost.edges.map(({ node }) => (
    <li className={blogStyles.post}>
      <Link to={node.slug}>
        <h2>{node.title}</h2>
        <p>{node.publishedDate}</p>
      </Link>
    </li>
  ));

  return (
    <Layout>
      <Head title="Blog" />
      <h1>Blog</h1>
      <p>Posts will show up here later on</p>
      <ol className={blogStyles.posts}>
        {posts}
      </ol>
    </Layout>
  )
}

export default BlogPage