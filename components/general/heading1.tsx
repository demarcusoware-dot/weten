import { cn } from "@/lib/utils";

interface textprops {
  text: string;
  className?: string;
}

export function Heading1(props: textprops) {
  return (
    <p
      className={cn(
        `
        text-base md:text-lg 
        text-gray-700 dark:text-gray-300 
        leading-relaxed 
      `,
        props.className
      )}
    >
      {props.text}
    </p>
  );
}
