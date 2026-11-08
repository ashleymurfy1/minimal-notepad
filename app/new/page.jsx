'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function NewNote() {
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
    <div className="max-w-xl mx-auto p-4 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="ketik-slug-url"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="bg-transparent border-b border-zinc-700 text-sm p-1 outline-none text-zinc-200"
        />
        <button
          onClick={handleSave}
          className="text-xs bg-zinc-800 px-3 py-1 rounded text-zinc-300 hover:text-white border border-zinc-700"
        >
          Simpan
        </button>
      </div>
      <textarea
        placeholder="Tulis catatan Anda di sini..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full flex-1 bg-transparent resize-none outline-none text-sm text-zinc-300 leading-relaxed font-mono"
      />
    </div>
  )
}
