import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Remove browser extension attributes before hydration
            (function() {
              const removeExtensionAttributes = () => {
                const html = document.documentElement;
                const attributesToRemove = ['foxified', 'crosspilot', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];
                attributesToRemove.forEach(attr => {
                  if (html.hasAttribute(attr)) {
                    html.removeAttribute(attr);
                  }
                });
              };
              
              // Run immediately and also on DOM ready
              removeExtensionAttributes();
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeExtensionAttributes);
              }
            })();
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
