"use client";

import type React from "react";

import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface Choice {
  id: string;
  text: string;
  nextNodeId?: string;
}

export interface DecisionProps {
  id: string;
  title?: string;
  description?: string;
  choices: Choice[];
  onChoiceSelect?: (choiceId: string, nextNodeId?: string) => void;
  onChoicesChange?: (choices: Choice[]) => void;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
}

export function Decision({
  id,
  title,
  description,
  choices: initialChoices = [],
  onChoiceSelect,
  onChoicesChange,
  onTitleChange,
  onDescriptionChange,
}: DecisionProps) {
  const [choices, setChoices] = useState<Choice[]>(initialChoices);
  const [editingChoiceId, setEditingChoiceId] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [localTitle, setLocalTitle] = useState(title || "");
  const [localDescription, setLocalDescription] = useState(description || "");

  const handleAddChoice = () => {
    const newChoice = {
      id: `choice-${Date.now()}`,
      text: "New choice",
    };
    const updatedChoices = [...choices, newChoice];
    setChoices(updatedChoices);
    onChoicesChange?.(updatedChoices);
    // Start editing the new choice immediately
    setEditingChoiceId(newChoice.id);
  };

  const handleRemoveChoice = (choiceId: string) => {
    const updatedChoices = choices.filter((choice) => choice.id !== choiceId);
    setChoices(updatedChoices);
    onChoicesChange?.(updatedChoices);
    if (editingChoiceId === choiceId) {
      setEditingChoiceId(null);
    }
  };

  const handleChoiceTextChange = (choiceId: string, text: string) => {
    const updatedChoices = choices.map((choice) =>
      choice.id === choiceId ? { ...choice, text } : choice
    );
    setChoices(updatedChoices);
    onChoicesChange?.(updatedChoices);
  };

  const handleChoiceClick = (choice: Choice) => {
    if (false) {
      onChoiceSelect?.(choice.id, choice.nextNodeId);
    } else {
      setEditingChoiceId(editingChoiceId === choice.id ? null : choice.id);
    }
  };

  const handleBlur = () => {
    setEditingChoiceId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, choiceId: string) => {
    if (e.key === "Enter") {
      setEditingChoiceId(null);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setLocalTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setLocalDescription(newDescription);
    onDescriptionChange?.(newDescription);
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto" data-decision-id={id}>
      {title !== undefined && (
        <div className="mb-2">
          {isEditingTitle ? (
            <Input
              value={localTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              className="font-mono text-amber-500 bg-black border-amber-500 focus-visible:ring-amber-500 animate-smooth-appear"
              autoFocus
            />
          ) : (
            <h2
              className="text-xl font-bold cursor-pointer font-mono text-amber-500 hover:bg-amber-900/30 p-1 transition-colors duration-200 ease-in-out"
              onClick={() => setIsEditingTitle(true)}
            >
              {localTitle}
            </h2>
          )}
        </div>
      )}

      {description !== undefined && (
        <div className="mb-4">
          {isEditingDescription ? (
            <Input
              value={localDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              onBlur={() => setIsEditingDescription(false)}
              onKeyDown={(e) =>
                e.key === "Enter" && setIsEditingDescription(false)
              }
              className="font-mono text-amber-500 bg-black border-amber-500 focus-visible:ring-amber-500 animate-smooth-appear"
              autoFocus
            />
          ) : (
            <p
              className="font-mono text-amber-500 hover:bg-amber-900/30 cursor-pointer p-1 transition-colors duration-200 ease-in-out"
              onClick={() => setIsEditingDescription(true)}
            >
              {localDescription}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {choices.map((choice) => (
          <div
            key={choice.id}
            className="relative group transition-all duration-300 ease-out hover:bg-amber-900/30 rounded-none"
          >
            {editingChoiceId === choice.id ? (
              <div className="flex items-center p-1 border-2 border-amber-500 bg-black animate-smooth-appear">
                <Input
                  value={choice.text}
                  onChange={(e) =>
                    handleChoiceTextChange(choice.id, e.target.value)
                  }
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, choice.id)}
                  className="w-full font-mono text-amber-500 bg-black border-amber-500 focus-visible:ring-amber-500"
                  autoFocus
                />
              </div>
            ) : (
              <Card
                className="cursor-pointer border-2 border-amber-500 bg-black rounded-none shadow-[4px_4px_0px_0px_rgba(245,158,11,0.5)] will-change-transform hover:translate-y-[-2px] transition-transform duration-300 ease-out group-hover:animate-float"
                onClick={() => handleChoiceClick(choice)}
              >
                <CardContent className="p-3 flex justify-between items-center">
                  <p className="font-mono text-amber-500">&gt; {choice.text}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveChoice(choice.id);
                    }}
                    className="text-amber-500 hover:text-amber-300 hover:bg-amber-900/30 transition-colors duration-200 ease-in-out"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove choice</span>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={handleAddChoice}
        className="w-full flex items-center justify-center gap-2 font-mono text-amber-500 bg-black border-2 border-amber-500 rounded-none hover:bg-amber-900/30 hover:text-amber-300 shadow-[4px_4px_0px_0px_rgba(245,158,11,0.5)] transition-all duration-300 ease-out hover:animate-float"
      >
        <PlusCircle className="h-4 w-4" />
        ADD CHOICE
      </Button>
    </div>
  );
}
