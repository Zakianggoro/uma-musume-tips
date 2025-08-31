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

export default function MainPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("characters").select("*");
      if (error) console.error(error);
      else setCharacters(data as Character[]);
    }
    fetchData();
  }, []);

  return (
    <main className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Uma Musume Characters</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {characters.map((c) => (
          <div key={c.id} className="bg-gray-800 p-4 rounded-lg">
            <img src={c.image} alt={c.name} className="rounded mb-2" />
            <h2 className="text-xl font-bold">{c.name}</h2>
            <p>Overall: {c.overall}</p>
            <p>Ease: {c.ease}</p>
            <p>Unique Skill: {c.unique_skill}</p>
            <p className="text-sm text-gray-300">
              Innate: {c.innate_skills?.join(", ")}
            </p>
            <p className="text-sm text-gray-300">
              Potential: {c.potential_skills?.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
