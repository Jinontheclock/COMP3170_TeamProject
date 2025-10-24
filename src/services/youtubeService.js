class YouTubeService {
  constructor() {
    // 환경 변수에서 API 키 가져오기, 없으면 하드코딩된 키 사용
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyAyMl7DW2MY3H186sbJ43_FkHiAH4z93FI';
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
    
    // 디버깅을 위한 로그
    console.log('YouTube API Key:', this.apiKey);
    console.log('Environment variables:', import.meta.env);
  }

  // 음악 검색
  async searchMusic(query, maxResults = 20) {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=${maxResults}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching music:', error);
      throw error;
    }
  }

  // 인기 음악 동영상 가져오기
  async getPopularMusic(maxResults = 20) {
    try {
      const response = await fetch(
        `${this.baseUrl}/videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=10&maxResults=${maxResults}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching popular music:', error);
      throw error;
    }
  }

  // 특정 동영상 정보 가져오기
  async getVideoDetails(videoId) {
    try {
      const response = await fetch(
        `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching video details:', error);
      throw error;
    }
  }

  // 재생 시간을 초 단위로 변환
  parseDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    return hours * 3600 + minutes * 60 + seconds;
  }

  // 초를 MM:SS 형식으로 변환
  formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // 조회수를 포맷팅
  formatViewCount(viewCount) {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }

  // 좋아요 수를 포맷팅
  formatLikeCount(likeCount) {
    const count = parseInt(likeCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }

  // YouTube 동영상 URL 생성
  getVideoUrl(videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  // YouTube 임베드 URL 생성
  getEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // 썸네일 URL 가져오기
  getThumbnailUrl(thumbnails, quality = 'medium') {
    if (!thumbnails) return '/default-thumbnail.png';
    
    return thumbnails[quality]?.url || 
           thumbnails.medium?.url || 
           thumbnails.default?.url || 
           '/default-thumbnail.png';
  }

  // 음악 장르별 검색
  async searchMusicByGenre(genre, maxResults = 20) {
    const query = `${genre} music`;
    return this.searchMusic(query, maxResults);
  }

  // 최신 음악 검색
  async getLatestMusic(maxResults = 20) {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?part=snippet&q=music&type=video&videoCategoryId=10&order=date&maxResults=${maxResults}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching latest music:', error);
      throw error;
    }
  }
}

export default new YouTubeService();
