import { cn } from "../../lib/utils ";

interface headingprops {
  text: string;
  className?: string;
}

export default function Heading2(props: headingprops) {
  return (
    <h3
      className={cn(
        `text-5xl md:text-4xl text-left font-extrabold tracking-wide `,
        props.className
      )}
    >
      {props.text}
    </h3>
  );
}
