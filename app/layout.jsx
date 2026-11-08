import './globals.css'

export const metadata = {
  title: 'Minimal Notepad',
  description: 'Simple text notepad',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#121212] text-[#e0e0e0] min-h-screen flex flex-col justify-between font-mono">
        <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4">
          {children}
        </main>
        <footer className="text-center py-4 text-xs text-zinc-600">
          Minimal Notepad &mdash; Powered by Vercel & Supabase
        </footer>
      </body>
    </html>
  )
}
