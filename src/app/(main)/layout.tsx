import Footer from '@/components/global/Footer'
import Header from '@/components/global/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <div className="grow p-4">{children}</div>
      <Footer />
    </>
  )
}
