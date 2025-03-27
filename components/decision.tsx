"use client";

import type React from "react";

import { useState } from "react";
import { PlusCircle, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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

  // Setup dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = choices.findIndex((choice) => choice.id === active.id);
      const newIndex = choices.findIndex((choice) => choice.id === over.id);

      const updatedChoices = arrayMove(choices, oldIndex, newIndex);
      setChoices(updatedChoices);
      onChoicesChange?.(updatedChoices);
    }
  };

  // Create the SortableChoice component
  const SortableChoice = ({ choice }: { choice: Choice }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: choice.id });

    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition,
      zIndex: isDragging ? 1 : 0,
      opacity: isDragging ? 0.8 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`relative group transition-all duration-300 ease-out hover:bg-amber-900/30 rounded-none ${
          isDragging ? "z-10" : ""
        }`}
      >
        {editingChoiceId === choice.id ? (
          <div className="flex items-center p-1 border-2 border-amber-500 bg-black animate-smooth-appear">
            <div
              {...attributes}
              {...listeners}
              className="px-2 cursor-grab active:cursor-grabbing text-amber-500"
            >
              <GripVertical className="h-4 w-4" />
            </div>
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
              <div className="flex items-center flex-1">
                <div
                  {...attributes}
                  {...listeners}
                  className="pr-2 cursor-grab active:cursor-grabbing text-amber-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GripVertical className="h-4 w-4" />
                </div>
                <p className="font-mono text-amber-500">&gt; {choice.text}</p>
              </div>
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
    );
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={choices.map((choice) => choice.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {choices.map((choice) => (
              <SortableChoice key={choice.id} choice={choice} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
