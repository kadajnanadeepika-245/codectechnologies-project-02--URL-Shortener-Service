
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Link, Clock } from "lucide-react";
import { ShortenedUrl } from "./UrlShortener";

interface AnalyticsProps {
  urls: ShortenedUrl[];
}

const Analytics = ({ urls }: AnalyticsProps) => {
  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const averageClicks = totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;
  
  const topPerformingUrls = [...urls]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  const recentActivity = urls
    .flatMap(url => 
      url.clickHistory.map(click => ({
        url: url.shortUrl,
        originalUrl: url.originalUrl,
        timestamp: click.timestamp,
        userAgent: click.userAgent
      }))
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateUrl = (url: string, maxLength: number = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  if (totalUrls === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No analytics yet</h3>
          <p className="text-gray-500">Create some URLs to see analytics data!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Link className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total URLs</p>
                <p className="text-2xl font-bold">{totalUrls}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold">{totalClicks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Clicks</p>
                <p className="text-2xl font-bold">{averageClicks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                <p className="text-2xl font-bold">{recentActivity.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing URLs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Performing URLs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topPerformingUrls.length > 0 ? (
              <div className="space-y-4">
                {topPerformingUrls.map((url, index) => (
                  <div key={url.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{truncateUrl(url.shortUrl)}</p>
                        <p className="text-xs text-gray-500">{truncateUrl(url.originalUrl, 30)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{url.clicks}</p>
                      <p className="text-xs text-gray-500">clicks</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No clicks yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                    <div>
                      <p className="font-medium text-sm">{truncateUrl(activity.url)}</p>
                      <p className="text-xs text-gray-500">{truncateUrl(activity.originalUrl, 35)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
