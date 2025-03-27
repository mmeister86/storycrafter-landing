"use client";
import { useState } from "react";
import type React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2">
      <Card className="border-2 border-amber-500 bg-black rounded-none shadow-[4px_4px_0px_0px_rgba(245,158,11,0.5)]">
        <CardContent className="p-3 flex items-center">
          <div
            className="cursor-grab mr-2 text-amber-500 hover:text-amber-300 p-1 hover:bg-amber-900/30 rounded-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5" />
          </div>
          {isDragging ? (
            <div className="flex-1 h-6 border border-dashed border-amber-500/50"></div>
          ) : (
            <div className="flex-1">{children}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface SortableListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getItemId: (item: T) => string;
  onReorder: (items: T[]) => void;
}

export function SortableList<T>({
  items,
  renderItem,
  getItemId,
  onReorder,
}: SortableListProps<T>) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
        tolerance: 5,
        delay: 50,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => getItemId(item) === active.id);
      const newIndex = items.findIndex((item) => getItemId(item) === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }

    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(getItemId)}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {items.map((item) => (
            <SortableItem key={getItemId(item)} id={getItemId(item)}>
              {renderItem(item)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>

      <DragOverlay
        adjustScale={false}
        dropAnimation={{
          duration: 300,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {activeId ? (
          <div className="w-full max-w-2xl">
            {renderItem(items.find((item) => getItemId(item) === activeId)!)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
