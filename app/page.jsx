'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSave = async () => {
    if (!title || !content) {
      alert('Judul dan isi konten wajib diisi!')
      return
    }

    // Membuat slug otomatis dari judul (misal: "Catatan Baru" jadi "catatan-baru")
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const { error } = await supabase.from('notes').insert([{ slug, content: `# ${title}\n\n${content}` }])
    
    if (error) {
      alert('Gagal menyimpan: ' + error.message)
    } else {
      router.push(`/${slug}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans p-6 sm:p-12 flex flex-col justify-between">
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-1">
        
        {/* Header / Tombol Masuk */}
        <div className="flex justify-between items-center mb-10 text-sm">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 bg-zinc-200 rounded-sm"></div>
          </div>
          <div className="text-zinc-400 hover:text-white cursor-pointer transition-colors text-xs">
            Masuk
          </div>
        </div>

        {/* Input Judul */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-2xl sm:text-3xl font-semibold outline-none text-zinc-100 placeholder:text-zinc-600"
          />
        </div>

        {/* Textarea Konten */}
        <div className="flex-1 flex flex-col">
          <textarea
            placeholder="Add content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 bg-transparent resize-none outline-none text-sm text-zinc-300 placeholder:text-zinc-600 leading-relaxed font-mono"
          />
        </div>

      </div>

      {/* Bagian Bawah (Footer & Tombol Buat Tempelan) */}
      <div className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-zinc-800/60 text-xs text-zinc-500 gap-4">
        <div className="flex items-center gap-6">
          <span>Opsi</span>
          <span className="hover:text-zinc-300 cursor-pointer">Edit kode</span>
        </div>
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
          <span className="hover:text-zinc-300 cursor-pointer hidden sm:inline">Sisipkan templat</span>
          <button
            onClick={handleSave}
            className="bg-[#3b36df] hover:bg-[#322dc4] text-white px-5 py-2 rounded-lg font-medium transition-all shadow-sm"
          >
            Buat tempelan
          </button>
        </div>
      </div>
    </div>
  )
}
