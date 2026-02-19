import { cn } from "@/lib/utils";

interface highprops {
  text: string;
  className?: string;
}

export function HighlightText(props: highprops) {
  return (
    <span
      className={cn(
        `
        px-3 py-1 rounded-full 
        bg-miaccent  text-card  
        font-semibold  
      `,
        props.className
      )}
    >
      {props.text}
    </span>
  );
}
