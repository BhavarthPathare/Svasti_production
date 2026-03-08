export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailHq: string;
  channelTitle: string;
}

export async function getYouTubeVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  
  if (!apiKey) {
    console.warn('YouTube API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.warn(`No video found for ID: ${videoId}`);
      return null;
    }

    const video = data.items[0];
    const snippet = video.snippet;
    
    return {
      id: videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnailUrl: snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
      thumbnailHq: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url,
      channelTitle: snippet.channelTitle,
    };
  } catch (error) {
    console.error('Error fetching YouTube video details:', error);
    return null;
  }
}

export async function getMultipleVideoDetails(videoIds: string[]): Promise<Map<string, YouTubeVideo>> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const results = new Map<string, YouTubeVideo>();
  
  if (!apiKey || videoIds.length === 0) {
    return results;
  }

  try {
    // YouTube API allows up to 50 IDs per request
    const idsString = videoIds.join(',');
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${idsString}&key=${apiKey}&part=snippet`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.items) {
      data.items.forEach((video: any) => {
        const snippet = video.snippet;
        results.set(video.id, {
          id: video.id,
          title: snippet.title,
          description: snippet.description,
          thumbnailUrl: snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
          thumbnailHq: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url,
          channelTitle: snippet.channelTitle,
        });
      });
    }
  } catch (error) {
    console.error('Error fetching multiple YouTube videos:', error);
  }

  return results;
}

// Helper to extract video ID from various YouTube URL formats
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
