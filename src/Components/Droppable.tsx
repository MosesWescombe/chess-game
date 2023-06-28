import { useDroppable } from '@dnd-kit/core';

/**
 * Droppable wrapper for an element
 */
export function Droppable({ id, style, ...props }: any) {
   const { isOver, setNodeRef } = useDroppable({
      id: id,
   });

   return (
      <div ref={setNodeRef} style={style}>
         {props.children}
      </div>
   );
}
