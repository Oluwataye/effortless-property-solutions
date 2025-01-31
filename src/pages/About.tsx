import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Target } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "John Doe",
      role: "CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    {
      name: "Jane Smith",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      name: "Mike Johnson",
      role: "Property Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <section className="mb-20">
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">About Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6">
              <CardContent>
                <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-secondary">
                  To provide exceptional real estate and facility management solutions that exceed client expectations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <p className="text-secondary">
                  Integrity, excellence, and innovation in everything we do.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                <p className="text-secondary">
                  Dedicated professionals committed to your success.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="text-center p-4">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-secondary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;