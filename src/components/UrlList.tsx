
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Trash2, BarChart3 } from "lucide-react";
import { ShortenedUrl } from "./UrlShortener";

interface UrlListProps {
  urls: ShortenedUrl[];
  onUrlClick: (id: string) => void;
  onDeleteUrl: (id: string) => void;
  onCopyUrl: (url: string) => void;
}

const UrlList = ({ urls, onUrlClick, onDeleteUrl, onCopyUrl }: UrlListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  if (urls.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="text-center py-12">
          <ExternalLink className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No URLs yet</h3>
          <p className="text-gray-500">Start by shortening your first URL!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Your Shortened URLs ({urls.length})
          </CardTitle>
        </CardHeader>
      </Card>

      {urls.map((url) => (
        <Card key={url.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-blue-600 truncate">
                    {url.shortUrl}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCopyUrl(url.shortUrl)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">
                  {truncateUrl(url.originalUrl)}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Created: {formatDate(url.createdAt)}</span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {url.clicks} clicks
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onUrlClick(url.id);
                    window.open(url.originalUrl, '_blank');
                  }}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Visit
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopyUrl(url.shortUrl)}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeleteUrl(url.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UrlList;
