import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"

const ContactPage = () => {
  return (
    <Layout>
      <Head title="Contact" />
      <h1>Contact</h1>
      <p>Call me beep me if you want to reach me.
        <a href="https://twitter.com/caisbalderas" target="blank"> @caisbalderas</a>
      </p>
    </Layout>
  )
}

export default ContactPage