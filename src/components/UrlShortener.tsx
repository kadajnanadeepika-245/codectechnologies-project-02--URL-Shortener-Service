
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, BarChart3, Copy, ExternalLink, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UrlForm from "./UrlForm";
import UrlList from "./UrlList";
import Analytics from "./Analytics";

export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  clickHistory: Array<{
    timestamp: string;
    userAgent: string;
    ip: string;
  }>;
}

const UrlShortener = () => {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedUrls = localStorage.getItem('shortened-urls');
    if (savedUrls) {
      setUrls(JSON.parse(savedUrls));
    }
  }, []);

  const saveUrls = (updatedUrls: ShortenedUrl[]) => {
    setUrls(updatedUrls);
    localStorage.setItem('shortened-urls', JSON.stringify(updatedUrls));
  };

  const generateShortCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const shortenUrl = (originalUrl: string) => {
    const shortCode = generateShortCode();
    const newUrl: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl,
      shortCode,
      shortUrl: `https://shrink.ly/${shortCode}`,
      clicks: 0,
      createdAt: new Date().toISOString(),
      clickHistory: []
    };

    const updatedUrls = [newUrl, ...urls];
    saveUrls(updatedUrls);

    toast({
      title: "🎉 URL Shortened Successfully!",
      description: "Your short URL has been created and copied to clipboard.",
    });

    // Copy to clipboard
    navigator.clipboard.writeText(newUrl.shortUrl);
  };

  const handleUrlClick = (id: string) => {
    const updatedUrls = urls.map(url => {
      if (url.id === id) {
        return {
          ...url,
          clicks: url.clicks + 1,
          clickHistory: [
            ...url.clickHistory,
            {
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              ip: '192.168.1.1'
            }
          ]
        };
      }
      return url;
    });
    saveUrls(updatedUrls);
  };

  const deleteUrl = (id: string) => {
    const updatedUrls = urls.filter(url => url.id !== id);
    saveUrls(updatedUrls);
    toast({
      title: "URL Deleted",
      description: "The shortened URL has been removed.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "📋 Copied!",
      description: "URL copied to clipboard.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="shorten" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-14 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
            <TabsTrigger 
              value="shorten" 
              className="flex items-center gap-2 text-sm font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              Shorten
            </TabsTrigger>
            <TabsTrigger 
              value="urls" 
              className="flex items-center gap-2 text-sm font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Link className="w-4 h-4" />
              My URLs
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 text-sm font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="shorten" className="animate-fade-in">
          <UrlForm onShortenUrl={shortenUrl} />
        </TabsContent>

        <TabsContent value="urls" className="animate-fade-in">
          <UrlList 
            urls={urls} 
            onUrlClick={handleUrlClick}
            onDeleteUrl={deleteUrl}
            onCopyUrl={copyToClipboard}
          />
        </TabsContent>

        <TabsContent value="analytics" className="animate-fade-in">
          <Analytics urls={urls} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UrlShortener;
