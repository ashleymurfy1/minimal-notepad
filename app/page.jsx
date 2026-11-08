'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const router = useRouter()

  const handleGenerateAndSave = async () => {
    if (!slug || !content) {
      alert('Slug dan isi catatan wajib diisi!')
      return
    }

    // Simpan ke Supabase
    const { error } = await supabase.from('notes').insert([{ slug, content }])
    
    if (error) {
      alert('Gagal menyimpan: ' + error.message)
    } else {
      // Buat link lengkap otomatis
      const fullLink = `${window.location.origin}/${slug}`
      setGeneratedLink(fullLink)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono p-4 sm:p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full flex flex-col flex-1">
        
        {/* Header & Input Slug */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
          <input
            type="text"
            placeholder="ketik-slug-url (cth: catatanku)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-xs px-3 py-2 rounded outline-none text-zinc-200 w-full sm:w-1/2 focus:border-zinc-400"
          />
          <button
            onClick={handleGenerateAndSave}
            className="text-xs bg-zinc-800 px-4 py-2 rounded text-zinc-200 hover:text-white hover:bg-zinc-700 border border-zinc-700 transition-all font-medium"
          >
            Generate Link
          </button>
        </div>

        {/* Kotak Hasil Link Jika Berhasil Digenerate */}
        {generatedLink && (
          <div className="mb-4 p-3 bg-zinc-900 border border-zinc-800 rounded flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-xs text-zinc-400 truncate w-full sm:w-auto">{generatedLink}</span>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink)
                  alert('Link berhasil disalin!')
                }}
                className="text-xs bg-zinc-800 px-3 py-1 rounded text-zinc-300 hover:text-white border border-zinc-700"
              >
                Salin Link
              </button>
              <button
                onClick={() => router.push(`/${slug}`)}
                className="text-xs bg-zinc-700 px-3 py-1 rounded text-white hover:bg-zinc-600"
              >
                Buka
              </button>
            </div>
          </div>
        )}

        {/* Area Textarea */}
        <textarea
          placeholder="Tulis catatan minimalis Anda di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full flex-1 bg-transparent resize-none outline-none text-sm text-zinc-300 leading-relaxed"
        />
      </div>
    </div>
  )
}
