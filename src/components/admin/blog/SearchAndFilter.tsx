
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  statusFilter: string | null;
  onStatusFilterChange: (value: string) => void;
}

const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  onSearch,
  statusFilter,
  onStatusFilterChange
}: SearchAndFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <form onSubmit={onSearch} className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </form>
      
      <Tabs 
        defaultValue={statusFilter || "all"} 
        className="w-full sm:w-auto"
        onValueChange={onStatusFilterChange}
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SearchAndFilter;
