export interface NavStories {
  id: string;
  title: string;
  icon: any;
  sharedLink?: string;
}

export interface StoryInterface {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
  updated_at: string;
  cover_image: string | null;
  icon: string | null;
  json: any;
}
