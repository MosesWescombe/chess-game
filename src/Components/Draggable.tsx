import { useDraggable } from '@dnd-kit/core';

/**
 * Draggable wrapper for an element
 */
export function Draggable({ style, id, disabled, ...props }: any) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: id,
      disabled: disabled,
   });

   return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
         {props.children}
      </div>
   );
}
