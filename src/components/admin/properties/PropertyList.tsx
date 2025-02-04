import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  category: string;
  status: string;
}

interface PropertyListProps {
  properties: Property[];
  onDelete: (id: string) => void;
  onEdit: (property: Property) => void;
}

const PropertyList = ({ properties, onDelete, onEdit }: PropertyListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties?.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.title}</TableCell>
            <TableCell>{property.location}</TableCell>
            <TableCell>${property.price?.toLocaleString()}</TableCell>
            <TableCell className="capitalize">{property.category}</TableCell>
            <TableCell className="capitalize">{property.status}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(property)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(property.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropertyList;