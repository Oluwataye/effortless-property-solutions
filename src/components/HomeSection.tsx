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
        background === "dark" ? "bg-primary text-white" : ""
      } ${className}`}
    >
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default HomeSection;