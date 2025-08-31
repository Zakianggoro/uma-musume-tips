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
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    async function fetchCharacters() {
      const { data, error } = await supabase.from("characters").select("*");
      if (error) console.error(error);
      else {
        setCharacters(data as Character[]);
        if (data && data.length > 0) setSelectedCharacter(data[0]);
      }
    }
    fetchCharacters();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Uma Musume Characters</h1>

      <div className="flex flex-1 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 overflow-y-auto">
          <ul>
            {characters.map((char) => (
              <li
                key={char.id}
                className={`cursor-pointer px-4 py-3 border-b border-gray-700 hover:bg-gray-700 ${
                  selectedCharacter?.id === char.id ? "bg-gray-700 font-semibold" : ""
                }`}
                onClick={() => setSelectedCharacter(char)}
              >
                {char.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Detail Panel */}
        <section className="flex-1 bg-gray-800 p-6 overflow-y-auto">
          {selectedCharacter ? (
            <>
              <div className="flex gap-6 mb-6">
                <img
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  className="w-48 h-48 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <h2 className="text-4xl font-bold mb-2">{selectedCharacter.name}</h2>
                  <p>Overall: {selectedCharacter.overall}</p>
                  <p>Ease: {selectedCharacter.ease}</p>
                  <p>Height: {selectedCharacter.cm} cm</p>
                  <p>Trials: {selectedCharacter.t_trials}</p>
                  <p>Unique Skill: {selectedCharacter.unique_skill}</p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <p>🏇 Turf: {selectedCharacter.turf}</p>
                <p>🌋 Dirt: {selectedCharacter.dirt}</p>
                <p>⚡ Sprint: {selectedCharacter.sprint}</p>
                <p>🏃 Mile: {selectedCharacter.mile}</p>
                <p>🏞️ Medium: {selectedCharacter.med}</p>
                <p>🌌 Long: {selectedCharacter.long}</p>
                <p>🚀 Front: {selectedCharacter.front}</p>
                <p>🏁 Pace: {selectedCharacter.pace}</p>
                <p>🎯 Late: {selectedCharacter.late}</p>
                <p>🔥 End: {selectedCharacter.end}</p>
              </div>

              {/* Attributes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <p>Speed: {selectedCharacter.spd}</p>
                <p>Stamina: {selectedCharacter.sta}</p>
                <p>Power: {selectedCharacter.pow}</p>
                <p>Guts: {selectedCharacter.gut}</p>
                <p>Wisdom: {selectedCharacter.wit}</p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold text-xl mb-2">Innate Skills</h3>
                <ul className="list-disc list-inside text-sm">
                  {selectedCharacter.innate_skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-xl mb-2">Potential Skills</h3>
                <ul className="list-disc list-inside text-sm">
                  {selectedCharacter.potential_skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">Training Tips</h3>
                <ul className="list-disc list-inside text-sm">
                  {selectedCharacter.training_tips.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Select a character to see details</p>
          )}
        </section>
      </div>
    </main>
  );
}
