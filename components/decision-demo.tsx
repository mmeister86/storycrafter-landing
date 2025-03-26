"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import type { Choice } from "./decision";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Edit2, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortableList } from "./sortable-list";
import { AiButton } from "@/components/ui/ai-button";

export default function DecisionDemo() {
  const [title, setTitle] = useState("Placeholder Title");
  const [description, setDescription] = useState(
    "You arrive at a crossroads in your journey. Before you lies a mysterious door standing alone in the clearing, a winding path leading into a dense forest, and the road back to the village you came from. What do you choose to do?"
  );
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [choices, setChoices] = useState<Choice[]>([
    {
      id: "choice-1",
      text: "Go through the mysterious door",
      nextNodeId: "door-path",
    },
    {
      id: "choice-2",
      text: "Follow the winding path into the forest",
      nextNodeId: "forest-path",
    },
    {
      id: "choice-3",
      text: "Turn back and return to the village",
      nextNodeId: "village-path",
    },
  ]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [editingChoiceId, setEditingChoiceId] = useState<string | null>(null);
  const [choiceTextMap, setChoiceTextMap] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    // Initialize choiceTextMap with the initial choices
    const initialChoiceTextMap = choices.reduce(
      (acc: { [key: string]: string }, choice) => {
        acc[choice.id] = choice.text;
        return acc;
      },
      {}
    );
    setChoiceTextMap(initialChoiceTextMap);
  }, [choices]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleChoiceSelect = (choiceId: string, nextNodeId?: string) => {
    setSelectedChoice(choiceId);
    console.log(`Selected choice: ${choiceId}, Next node: ${nextNodeId}`);
  };

  const handleChoicesChange = (updatedChoices: Choice[]) => {
    setChoices(updatedChoices);
    console.log("Choices updated:", updatedChoices);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChoiceTextChange = useCallback(
    (choiceId: string, newText: string) => {
      setChoiceTextMap((prevMap) => ({ ...prevMap, [choiceId]: newText }));
    },
    []
  );

  const handleChoiceEdit = (choiceId: string) => {
    setEditingChoiceId(choiceId);
  };

  const handleChoiceEditBlur = () => {
    setEditingChoiceId(null);
    // Update the choices array with the new text values from choiceTextMap
    const updatedChoices = choices.map((choice) => {
      if (choiceTextMap[choice.id] !== undefined) {
        return { ...choice, text: choiceTextMap[choice.id] };
      }
      return choice;
    });
    setChoices(updatedChoices);
  };

  const handleChoiceKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    choiceId: string
  ) => {
    if (e.key === "Enter") {
      setEditingChoiceId(null);
      const updatedChoices = choices.map((choice) => {
        if (choiceTextMap[choice.id] !== undefined) {
          return { ...choice, text: choiceTextMap[choice.id] };
        }
        return choice;
      });
      setChoices(updatedChoices);
    }
  };

  if (!isVisible) {
    return (
      <div className="p-6 space-y-8 max-w-3xl mx-auto">
        <div className="bg-black p-6 border-4 border-amber-500 shadow-[8px_8px_0px_0px_rgba(245,158,11,0.5)] text-center">
          <p className="font-mono text-amber-500">DECISION BLOCK DELETED</p>
          <button
            onClick={() => setIsVisible(true)}
            className="mt-4 px-4 py-2 font-mono text-amber-500 bg-black border-2 border-amber-500 rounded-none hover:bg-amber-900/30 hover:text-amber-300 shadow-[4px_4px_0px_0px_rgba(245,158,11,0.5)]"
          >
            RESTORE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      <div className="bg-black p-6 border-4 border-amber-500 shadow-[8px_8px_0px_0px_rgba(245,158,11,0.5)] relative overflow-hidden">
        {/* AI Help button */}
        <AiButton onClick={() => {}} className="absolute top-2 right-12 z-20" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center font-mono text-amber-500 bg-black border-2 border-amber-500 rounded-none hover:bg-amber-900/30 hover:text-amber-300"
          aria-label="Close decision block"
        >
          <X size={16} />
        </button>

        {/* CRT scan lines effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0)_100%)] bg-[length:100%_4px] z-10"></div>

        {/* CRT glow effect */}
        <div className="absolute inset-0 pointer-events-none bg-amber-500/5 z-0"></div>

        <div className="relative z-1">
          {editingTitle ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
              className="text-2xl font-bold mb-6 font-mono text-amber-500 bg-black border-amber-500 focus-visible:ring-amber-500"
              autoFocus
            />
          ) : (
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer font-mono text-amber-500 p-2 hover:bg-amber-900/30 group flex items-center"
              onClick={() => setEditingTitle(true)}
            >
              <Edit2 className="h-4 w-4 mr-2 opacity-50 group-hover:opacity-100" />
              {title}
            </h2>
          )}

          {editingDescription ? (
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setEditingDescription(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  setEditingDescription(false);
                }
              }}
              className="mb-6 text-lg w-full font-mono text-amber-500 bg-black border-amber-500 focus-visible:ring-amber-500"
              rows={4}
              autoFocus
              placeholder="Press Enter to save, Shift+Enter for new line"
            />
          ) : (
            <div
              className="mb-6 text-lg cursor-pointer font-mono text-amber-500 p-2 hover:bg-amber-900/30 leading-relaxed group"
              onClick={() => setEditingDescription(true)}
            >
              <div className="flex items-start">
                <Edit2 className="h-4 w-4 mr-2 mt-1 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                <div title="Click to edit. Press Enter to save, Shift+Enter for new line">
                  {description}
                  <span
                    className={`inline-block w-2 h-4 ml-1 bg-amber-500 ${
                      cursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                  ></span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 w-full max-w-2xl mx-auto">
            <SortableList
              items={choices}
              getItemId={(choice) => choice.id}
              onReorder={setChoices}
              renderItem={(choice) => {
                const isEditing = editingChoiceId === choice.id;

                return (
                  <div className="font-mono text-amber-500 w-full flex justify-between items-center">
                    {isEditing ? (
                      <div className="flex items-center p-1 border-2 border-amber-500 bg-black w-full">
                        <Input
                          value={choiceTextMap[choice.id] || choice.text}
                          onChange={(e) =>
                            handleChoiceTextChange(choice.id, e.target.value)
                          }
                          onBlur={handleChoiceEditBlur}
                          onKeyDown={(e) => handleChoiceKeyDown(e, choice.id)}
                          className="w-full font-mono text-amber-500 bg-black border-amber-500 focus-visible:ring-amber-500"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div
                        className="flex-1 cursor-pointer hover:bg-amber-900/30 p-1"
                        onClick={() => handleChoiceEdit(choice.id)}
                      >
                        <p>&gt; {choice.text}</p>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedChoices = choices.filter(
                          (c) => c.id !== choice.id
                        );
                        setChoices(updatedChoices);
                        // Also remove from choiceTextMap
                        setChoiceTextMap((prevMap) => {
                          const { [choice.id]: removed, ...rest } = prevMap;
                          return rest;
                        });
                      }}
                      className="text-amber-500 hover:text-amber-300 hover:bg-amber-900/30"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove choice</span>
                    </Button>
                  </div>
                );
              }}
            />

            <Button
              variant="outline"
              onClick={() => {
                const newChoice = {
                  id: `choice-${Date.now()}`,
                  text: "New choice",
                  nextNodeId: `path-${Date.now()}`,
                };
                setChoices([...choices, newChoice]);
                setChoiceTextMap((prevMap) => ({
                  ...prevMap,
                  [newChoice.id]: newChoice.text,
                }));
              }}
              className="w-full flex items-center justify-center gap-2 font-mono text-amber-500 bg-black border-2 border-amber-500 rounded-none hover:bg-amber-900/30 hover:text-amber-300 shadow-[4px_4px_0px_0px_rgba(245,158,11,0.5)]"
            >
              <PlusCircle className="h-4 w-4" />
              ADD CHOICE
            </Button>
          </div>

          {selectedChoice && (
            <div className="mt-6 p-4 border-2 border-amber-500 bg-black">
              <p className="font-mono text-amber-500">
                SELECTED: {choices.find((c) => c.id === selectedChoice)?.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
