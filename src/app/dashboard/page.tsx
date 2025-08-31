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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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

    if (error) alert(error.message);
    else alert("Character added!");
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

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-lg space-y-4 max-h-[80vh] overflow-y-scroll"
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
    </main>
  );
}
