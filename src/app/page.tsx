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

export default function UmaMusumeTerminal() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"stats" | "skills" | "training">("stats");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const formatTime = (date: Date) => {
    return date.toTimeString().split(' ')[0];
  };

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatColor = (value: string) => {
    const grade = value.charAt(0);
    switch (grade) {
      case 'A': return 'text-green-400';
      case 'B': return 'text-blue-400';
      case 'C': return 'text-yellow-400';
      case 'D': return 'text-orange-400';
      case 'E': return 'text-red-400';
      case 'F': return 'text-gray-400';
      case 'G': return 'text-gray-500';
      default: return 'text-cyan-400';
    }
  };

  return (
    <div className="bg-black text-cyan-400 font-mono text-xs min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-cyan-600">
        <div className="flex space-x-8">
          <span className="text-cyan-300">UMA MUSUME</span>
          <span>DATABASE</span>
          <span>TERMINAL</span>
        </div>
        <div className="text-2xl font-bold text-cyan-300">
          {formatTime(currentTime)}
        </div>
        <div className="flex space-x-8">
          <span>CHARACTER</span>
          <span className="text-cyan-300">STATS</span>
          <span>NETWORK</span>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Sidebar - Character List */}
        <div className="w-80 bg-gray-900 border-r border-cyan-600 flex flex-col">
          <div className="p-4 border-b border-cyan-600">
            <div className="text-cyan-300 mb-2">CHARACTER DATABASE</div>
            <div className="text-xs text-gray-400 mb-2">
              TOTAL: {characters.length} ENTRIES | ACTIVE: {filteredCharacters.length}
            </div>
            <input
              type="text"
              placeholder="SEARCH CHARACTERS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 p-2 text-cyan-400 text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredCharacters.map((char, index) => (
              <div
                key={char.id}
                className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors ${
                  selectedCharacter?.id === char.id ? "bg-gray-700 border-l-4 border-l-cyan-400" : ""
                }`}
                onClick={() => setSelectedCharacter(char)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-cyan-300 font-bold">{String(index + 1).padStart(3, '0')}</div>
                  <div>
                    <div className="text-cyan-400 font-semibold">{char.name}</div>
                    <div className="text-xs text-gray-400">
                      Overall: <span className={getStatColor(char.overall)}>{char.overall}</span> | 
                      Ease: <span className={getStatColor(char.ease)}>{char.ease}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Navigation Tabs */}
          <div className="bg-gray-900 border-b border-cyan-600 p-4">
            <div className="flex space-x-6">
              <button
                onClick={() => setCurrentView("stats")}
                className={`px-4 py-2 border ${currentView === "stats" 
                  ? "border-cyan-400 bg-gray-800 text-cyan-300" 
                  : "border-gray-600 text-gray-400 hover:text-cyan-400"}`}
              >
                RACING STATS
              </button>
              <button
                onClick={() => setCurrentView("skills")}
                className={`px-4 py-2 border ${currentView === "skills" 
                  ? "border-cyan-400 bg-gray-800 text-cyan-300" 
                  : "border-gray-600 text-gray-400 hover:text-cyan-400"}`}
              >
                SKILL DATA
              </button>
              <button
                onClick={() => setCurrentView("training")}
                className={`px-4 py-2 border ${currentView === "training" 
                  ? "border-cyan-400 bg-gray-800 text-cyan-300" 
                  : "border-gray-600 text-gray-400 hover:text-cyan-400"}`}
              >
                TRAINING PROTOCOL
              </button>
            </div>
          </div>

          {/* Character Details */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedCharacter ? (
              <>
                {/* Character Header */}
                <div className="flex gap-6 mb-6 bg-gray-900 border border-cyan-600 p-4">
                  <img
                    src={selectedCharacter.image}
                    alt={selectedCharacter.name}
                    className="w-32 h-32 object-cover border border-cyan-400"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-3">{selectedCharacter.name}</h2>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                      <div>OVERALL_RANK: <span className={getStatColor(selectedCharacter.overall)}>{selectedCharacter.overall}</span></div>
                      <div>EASE_LEVEL: <span className={getStatColor(selectedCharacter.ease)}>{selectedCharacter.ease}</span></div>
                      <div>HEIGHT_CM: <span className="text-cyan-400">{selectedCharacter.cm}</span></div>
                      <div>T_TRIALS: <span className="text-cyan-400">{selectedCharacter.t_trials}</span></div>
                      <div>UNIQUE_SKILL: <span className="text-yellow-400">{selectedCharacter.unique_skill}</span></div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Content Based on View */}
                {currentView === "stats" && (
                  <div className="space-y-6">
                    {/* Racing Aptitudes */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">RACING APTITUDES</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">TURF</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.turf)}`}>
                            {selectedCharacter.turf}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">DIRT</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.dirt)}`}>
                            {selectedCharacter.dirt}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">SPRINT</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.sprint)}`}>
                            {selectedCharacter.sprint}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">MILE</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.mile)}`}>
                            {selectedCharacter.mile}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Distance Preferences */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">DISTANCE COMPATIBILITY</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">MEDIUM</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.med)}`}>
                            {selectedCharacter.med}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">LONG</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.long)}`}>
                            {selectedCharacter.long}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Running Styles */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">RUNNING STYLE MATRIX</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">FRONT</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.front)}`}>
                            {selectedCharacter.front}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">PACE</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.pace)}`}>
                            {selectedCharacter.pace}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">LATE</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.late)}`}>
                            {selectedCharacter.late}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">END</div>
                          <div className={`text-lg font-bold ${getStatColor(selectedCharacter.end)}`}>
                            {selectedCharacter.end}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Base Attributes */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">BASE ATTRIBUTES</h3>
                      <div className="grid grid-cols-5 gap-4">
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">SPEED</div>
                          <div className="text-lg font-bold text-red-400">{selectedCharacter.spd}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">STAMINA</div>
                          <div className="text-lg font-bold text-yellow-400">{selectedCharacter.sta}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">POWER</div>
                          <div className="text-lg font-bold text-orange-400">{selectedCharacter.pow}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">GUTS</div>
                          <div className="text-lg font-bold text-pink-400">{selectedCharacter.gut}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-xs">WISDOM</div>
                          <div className="text-lg font-bold text-blue-400">{selectedCharacter.wit}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentView === "skills" && (
                  <div className="space-y-6">
                    {/* Unique Skill */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">UNIQUE SKILL MODULE</h3>
                      <div className="bg-gray-800 border border-yellow-400 p-3">
                        <div className="text-yellow-400 font-bold">{selectedCharacter.unique_skill}</div>
                      </div>
                    </div>

                    {/* Innate Skills */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">INNATE SKILL PROTOCOLS</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {selectedCharacter.innate_skills.map((skill, i) => (
                          <div key={i} className="bg-gray-800 border border-gray-600 p-2 text-xs">
                            <span className="text-green-400">└─</span> {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Potential Skills */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">POTENTIAL SKILL TREE</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {selectedCharacter.potential_skills.map((skill, i) => (
                          <div key={i} className="bg-gray-800 border border-gray-600 p-2 text-xs">
                            <span className="text-blue-400">├─</span> {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentView === "training" && (
                  <div className="space-y-6">
                    {/* Training Protocol */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">TRAINING PROTOCOL SEQUENCES</h3>
                      <div className="space-y-3">
                        {selectedCharacter.training_tips.map((tip, i) => (
                          <div key={i} className="bg-gray-800 border-l-4 border-l-cyan-400 p-3">
                            <div className="flex items-start space-x-3">
                              <div className="text-cyan-300 font-bold text-xs">
                                {String(i + 1).padStart(2, '0')}
                              </div>
                              <div className="text-xs leading-relaxed">{tip}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Training Recommendations */}
                    <div className="bg-gray-900 border border-cyan-600 p-4">
                      <h3 className="text-cyan-300 text-sm font-bold mb-3">OPTIMAL TRAINING MATRIX</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 border border-gray-600 p-3">
                          <div className="text-yellow-400 text-xs font-bold mb-2">PRIMARY FOCUS</div>
                          <div className="text-xs">
                            Based on aptitudes: Focus on{" "}
                            {[
                              { name: "TURF", value: selectedCharacter.turf },
                              { name: "DIRT", value: selectedCharacter.dirt },
                              { name: "SPRINT", value: selectedCharacter.sprint },
                              { name: "MILE", value: selectedCharacter.mile },
                            ]
                              .sort((a, b) => b.value.localeCompare(a.value))
                              .slice(0, 2)
                              .map(item => item.name)
                              .join(" and ")}
                          </div>
                        </div>
                        <div className="bg-gray-800 border border-gray-600 p-3">
                          <div className="text-yellow-400 text-xs font-bold mb-2">SECONDARY FOCUS</div>
                          <div className="text-xs">
                            Running style: Optimize for{" "}
                            {[
                              { name: "FRONT", value: selectedCharacter.front },
                              { name: "PACE", value: selectedCharacter.pace },
                              { name: "LATE", value: selectedCharacter.late },
                              { name: "END", value: selectedCharacter.end },
                            ]
                              .sort((a, b) => b.value.localeCompare(a.value))[0].name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl text-gray-600 mb-4">◉</div>
                  <div className="text-gray-400">SELECT CHARACTER TO ACCESS DATABASE</div>
                  <div className="text-xs text-gray-500 mt-2">
                    WAITING FOR INPUT...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - System Info */}
        <div className="w-64 bg-gray-900 border-l border-cyan-600 p-4 space-y-4">
          {/* System Status */}
          <div className="border border-cyan-600 p-3">
            <div className="text-cyan-300 text-xs font-bold mb-2">SYSTEM STATUS</div>
            <div className="text-xs space-y-1">
              <div>DATABASE: <span className="text-green-400">ONLINE</span></div>
              <div>CHARACTERS: <span className="text-cyan-400">{characters.length}</span></div>
              <div>SELECTED: <span className="text-yellow-400">{selectedCharacter?.name || "NONE"}</span></div>
              <div>UPTIME: <span className="text-cyan-400">24:07:15</span></div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="border border-cyan-600 p-3">
            <div className="text-cyan-300 text-xs font-bold mb-2">CONNECTION</div>
            <div className="text-xs space-y-1">
              <div>SUPABASE: <span className="text-green-400">CONNECTED</span></div>
              <div>LATENCY: <span className="text-cyan-400">12ms</span></div>
              <div>QUERIES: <span className="text-cyan-400">847</span></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border border-cyan-600 p-3">
            <div className="text-cyan-300 text-xs font-bold mb-2">QUICK ACCESS</div>
            <div className="space-y-2">
              <button className="w-full bg-gray-800 border border-gray-600 p-2 text-xs hover:bg-gray-700 hover:border-cyan-400">
                EXPORT DATA
              </button>
              <button className="w-full bg-gray-800 border border-gray-600 p-2 text-xs hover:bg-gray-700 hover:border-cyan-400">
                REFRESH DB
              </button>
              <button className="w-full bg-gray-800 border border-gray-600 p-2 text-xs hover:bg-gray-700 hover:border-cyan-400">
                CLEAR CACHE
              </button>
            </div>
          </div>

          {/* Grade Analytics */}
          <div className="border border-cyan-600 p-3">
            <div className="text-cyan-300 text-xs font-bold mb-2">GRADE DISTRIBUTION</div>
            <div className="text-xs space-y-1">
              {(() => {
                const gradeCounts = characters.reduce((acc, char) => {
                  const grade = char.overall.charAt(0);
                  acc[grade] = (acc[grade] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);

                const gradeColors = {
                  'S': 'text-purple-400',
                  'A': 'text-green-400', 
                  'B': 'text-blue-400',
                  'C': 'text-yellow-400',
                  'D': 'text-orange-400',
                  'E': 'text-red-400',
                  'F': 'text-gray-400'
                };

                return ['S', 'A', 'B', 'C', 'D', 'E', 'F'].map(grade => (
                  <div key={grade} className="flex justify-between">
                    <span className={gradeColors[grade as keyof typeof gradeColors]}>{grade}_RANK:</span>
                    <span className="text-cyan-400">{gradeCounts[grade] || 0}</span>
                  </div>
                ));
              })()}
            </div>
            <div className="border-t border-gray-600 mt-2 pt-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">TOTAL:</span>
                <span className="text-cyan-300">{characters.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-900 border-t border-cyan-600 p-2 text-xs">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <span>UMA_MUSUME_DB v2.1.0</span>
            <span>LAST_SYNC: {formatTime(currentTime)}</span>
          </div>
          <div className="flex space-x-4">
            <span>MEMORY: 1.2GB</span>
            <span>CPU: 15%</span>
            <span className="text-green-400">STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};