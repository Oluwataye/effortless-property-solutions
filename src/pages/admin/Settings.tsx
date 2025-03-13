
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatbotSettings from "@/components/admin/chatbot/ChatbotSettings";
import WebsiteSettings from "@/components/admin/settings/WebsiteSettings";
import AppearanceSettings from "@/components/admin/settings/AppearanceSettings";
import SeoSettings from "@/components/admin/settings/SeoSettings";
import { Globe, Palette, Bot, Search } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your website configuration and preferences
          </p>
        </div>

        <Tabs 
          defaultValue="general" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Chatbot</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <WebsiteSettings />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <AppearanceSettings />
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-4">
            <SeoSettings />
          </TabsContent>
          
          <TabsContent value="chatbot" className="space-y-4">
            <ChatbotSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
