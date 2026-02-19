import { cn } from "@/lib/utils";

interface mutedprops {
  text: string;
  className?: string;
}

export function NormalText2(props: mutedprops) {
  return (
    <p
      className={cn(
        `
        text-sm md:text-base 
        text-gray-500 dark:text-gray-400 
        leading-snug 
      `,
        props.className
      )}
    >
      {props.text}
    </p>
  );
}
