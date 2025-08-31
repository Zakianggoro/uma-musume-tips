"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Character {
  id: string;
  name: string;
  image: string;
  overall: string;
  ease: string;
  cm: string;
  t_trials: string;
  turf: string;
  dirt: string;
  sprint: string;
  mile: string;
  med: string;
  long: string;
  front: string;
  pace: string;
  late: string;
  end: string;
  spd: string;
  sta: string;
  pow: string;
  gut: string;
  wit: string;
  unique_skill: string;
  innate_skills: string[];
  potential_skills: string[];
  training_tips: string[];
}

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    name: "",
    image: "",
    overall: "",
    ease: "",
    cm: "",
    t_trials: "",
    turf: "",
    dirt: "",
    sprint: "",
    mile: "",
    med: "",
    long: "",
    front: "",
    pace: "",
    late: "",
    end: "",
    spd: "",
    sta: "",
    pow: "",
    gut: "",
    wit: "",
    unique_skill: "",
    innate_skills: "",
    potential_skills: "",
    training_tips: "",
  });

  // 🔹 Fetch session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // 🔹 Fetch characters
  async function fetchCharacters() {
    setLoading(true);
    const { data, error } = await supabase.from("characters").select("*");
    if (error) console.error(error);
    else setCharacters(data as Character[]);
    setLoading(false);
  }

  useEffect(() => {
    if (session) {
      fetchCharacters();
    }
  }, [session]);

  // 🔹 Add new character
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("characters").insert([
      {
        ...formData,
        innate_skills: formData.innate_skills.split(",").map((s: string) => s.trim()),
        potential_skills: formData.potential_skills.split(",").map((s: string) => s.trim()),
        training_tips: formData.training_tips.split(",").map((s: string) => s.trim()),
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("✅ Character added!");
      setFormData({
        name: "",
        image: "",
        overall: "",
        ease: "",
        cm: "",
        t_trials: "",
        turf: "",
        dirt: "",
        sprint: "",
        mile: "",
        med: "",
        long: "",
        front: "",
        pace: "",
        late: "",
        end: "",
        spd: "",
        sta: "",
        pow: "",
        gut: "",
        wit: "",
        unique_skill: "",
        innate_skills: "",
        potential_skills: "",
        training_tips: "",
      });
      fetchCharacters();
    }
  }

  // 🔹 Delete character
  async function deleteCharacter(id: string) {
    const { error } = await supabase.from("characters").delete().eq("id", id);
    if (error) {
      alert(error.message);
    } else {
      setCharacters((prev) => prev.filter((char) => char.id !== id));
      alert("✅ Character deleted!");
    }
  }

  // 🔹 Auth
  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email: prompt("Email") || "",
      password: prompt("Password") || "",
    });
    if (error) alert(error.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!session) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 rounded">
          Login
        </button>
      </main>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded">
          Logout
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-lg space-y-4 max-h-[80vh] overflow-y-scroll mb-8"
      >
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.replace("_", " ")}
            className="w-full p-2 rounded text-black"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
        ))}

        <button type="submit" className="px-4 py-2 bg-green-600 rounded w-full">
          Save
        </button>
      </form>

      {/* Character list */}
      <h2 className="text-xl font-semibold mb-4">Characters</h2>
      {loading ? (
        <p>Loading...</p>
      ) : characters.length === 0 ? (
        <p>No characters yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {characters.map((char) => (
            <div key={char.id} className="bg-gray-800 p-4 rounded-lg shadow">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-lg font-semibold">{char.name}</h3>
              <p className="text-sm text-gray-400">Overall: {char.overall}</p>
              <button
                onClick={() => deleteCharacter(char.id)}
                className="mt-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
