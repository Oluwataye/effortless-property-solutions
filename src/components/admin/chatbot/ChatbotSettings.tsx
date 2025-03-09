
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const ChatbotSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    enabled: true,
    model: "gpt-4o",
    temperature: 0.7,
    autoSave: true,
    welcomeMessage: "Hello! I'm your real estate assistant. How can I help you today?"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("website_settings")
          .select("*")
          .eq("setting_key", "chatbot_settings")
          .single();

        if (error) {
          console.error("Error fetching chatbot settings:", error);
          return;
        }

        if (data && data.setting_value) {
          setSettings(data.setting_value as any);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("website_settings")
        .upsert(
          {
            setting_key: "chatbot_settings",
            setting_value: settings
          },
          { onConflict: "setting_key" }
        );

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save settings",
          variant: "destructive",
        });
        console.error("Error saving settings:", error);
      } else {
        toast({
          title: "Success",
          description: "Chatbot settings saved successfully",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chatbot Configuration</CardTitle>
          <CardDescription>Configure your customer support chatbot settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="chatbot-enabled" className="text-base">Enable Chatbot</Label>
              <p className="text-sm text-muted-foreground">Show the chatbot widget on your website</p>
            </div>
            <Switch
              id="chatbot-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings({ ...settings, enabled: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model-select">AI Model</Label>
            <Select
              value={settings.model}
              onValueChange={(value) => setSettings({ ...settings, model: value })}
            >
              <SelectTrigger id="model-select">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o (Most capable)</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o-mini (Faster, cheaper)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature-slider">Response Creativity: {settings.temperature.toFixed(1)}</Label>
            </div>
            <Slider
              id="temperature-slider"
              min={0}
              max={1}
              step={0.1}
              value={[settings.temperature]}
              onValueChange={(value) => setSettings({ ...settings, temperature: value[0] })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autosave-conversations" className="text-base">Auto-save Conversations</Label>
              <p className="text-sm text-muted-foreground">Store chat history for later review</p>
            </div>
            <Switch
              id="autosave-conversations"
              checked={settings.autoSave}
              onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
            />
          </div>

          <Button 
            className="w-full" 
            onClick={handleSaveSettings} 
            disabled={saving}
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotSettings;
