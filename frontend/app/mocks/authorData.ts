import type { AuthorDetail } from "~/types/author";

export const authors: AuthorDetail[] = [
  {
    username: "ajohnson",
    full_name: "Alice Johnson",
    profile_image: new URL("https://randomuser.me/api/portraits/women/1.jpg"),
    email: "alice.johnson@example.com",
    bio: "Tech journalist with a passion for AI and robotics.",
  },
  {
    username: "bobsmith",
    full_name: "Bob Smith",
    profile_image: new URL("https://randomuser.me/api/portraits/men/2.jpg"),
    email: "bob.smith@example.com",
    bio: "Freelance writer covering politics and global affairs.",
  },
  {
    username: "cardia",
    full_name: "Carla Diaz",
    profile_image: new URL("https://randomuser.me/api/portraits/women/3.jpg"),
    email: "carla.diaz@example.com",
    bio: "Environmentalist journalist and sustainability advocate.",
  },
];
