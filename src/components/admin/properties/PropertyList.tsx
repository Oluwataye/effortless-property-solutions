import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash, Search, Eye, MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  category: string;
  status: string;
  image_urls?: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
  created_at: string;
}

interface PropertyListProps {
  properties: Property[];
  onDelete: (id: string) => void;
  onEdit: (property: Property) => void;
  isLoading?: boolean;
}

const getStatusBadge = (status: string) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", className: string }> = {
    available: { variant: "secondary", className: "bg-green-100 text-green-800 hover:bg-green-100" },
    sold: { variant: "destructive", className: "bg-red-100 text-red-800 hover:bg-red-100" },
    rented: { variant: "default", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  };
  
  const config = variants[status] || variants.available;
  return (
    <Badge variant={config.variant} className={config.className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const getCategoryBadge = (category: string) => {
  return (
    <Badge variant="outline" className="capitalize">
      {category}
    </Badge>
  );
};

const PropertyList = ({ properties, onDelete, onEdit, isLoading }: PropertyListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || property.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-20 h-20 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <CardTitle>Properties ({filteredProperties.length})</CardTitle>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your filters"
                : "Get started by adding your first property"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Property Details</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => (
                  <TableRow key={property.id} className="group">
                    <TableCell>
                      <Avatar className="h-16 w-16 rounded-lg">
                        <AvatarImage
                          src={property.image_urls?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200"}
                          alt={property.title}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg">
                          <Eye className="h-6 w-6 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {property.title}
                        </p>
                        {property.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {property.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{property.location || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-lg text-primary">
                        ${property.price?.toLocaleString() || "0"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3 text-sm text-muted-foreground">
                        <span>{property.bedrooms || 0} bed</span>
                        <span>•</span>
                        <span>{property.bathrooms || 0} bath</span>
                        <span>•</span>
                        <span>{property.area || 0} ft²</span>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(property.category)}</TableCell>
                    <TableCell>{getStatusBadge(property.status)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit(property)}
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onDelete(property.id)}
                          className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyList;