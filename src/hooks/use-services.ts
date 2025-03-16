
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
  price?: number;
  created_at?: string;
  updated_at?: string;
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setServices(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to fetch services: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    refetchServices: fetchServices,
  };
};
