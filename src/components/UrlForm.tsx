
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Zap, Shield, BarChart3, Globe } from "lucide-react";

interface UrlFormProps {
  onShortenUrl: (url: string) => void;
}

const UrlForm = ({ onShortenUrl }: UrlFormProps) => {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setIsValid(false);
      return;
    }

    const urlToValidate = url.startsWith('http') ? url : `https://${url}`;
    
    if (!validateUrl(urlToValidate)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    onShortenUrl(urlToValidate);
    setUrl("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
        <CardHeader className="text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shorten Your URL
            </span>
          </CardTitle>
          <p className="text-gray-600 text-lg mt-2">
            Paste your long URL below and get a shortened link instantly
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="https://your-very-long-url-here.com/with/many/parameters"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setIsValid(true);
                  }}
                  className={`h-16 text-lg pl-6 pr-6 rounded-xl border-2 transition-all duration-300 ${
                    !isValid 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-200 hover:border-blue-300 focus:border-blue-500 bg-white'
                  } placeholder:text-gray-400`}
                />
                <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
              {!isValid && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <Shield className="w-4 h-4" />
                  <span>Please enter a valid URL (e.g., https://example.com)</span>
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Zap className="w-6 h-6 mr-3" />
              Shorten URL Now
            </Button>
          </form>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-blue-900">Track Performance</h3>
              </div>
              <p className="text-blue-700 text-sm">
                Monitor clicks, geographic data, and user engagement in real-time
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Link2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-purple-900">Clean Links</h3>
              </div>
              <p className="text-purple-700 text-sm">
                Professional, branded short links perfect for social media sharing
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-500 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-indigo-900">100% Free</h3>
              </div>
              <p className="text-indigo-700 text-sm">
                No registration required. Start shortening URLs immediately
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlForm;
