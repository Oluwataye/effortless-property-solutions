import React from "react";

interface HomeSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  background?: "light" | "dark";
}

const HomeSection = ({
  title,
  children,
  className = "",
  background = "light",
}: HomeSectionProps) => {
  return (
    <section
      className={`py-20 ${
        background === "dark" ? "bg-primary text-white" : "bg-white"
      } ${className}`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default HomeSection;