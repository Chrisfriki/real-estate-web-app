import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '¿Cuánto vale mi casa en Valencia y provincia? | Casa Fácil',
  description:
    'Descubre el precio real de tu vivienda en Valencia y provincia. Valoración gratuita, sin robots: un asesor local cruza datos catastrales reales para ofrecerte una estimación precisa.',
  generator: 'v0.app',
  alternates: {
    canonical: 'https://www.valoratucasafacil.es/',
  },
  openGraph: {
    title: '¿Cuánto vale tu casa? Valoración gratuita sin robots | Casa Fácil',
    description:
      'Un asesor local cruza datos catastrales reales y te ofrece un informe personalizado. Sin robots, sin estimaciones erróneas.',
    url: 'https://www.valoratucasafacil.es/',
    siteName: 'Casa Fácil',
    images: [
      {
        url: 'https://www.valoratucasafacil.es/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Casa Fácil - Valoración de viviendas en Valencia y provincia',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Cuánto vale tu casa? Valoración gratuita | Casa Fácil',
    description: 'Asesor local + datos catastrales reales. Valoración personalizada sin estimaciones automáticas.',
    images: ['https://www.valoratucasafacil.es/og-image.png'],
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/apple-icon.png',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Casa Fácil - Soluciones Inmobiliarias',
  description:
    'Agencia inmobiliaria local especializada en valoración y venta de viviendas en Valencia y provincia',
  url: 'https://www.valoratucasafacil.es',
  telephone: '+34647679553',
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
        text: 'No. La valoración es completamente gratuita y sin compromiso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo me contactáis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un asesor de tu zona te llama en cuanto revisa tu solicitud y cruza los datos catastrales de tu vivienda.',
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
        text: 'Cubrimos toda la provincia de Valencia. Si tienes dudas, llámanos al 647 67 95 53.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia hay entre nuestra valoración y la de los portales inmobiliarios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las valoraciones automáticas son una buena referencia inicial, pero no siempre tienen en cuenta el estado real del inmueble, las reformas, las calidades o las operaciones cerradas más recientes en tu zona. En Casa Fácil complementamos los datos catastrales con información de compraventas recientes y un análisis más detallado de las características de la vivienda para ofrecerte una estimación más ajustada al mercado.',
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
