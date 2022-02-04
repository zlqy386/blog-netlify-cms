import * as React from "react";

const Footer = class extends React.Component {
  render() {
    return (
      <>
      <hr/>
        <footer className="text-center w-full py-4">
          <p>
            Powered by <a title="Gatsby" href="https://www.gatsbyjs.com/">Gatsby</a>
            <span> and </span>
            <a title="Netlify CMS" href="https://www.netlifycms.org/">Netlify CMS</a>.
          </p>
        </footer>
      </>
    );
  }
};

export default Footer;