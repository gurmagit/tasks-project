export interface Task {
  title: string;
  content: string;
  author: User['username'];
  date: Date;
}

export interface User {
  username: string;
  password: string;
}
