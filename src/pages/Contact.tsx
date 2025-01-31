import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6">
            <CardContent>
              <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-secondary">123 Business Street<br />London, UK</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent>
              <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-secondary">+44 123 456 7890</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent>
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-secondary">info@amovate.com</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-accent rounded"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-accent rounded"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 border border-accent rounded"
                  required
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;