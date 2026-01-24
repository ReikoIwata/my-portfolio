export type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
};

// 今後、Projectなどもここに追加していく
export type Project = {
  id: number;
  title: string;
  description: string;
  // ...
};
