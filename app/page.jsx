import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-xl font-bold mb-2">Minimal Notepad</h1>
      <p className="text-xs text-zinc-500 mb-4">Buat dan bagikan catatan teks minimalis Anda.</p>
      <Link href="/new" className="text-xs text-zinc-300 underline hover:text-white">
        &larr; Buat catatan baru
      </Link>
    </div>
  )
}
