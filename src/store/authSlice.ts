import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done";
  createdAt: string;
}

export interface User {
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  projects: Project[];
}

const initialProjects: Project[] = [
  {
    id: "proj-1",
    name: "React 19 Upgrade",
    description: "Upgrade practice app components to React 19 and ensure compatibility with React Compiler.",
    priority: "high",
    status: "in_progress",
    createdAt: "2026-06-01",
  },
  {
    id: "proj-2",
    name: "Redux Integration Setup",
    description: "Configure central store and design slices for feature management and user state.",
    priority: "medium",
    status: "done",
    createdAt: "2026-06-03",
  },
  {
    id: "proj-3",
    name: "Tailwind V4 Refactoring",
    description: "Migrate styling from Tailwind v3 utilities to the new v4 post-css optimized system.",
    priority: "low",
    status: "todo",
    createdAt: "2026-06-08",
  },
];

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  projects: initialProjects,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.user = {
        username: action.payload,
        email: `${action.payload.toLowerCase().replace(/\s+/g, "")}@example.com`,
        role: action.payload.toLowerCase() === "admin" ? "Administrator" : "Developer",
      };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    addProject(state, action: PayloadAction<Omit<Project, "id" | "createdAt">>) {
      const newProject: Project = {
        ...action.payload,
        id: `proj-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      state.projects.unshift(newProject);
    },
    updateProject(state, action: PayloadAction<Project>) {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
  },
});

export const { login, logout, addProject, updateProject, deleteProject } = authSlice.actions;
export default authSlice.reducer;
