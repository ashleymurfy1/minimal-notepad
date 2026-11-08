import './globals.css'

export const metadata = {
  title: 'Minimal Notepad',
  description: 'Catatan teks minimalis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
