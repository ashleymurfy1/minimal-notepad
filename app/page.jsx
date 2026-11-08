'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const generateSlug = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!content.trim()) return alert('Catatan masih kosong!')

    setLoading(true)
    const slug = generateSlug()

    const { error } = await supabase
      .from('notes')
      .insert([{ slug, content }])

    if (error) {
      console.error(error)
      alert('Gagal menyimpan catatan.')
      setLoading(false)
    } else {
      router.push(`/${slug}`)
    }
  }

  return (
    <div className="flex flex-col h-[85vh] w-full">
      <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
        <h1 className="text-sm font-bold tracking-wider uppercase text-zinc-400">New Note</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-zinc-200 hover:bg-white text-zinc-900 text-xs font-bold px-4 py-2 rounded transition"
        >
          {loading ? 'Saving...' : 'Save Note'}
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis catatanmu di sini..."
        className="flex-1 w-full p-2 text-sm text-zinc-200 focus:ring-0 leading-relaxed"
      />
    </div>
  )
}
