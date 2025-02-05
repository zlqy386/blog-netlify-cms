import * as React from "react";

const Footer = class extends React.Component {
  render() {
    return (
      <>
      <hr/>
        <footer className="w-full py-4 text-center">
          <p>
            Powered by <a className="text-blue-600 underline hover:text-blue-500" title="Gatsby" href="https://www.gatsbyjs.com/">Gatsby</a>
            <span> and </span>
            <a className="text-blue-600 underline hover:text-blue-500" title="Netlify CMS" href="https://www.netlifycms.org/">Netlify CMS</a>.
          </p>
        </footer>
      </>
    );
  }
};

export default Footer;