export type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  image_url?: string;
  github_url?: string;
  site_url?: string;
  created_at: string;
};

export interface Profile {
  id?: number;
  fullName: string;
  title: string;
  bio: string;
  image_url?: string;
  githubUrl?: string;
  twitterUrl?: string;
}
