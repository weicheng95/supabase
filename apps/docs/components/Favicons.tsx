import type { AlternateLinkDescriptor } from 'next/dist/lib/metadata/types/alternative-urls-types'
import Head from 'next/head'

import { alternates, metadata } from '~/features/robots/metadata'
import { favicons } from '~/features/ui/favicons/faviconData'

const decamelize = (s: string) => {
  let result = s
  const matches = s.matchAll(/(?<=[a-z])([A-Z])/g)

  for (const match of matches) {
    result = result.replace(match[0], `-${match[1].toLowerCase()}`)
  }

  return result
}

const convertToString = (altDescriptor: string | URL | Array<AlternateLinkDescriptor>) => {
  switch (true) {
    case typeof altDescriptor === 'string':
      return altDescriptor
    case altDescriptor instanceof URL:
      return altDescriptor.toString()
    default:
      /**
       * [Charis] Should probably map through these but we don't use this so
       * not going to bother for now
       */
      return altDescriptor[0].url instanceof URL
        ? altDescriptor[0].url.toString()
        : altDescriptor[0].url
  }
}

const Favicons = () => {
  const alts = alternates.alternates?.types

  return (
    <Head>
      {favicons.map(({ url: href, rel, type, sizes }) => (
        <link key={href} rel={rel} href={href} {...(type && { type })} {...(sizes && { sizes })} />
      ))}
      {Object.keys(metadata).map((key) => (
        <meta key={key} name={decamelize(key)} content={metadata[key]} />
      ))}
      {!!alts &&
        Object.keys(alts).map((key) => {
          const url = alts[key]
          return !!url ? <link rel="alternate" type={key} href={convertToString(url)} /> : null
        })}
    </Head>
  )
}

export default Favicons
