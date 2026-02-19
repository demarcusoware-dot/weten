"use client";
import { TestimonialCard } from "@/components/hero/testimonialcard";

const testimonials = [
  {
    message:
      "This app helped me find a hostel in minutes. The experience was smooth and easy.",
    author: "Sarah Owusu",
  },
  {
    message: "Excellent service! The UI is clean and beautiful. I love it.",
    author: "Michael Amankwah",
  },
  {
    message: "I started using the app and am already, and it Wow!",
    author: "Ansah Debrina",
  },
  {
    message: "Saves alot of time and effort . like i can scroll all day.",
    author: "Osei Poku ",
  },
  {
    message: "I do not need a thirdman if there is a website i can trust .",
    author: "Benedicta Asuo",
  },
];

export default function TestimonialsSection() {
  return (
    <div
      id="testimonials"
      className="w-full  mx-auto p-6 space-y-6 my-30 md:max-w-[85%] "
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 items-center gap-8 mt-10 md:max-w-[95%] md:mx-auto ">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} message={t.message} author={t.author} />
        ))}
      </div>
    </div>
  );
}
