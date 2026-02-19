import { cn } from "../../lib/utils ";

interface textprops {
  className?: string;
  text: string;
}

export function Text(props: textprops) {
  return (
    <p
      className={cn(
        `
        text-sm md:text-lg   tracking-wide 
      `,
        props.className
      )}
    >
      {props.text}
    </p>
  );
}
