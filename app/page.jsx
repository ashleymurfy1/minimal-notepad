'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')
  const router = useRouter()

  const handleSave = async () => {
    if (!slug || !content) return alert('Slug dan isi catatan wajib diisi!')
    
    const { error } = await supabase.from('notes').insert([{ slug, content }])
    if (error) {
      alert('Gagal menyimpan: ' + error.message)
    } else {
      router.push(`/${slug}`)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono p-4 sm:p-8 flex flex-col">
      <div className="max-w-2xl w-full mx-auto flex flex-col flex-1">
        <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-3">
          <input
            type="text"
            placeholder="ketik-slug-url"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="bg-transparent border-b border-zinc-700 text-sm p-1 outline-none text-zinc-200 w-1/2 focus:border-zinc-400"
          />
          <button
            onClick={handleSave}
            className="text-xs bg-zinc-800 px-4 py-1.5 rounded text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
          >
            Simpan Catatan
          </button>
        </div>
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
