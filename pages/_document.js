import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { ciscoBlue, ciscoLightBlue } from '../utils/colors';

export default class Default extends Document {
  render() {
    return (
      <html lang="nb">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <link href="/css/momentum-ui.min.css" rel="stylesheet" />
          <link
            href="https://cdn.rawgit.com/h-ibaldo/Raleway_Fixed_Numerals/master/css/rawline.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://code.s4d.io/widget-space/production/main.css"
          />

          <script src="https://code.s4d.io/widget-space/production/bundle.js"></script>
          <script src="https://code.s4d.io/widget-recents/production/bundle.js"></script>
          <style>{`
            body {
              margin: 0px;
              height: 100%;
              width: 100%;
              padding: 0px;
              font-size: 16px;
              color: rgba(0, 0, 0, 0.87);
              background-color: #eeeeee !important;
              font-smoothing: antialiased;
              word-break: break-word;
              font-family: rawline;
            }

            img {
              max-width: 100%;
            }

            p {
              line-height: 1.4285em;
            }

            a {
              color: ${ciscoBlue};
              text-decoration: none;
            }

            a:hover {
              color: ${ciscoLightBlue};
              text-decoration: none;
            }

            h1,h2,h3,h4 {
              font-weight: 500;
            }

            ul {
              list-style-type: none !important;
            }

            .gridColumn {
              height: 100vh;
              padding: 0 !important;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
