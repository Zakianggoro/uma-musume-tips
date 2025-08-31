"use client"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

type Tip = {
  id: number
  title: string
  content: string | null
  created_at: string
}

export default function Home() {
  const [tips, setTips] = useState<Tip[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    fetchTips()
  }, [])

  async function fetchTips() {
    const { data, error } = await supabase
      .from("tips")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching tips:", error)
    } else if (data) {
      setTips(data as Tip[]) // 👈 cast to Tip[]
    }
  }

  async function addTip(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from("tips").insert([
      { title, content }
    ])

    if (error) {
      console.error("Error inserting tip:", error)
    } else {
      setTitle("")
      setContent("")
      fetchTips()
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏇 Uma Tips</h1>

      {/* Add Tip Form */}
      <form onSubmit={addTip} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Tip
        </button>
      </form>

      {/* Tips List */}
      <ul className="space-y-4">
        {tips.map((tip) => (
          <li key={tip.id} className="border p-3 rounded shadow">
            <h2 className="font-semibold">{tip.title}</h2>
            <p className="text-sm text-gray-700">{tip.content}</p>
            <span className="text-xs text-gray-400">
              {new Date(tip.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
