import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" style={{height: '100%'}}>
      <Head />
      <body style={{margin: 0, height: '100%'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
