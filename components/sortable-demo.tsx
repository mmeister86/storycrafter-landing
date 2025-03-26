"use client";

import { useState } from "react";
import { SortableList } from "./sortable-list";
import { X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiButton } from "@/components/ui/ai-button";

interface StoryItem {
  id: string;
  content: string;
  type: "story" | "choice" | "condition";
}

export default function SortableDemo() {
  const [items, setItems] = useState<StoryItem[]>([
    {
      id: "item-1",
      content: "Introduction: The player arrives at the ancient temple",
      type: "story",
    },
    {
      id: "item-2",
      content: "Player must decide whether to enter the temple",
      type: "choice",
    },
    {
      id: "item-3",
      content:
        "If player has the ancient key, they can unlock the secret chamber",
      type: "condition",
    },
    {
      id: "item-4",
      content: "Player encounters the temple guardian",
      type: "story",
    },
    {
      id: "item-5",
      content: "Player must choose to fight or negotiate with the guardian",
      type: "choice",
    },
  ]);

  const [isVisible, setIsVisible] = useState(true);

  const handleReorder = (newItems: StoryItem[]) => {
    setItems(newItems);
    console.log("Items reordered:", newItems);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <div className="p-6 space-y-8 max-w-3xl mx-auto">
        <div className="bg-black p-6 border-4 border-amber-500 shadow-[8px_8px_0px_0px_rgba(245,158,11,0.5)] text-center">
          <p className="font-mono text-amber-500">SORTABLE LIST DELETED</p>
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
          aria-label="Close sortable list"
        >
          <X size={16} />
        </button>

        {/* CRT scan lines effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0)_100%)] bg-[length:100%_4px] z-10"></div>

        {/* CRT glow effect */}
        <div className="absolute inset-0 pointer-events-none bg-amber-500/5 z-0"></div>

        <div className="relative z-1">
          <h2 className="text-2xl font-bold mb-6 font-mono text-amber-500 p-2">
            STORY FLOW
          </h2>

          <p className="mb-4 font-mono text-amber-500">
            Drag and drop items to reorder your story elements. This determines
            the flow of your adventure.
          </p>

          <SortableList
            items={items}
            getItemId={(item) => item.id}
            onReorder={handleReorder}
            renderItem={(item) => (
              <div className="font-mono text-amber-500 flex items-center">
                <div
                  className={`
                  w-3 h-3 rounded-full mr-3
                  ${
                    item.type === "story"
                      ? "bg-amber-500"
                      : item.type === "choice"
                      ? "bg-emerald-500"
                      : "bg-purple-500"
                  }
                `}
                ></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-xs uppercase mr-2 opacity-70">
                      {item.type}:
                    </span>
                    {item.content}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-amber-500 hover:text-amber-300 hover:bg-amber-900/30"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          />

          <div className="mt-4 p-4 border-2 border-amber-500 bg-black">
            <p className="font-mono text-amber-500 text-sm">
              <span className="text-amber-300">TIP:</span> Drag items using the
              grip handle on the left. You can use keyboard (Tab + Space + Arrow
              keys) for accessibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
