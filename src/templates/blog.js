import React from "react"
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from "../components/layout"
import Head from "../components/head"

// doing it not with useStaticQuery because I need access to context slug
/*
export const query = graphql`
query ($slug: String) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
      date
    }
    html
  }
}
`
*/

/*
const Blog = ( props ) => {
  const { title, date } = props.data.markdownRemark.frontmatter
  const { html } = props.data.markdownRemark
  return (
    <Layout>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    </Layout>
  )
}

 */


export const query = graphql`
  query($slug: String) {
    contentfulBlogPost(
        slug:{eq: $slug}
      ){
        title
        publishedDate(formatString: "MMMM Do, YYYY")
        body {
          json
        }
      }
    }
`


const Blog = ( props ) => {
  const { title, publishedDate } = props.data.contentfulBlogPost
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const { fields } = node.data.target;
        const alt = fields.title['en-US']
        const url = fields.file['en-US'].url
        return <img alt={alt} src={url} />
      }
    }
  }
  return (
    <Layout>
      <Head title={title} />
      <h1>{title}</h1>
      <p>{publishedDate}</p>
      {
        documentToReactComponents(
          props.data.contentfulBlogPost.body.json,
          options
        )
      }
    </Layout>
  )
}
export default Blog