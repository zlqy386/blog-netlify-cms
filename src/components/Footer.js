import * as React from "react";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <hr />
        <div className="content has-text-centered">
          <p>
            Powered by <a title="Gatsby" href="https://www.gatsbyjs.com/">Gatsby</a>
            <span> and </span>
            <a title="Netlify CMS" href="https://www.netlifycms.org/">Netlify CMS</a>.
          </p>
        </div>
      </footer>
    );
  }
};

export default Footer;