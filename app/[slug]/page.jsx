import { supabase } from '@/lib/supabase'
import Link from 'next/link'

async function getNote(slug) {
  const { data, error } = await supabase
    .from('notes')
    .select('content, created_at')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

export default async function NotePage({ params }) {
  const { slug } = params
  const note = await getNote(slug)

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h2 className="text-lg font-bold mb-2">Catatan Tidak Ditemukan</h2>
        <p className="text-xs text-zinc-500 mb-4">Catatan mungkin sudah dihapus atau URL salah.</p>
        <Link href="/" className="text-xs text-zinc-300 underline hover:text-white">
          &larr; Buat catatan baru
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[85vh] w-full">
      <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
        <span className="text-xs text-zinc-500">
          Dibuat: {new Date(note.created_at).toLocaleString()}
        </span>
        <Link
          href="/"
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded transition"
        >
          + Catatan Baru
        </Link>
      </div>
      
      <pre className="flex-1 w-full p-2 text-sm text-zinc-200 whitespace-pre-wrap font-mono overflow-y-auto">
        {note.content}
      </pre>
    </div>
  )
}
