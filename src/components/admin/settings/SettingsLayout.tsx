
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

interface SettingsLayoutProps {
  title: string;
  description: string;
  loading: boolean;
  saving: boolean;
  saveSettings: () => Promise<void>;
  saveButtonText?: string;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  title,
  description,
  loading,
  saving,
  saveSettings,
  saveButtonText = "Save Changes",
  children
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button 
          onClick={saveSettings} 
          disabled={saving}
          className="ml-auto"
        >
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {saving ? "Saving..." : saveButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettingsLayout;
