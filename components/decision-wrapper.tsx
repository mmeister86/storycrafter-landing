"use client";

import { useState, useEffect, useRef } from "react";
import { Decision } from "./decision";
import type { Choice } from "./decision";

interface DecisionDemoWrapperProps {
  initialData?: any;
  onDataChange?: (data: any) => void;
  hideFrame?: boolean;
}

export function DecisionDemo({
  initialData,
  onDataChange,
  hideFrame = false,
}: DecisionDemoWrapperProps) {
  const [title, setTitle] = useState(initialData?.title || "Decision Point");
  const [description, setDescription] = useState(
    initialData?.description || "What will you do?"
  );
  const [choices, setChoices] = useState<Choice[]>(
    initialData?.choices || [
      { id: "choice-1", text: "First choice" },
      { id: "choice-2", text: "Second choice" },
    ]
  );

  // Use a ref to track if we should update the parent
  const shouldUpdateParent = useRef(false);

  // Initialize with initialData
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "Decision Point");
      setDescription(initialData.description || "What will you do?");
      setChoices(
        initialData.choices || [
          { id: "choice-1", text: "First choice" },
          { id: "choice-2", text: "Second choice" },
        ]
      );
    }
  }, [initialData]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    shouldUpdateParent.current = true;
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    shouldUpdateParent.current = true;
  };

  const handleChoicesChange = (updatedChoices: Choice[]) => {
    setChoices(updatedChoices);
    shouldUpdateParent.current = true;
  };

  // Only update parent when data actually changes
  useEffect(() => {
    if (shouldUpdateParent.current && onDataChange) {
      onDataChange({
        title,
        description,
        choices,
      });
      shouldUpdateParent.current = false;
    }
  }, [title, description, choices, onDataChange]);

  // If hideFrame is true, just render the Decision component
  if (hideFrame) {
    return (
      <Decision
        id="decision-editor"
        title={title}
        description={description}
        choices={choices}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
        onChoicesChange={handleChoicesChange}
      />
    );
  }

  // Otherwise, render with the full frame (for demo pages)
  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      <div className="bg-black p-6 border-4 border-amber-500 shadow-[8px_8px_0px_0px_rgba(245,158,11,0.5)] relative overflow-hidden transition-all duration-500 ease-out hover:shadow-[10px_10px_0px_0px_rgba(245,158,11,0.5)] will-change-transform">
        {/* CRT scan lines effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0)_100%)] bg-[length:100%_4px] z-10"></div>

        {/* CRT glow effect */}
        <div className="absolute inset-0 pointer-events-none bg-amber-500/5 z-0 animate-glow-pulse"></div>

        <div className="relative z-1">
          <Decision
            id="decision-demo"
            title={title}
            description={description}
            choices={choices}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onChoicesChange={handleChoicesChange}
          />
        </div>
      </div>
    </div>
  );
}
