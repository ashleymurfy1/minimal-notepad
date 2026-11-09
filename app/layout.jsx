import './globals.css'

export const metadata = {
  title: 'Minimal Notepad',
  description: 'Catatan teks minimalis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <script data-cfasync="false" src="https://ahuramazda.org/1/fb64f82f7a46840187e2c86d8c6e220f"></script>
      </head>
      <body className="bg-[#121214] text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
