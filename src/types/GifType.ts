export interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    },
    original: {
      url: string;
    }
  };
  user: {
    username: string;
    avatar_url: string;
    profile_url: string;
  };
}