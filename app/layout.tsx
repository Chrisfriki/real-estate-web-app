import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '¿Cuánto vale mi casa en la Comunidad Valenciana? | Casa Fácil',
  description:
    'Descubre el precio real de tu vivienda en Valencia, Alicante o Castellón. Valoración gratuita, sin robots: un asesor local te llama en menos de 24h con datos catastrales reales.',
  generator: 'v0.app',
  alternates: {
    canonical: 'https://www.casafacil.es/',
  },
  openGraph: {
    title: '¿Cuánto vale tu casa? Valoración gratuita en 24h | Casa Fácil',
    description:
      'Un asesor local cruza datos catastrales reales y te llama en menos de 24h. Sin robots, sin estimaciones erróneas.',
    url: 'https://www.casafacil.es/',
    siteName: 'Casa Fácil',
    images: [
      {
        url: 'https://www.casafacil.es/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Casa Fácil - Valoración de viviendas en la Comunidad Valenciana',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Cuánto vale tu casa? Valoración gratuita | Casa Fácil',
    description: 'Asesor local + datos catastrales reales. Te llamamos en 24h.',
    images: ['https://www.casafacil.es/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Casa Fácil - Soluciones Inmobiliarias',
  description:
    'Agencia inmobiliaria local especializada en valoración y venta de viviendas en la Comunidad Valenciana',
  url: 'https://www.casafacil.es',
  telephone: '+34961221468',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avinguda del Nord, 31',
    addressLocality: 'Picassent',
    postalCode: '46220',
    addressCountry: 'ES',
  },
  areaServed: ['Valencia', 'Alicante', 'Castellón'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '227',
    bestRating: '5',
  },
}

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿La valoración de mi vivienda tiene algún coste?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La valoración es completamente gratuita y sin compromiso. Si decides no vender, el informe es tuyo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo me contactáis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un asesor de tu zona te llama en menos de 24 horas laborables tras recibir tu solicitud.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Estoy obligado a vender si pido la valoración?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Puedes pedir la valoración con total libertad. Si decides no vender, el informe es tuyo sin ningún coste ni compromiso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Operáis en mi municipio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cubrimos toda la Comunidad Valenciana: Valencia, Alicante y Castellón. Si tienes dudas, llámanos al 961 22 14 68.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia hay entre vuestra valoración y las automáticas de Idealista o Fotocasa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las valoraciones automáticas se equivocan hasta un 30% porque no tienen en cuenta el estado real del inmueble ni las ventas concretas de tu calle. Nosotros cruzamos datos catastrales reales con ventas recientes en tu zona.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} bg-slate-50`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
        />
      </head>
      <body className="bg-slate-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
