import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceSelectorProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  services: Array<{
    category: string;
  }>;
}

const ServiceSelector = ({ selectedCategory, onCategoryChange, services }: ServiceSelectorProps) => {
  return (
    <Select onValueChange={onCategoryChange} value={selectedCategory}>
      <SelectTrigger 
        className="w-full max-w-md mx-auto text-xl border-b-2 border-red-600 
          rounded-none bg-transparent hover:bg-gray-50 transition-colors
          focus:ring-0 focus:ring-offset-0 focus:border-red-700"
      >
        <SelectValue placeholder="Select a service" />
      </SelectTrigger>
      <SelectContent 
        className="w-full max-w-md bg-white border border-gray-200 shadow-lg
          rounded-sm mt-1 overflow-hidden"
      >
        {services.map((service) => (
          <SelectItem 
            key={service.category} 
            value={service.category}
            className="text-lg py-4 px-6 hover:bg-gray-50 cursor-pointer
              border-b border-gray-100 last:border-b-0
              transition-colors duration-200 ease-in-out"
          >
            {service.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ServiceSelector;