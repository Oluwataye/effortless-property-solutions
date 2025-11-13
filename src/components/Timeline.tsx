import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "1990",
    title: "Founded with Vision & Purpose",
    description: "AMOVATE was established with a clear mission to transform the real estate and facility management industry through innovation and exceptional service.",
    image: "/lovable-uploads/5c944f9a-23a7-479d-8494-6f07c372cd0d.png"
  },
  {
    year: "1995",
    title: "Expansion to Global Markets",
    description: "Successfully expanded operations to international markets, establishing our first overseas offices and building strategic partnerships worldwide.",
    image: "/lovable-uploads/98efad21-72d2-4b1d-aabd-67bf3fdb4c01.png"
  },
  {
    year: "2000",
    title: "Industry Innovation Leadership",
    description: "Pioneered cutting-edge technologies and methodologies that set new standards across the industry, earning recognition as innovation leaders.",
    image: "/lovable-uploads/9adb1b79-3d06-43d3-88d9-6b64bb21dead.png"
  },
  {
    year: "2005",
    title: "Sustainable Practices Adoption",
    description: "Committed to environmental responsibility by implementing comprehensive sustainability practices across all operations and properties.",
    image: "/lovable-uploads/f7b9ebcd-345d-43ea-8ac9-200074af138c.png"
  },
  {
    year: "2010",
    title: "Digital Transformation",
    description: "Embraced digital technologies, implementing advanced systems for property management, client services, and operational efficiency.",
    image: "/lovable-uploads/5c944f9a-23a7-479d-8494-6f07c372cd0d.png"
  },
  {
    year: "2020",
    title: "Community Impact Programs",
    description: "Launched comprehensive community engagement initiatives, focusing on social responsibility and creating positive impact in the communities we serve.",
    image: "/lovable-uploads/98efad21-72d2-4b1d-aabd-67bf3fdb4c01.png"
  }
];

const Timeline = () => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>

            {/* Content */}
            <div className={`flex-1 pl-24 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
              <Card className="hover:shadow-xl transition-shadow duration-300 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-primary">{item.year}</span>
                  </div>
                  {item.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Spacer for opposite side */}
            <div className="hidden md:block flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
