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
      else setCharacters(data as Character[]);
    }
    fetchCharacters();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Uma Musume Characters</h1>

      {/* Character Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <div
            key={char.id}
            className="bg-gray-800 rounded-lg shadow-lg p-4 cursor-pointer hover:scale-105 transition"
            onClick={() => setSelectedCharacter(char)}
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="mt-2 text-lg font-semibold text-center">
              {char.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Detail Panel (Modal) */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full relative overflow-y-auto max-h-[80vh]">
            <button
              className="absolute top-2 right-2 text-red-400 hover:text-red-600"
              onClick={() => setSelectedCharacter(null)}
            >
              ✖
            </button>

            <div className="flex gap-4">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-2xl font-bold">{selectedCharacter.name}</h2>
                <p>Overall: {selectedCharacter.overall}</p>
                <p>Ease: {selectedCharacter.ease}</p>
                <p>Height: {selectedCharacter.cm} cm</p>
                <p>Trials: {selectedCharacter.t_trials}</p>
                <p>Unique Skill: {selectedCharacter.unique_skill}</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-4 grid grid-cols-2 gap-2">
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
            <div className="mt-4 grid grid-cols-2 gap-2">
              <p>Speed: {selectedCharacter.spd}</p>
              <p>Stamina: {selectedCharacter.sta}</p>
              <p>Power: {selectedCharacter.pow}</p>
              <p>Guts: {selectedCharacter.gut}</p>
              <p>Wisdom: {selectedCharacter.wit}</p>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <h3 className="font-semibold">Innate Skills</h3>
              <ul className="list-disc list-inside text-sm">
                {selectedCharacter.innate_skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Potential Skills</h3>
              <ul className="list-disc list-inside text-sm">
                {selectedCharacter.potential_skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Training Tips</h3>
              <ul className="list-disc list-inside text-sm">
                {selectedCharacter.training_tips.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
