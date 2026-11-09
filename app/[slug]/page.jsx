import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// Fungsi otomatis untuk mendeteksi URL dan menjadikannya link yang bisa diklik
function renderContentWithLinks(text) {
  if (!text) return null
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlRegex)

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300 break-all"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

export default async function NotePage({ params }) {
  const { slug } = params

  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !notes) {
    return (
      <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans p-6 sm:p-12 flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold mb-2">Catatan tidak ditemukan</h1>
        <Link href="/" className="text-xs text-zinc-400 underline hover:text-white">
          &larr; Kembali ke Beranda
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(notes.created_at).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans p-6 sm:p-12 flex flex-col justify-between">
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-1">
        
        {/* Header / Navigasi Atas */}
        <div className="flex justify-between items-center mb-10 text-xs text-zinc-400">
          <div>
            Dibuat: {formattedDate}
          </div>
          <Link href="/" className="hover:text-white underline transition-colors">
            + Catatan Baru
          </Link>
        </div>

        {/* Isi Konten Catatan */}
        <div className="flex-1 whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed font-mono">
          {renderContentWithLinks(notes.content)}
        </div>

      </div>

      {/* Footer */}
      <div className="max-w-4xl w-full mx-auto pt-6 border-t border-zinc-800/60 text-xs text-zinc-600 flex justify-between">
        <span>Minimal Notepad</span>
        <Link href="/" className="hover:text-zinc-400">Buat tempelan sendiri</Link>
      </div>
    </div>
  )
}
