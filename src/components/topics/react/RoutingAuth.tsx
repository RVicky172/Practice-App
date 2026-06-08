import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MemoryRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";

import { AppDispatch, RootState } from "../../../store";
import {
  login,
  logout,
  addProject,
  updateProject,
  deleteProject,
  Project,
} from "../../../store/authSlice";

// ==========================================
// ROUTE GUARDS (PUBLIC & PROTECTED)
// ==========================================

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    // If already logged in, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// ==========================================
// ROUTE 1: PUBLIC LANDING PAGE
// ==========================================

const LandingPage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="space-y-6">
      <div className="text-center py-8 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50">
        <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100/60 rounded-full uppercase tracking-wider">
          Public Route
        </span>
        <h3 className="mt-4 text-3xl font-extrabold text-slate-800 tracking-tight">
          React Router & Redux Authentication
        </h3>
        <p className="mt-2 text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Welcome to the client-side routing demo. This sandbox runs a simulated web app inside a virtual browser using Redux for auth status and project data.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-sm"
          >
            {isAuthenticated ? "Go to Dashboard" : "Sign In to Test Guarding"}
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition"
          >
            Try Protected Dashboard
          </Link>
        </div>
      </div>

      {/* Visual Explanation of Routing */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-lg font-semibold text-slate-800">How routing & guards work here</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mx-auto mb-2">1</div>
            <h5 className="font-semibold text-sm text-slate-700">Client-Side Router</h5>
            <p className="text-xs text-slate-500 mt-1">
              `MemoryRouter` handles routing stack locally, making url updates visible in the mock address bar.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold mx-auto mb-2">2</div>
            <h5 className="font-semibold text-sm text-slate-700">Redux Auth Sync</h5>
            <p className="text-xs text-slate-500 mt-1">
              Route guards query Redux selectors (`isAuthenticated`). Changing auth state instantly triggers redirects.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mx-auto mb-2">3</div>
            <h5 className="font-semibold text-sm text-slate-700">Protected Dummy Data</h5>
            <p className="text-xs text-slate-500 mt-1">
              Access to dummy projects data is restricted. Login populates state, logout cleans up active session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ROUTE 2: PUBLIC LOGIN PAGE
// ==========================================

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // Get path user tried to access, default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username or select a quick option.");
      return;
    }
    dispatch(login(username));
    navigate(from, { replace: true });
  };

  const handleQuickLogin = (userOption: string) => {
    dispatch(login(userOption));
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="text-center space-y-1 mb-6">
        <span className="px-3 py-1 text-xs font-semibold text-amber-600 bg-amber-100/60 rounded-full uppercase tracking-wider">
          Public Gate Route
        </span>
        <h3 className="text-2xl font-bold text-slate-800 pt-2">Sign In</h3>
        <p className="text-slate-500 text-sm">Sign in to unlock protected routes & mock database</p>
      </div>

      {location.state?.from && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100 flex items-center gap-2">
          <span>⚠️</span>
          <span>
            You must log in to view <strong>{location.state.from.pathname}</strong>
          </span>
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            placeholder="Enter name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition text-sm"
        >
          Sign In
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">Quick Accounts</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleQuickLogin("Developer User")}
          className="p-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-left hover:bg-slate-50 transition"
        >
          <p className="font-semibold text-xs text-slate-700">Developer</p>
          <p className="text-[10px] text-slate-400">Regular access</p>
        </button>
        <button
          onClick={() => handleQuickLogin("Admin")}
          className="p-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-left hover:bg-slate-50 transition"
        >
          <p className="font-semibold text-xs text-slate-700">Admin</p>
          <p className="text-[10px] text-slate-400">Full control</p>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// ROUTE 3: PROTECTED DASHBOARD
// ==========================================

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.auth.projects);
  const user = useSelector((state: RootState) => state.auth.user);

  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Project Creation State
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [status, setStatus] = useState<"todo" | "in_progress" | "done">("todo");

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(addProject({ name, description, priority, status }));
    setName("");
    setDescription("");
    setPriority("medium");
    setStatus("todo");
    setShowAddForm(false);
  };

  const filteredProjects = projects.filter((project) => {
    const priorityMatch = filterPriority === "all" || project.priority === filterPriority;
    const statusMatch = filterStatus === "all" || project.status === filterStatus;
    return priorityMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-100/60 rounded-full uppercase tracking-wider">
            Protected Route
          </span>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">Projects Dashboard</h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            Manage dummy items stored in Redux. Changes immediately update across routes.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm"
        >
          {showAddForm ? "Cancel" : "＋ Create Project"}
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddProject}
          className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-inner space-y-4"
        >
          <h4 className="text-sm font-bold text-slate-700">Add New Project</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Project Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Write Unit Tests"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Priority</label>
                <select
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Status</label>
                <select
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be done..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
            >
              Add Project
            </button>
          </div>
        </form>
      )}

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-3 items-center bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-xs">
        <span className="font-semibold text-slate-500">Filters:</span>
        <div className="flex items-center gap-2">
          <span>Priority</span>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-2 py-1 border border-slate-200 rounded bg-slate-50 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>Status</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2 py-1 border border-slate-200 rounded bg-slate-50 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <span className="ml-auto text-slate-400 font-medium">
          Showing {filteredProjects.length} of {projects.length}
        </span>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No projects match the filter.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 hover:bg-slate-50/50 transition flex justify-between items-center gap-4"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      to={`/dashboard/project/${project.id}`}
                      className="font-bold text-slate-800 hover:text-blue-600 transition text-sm truncate"
                    >
                      {project.name}
                    </Link>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                        project.priority === "high"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : project.priority === "medium"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}
                    >
                      {project.priority}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                        project.status === "done"
                          ? "bg-emerald-50 text-emerald-600"
                          : project.status === "in_progress"
                            ? "bg-indigo-50 text-indigo-600"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {project.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{project.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/dashboard/project/${project.id}`}
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                    title="View Details"
                  >
                    👁️
                  </Link>
                  <button
                    onClick={() => dispatch(deleteProject(project.id))}
                    className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition"
                    title="Delete Project"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// ROUTE 4: PROJECT DETAILS (PARAM ROUTE)
// ==========================================

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const project = useSelector((state: RootState) =>
    state.auth.projects.find((p) => p.id === id)
  );

  if (!project) {
    return (
      <div className="text-center py-10 space-y-4">
        <p className="text-slate-500 text-sm">Project not found or deleted.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const toggleStatus = () => {
    const nextStatus: Record<Project["status"], Project["status"]> = {
      todo: "in_progress",
      in_progress: "done",
      done: "todo",
    };
    dispatch(
      updateProject({
        ...project,
        status: nextStatus[project.status],
      })
    );
  };

  const promotePriority = () => {
    const nextPriority: Record<Project["priority"], Project["priority"]> = {
      low: "medium",
      medium: "high",
      high: "low",
    };
    dispatch(
      updateProject({
        ...project,
        priority: nextPriority[project.priority],
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
        <Link to="/dashboard" className="hover:text-blue-500 transition">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-600">{project.name}</span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-800">{project.name}</h3>
            <p className="text-slate-400 text-xs">Created: {project.createdAt} | ID: {project.id}</p>
          </div>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                project.priority === "high"
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : project.priority === "medium"
                    ? "bg-amber-50 text-amber-600 border border-amber-100"
                    : "bg-blue-50 text-blue-600 border border-blue-100"
              }`}
            >
              {project.priority} Priority
            </span>
            <span
              className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                project.status === "done"
                  ? "bg-emerald-50 text-emerald-600"
                  : project.status === "in_progress"
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {project.status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</h4>
          <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100/50">
            {project.description || "No description provided."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={toggleStatus}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            🔄 Cycle Status
          </button>
          <button
            onClick={promotePriority}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            🔥 Cycle Priority
          </button>
          <button
            onClick={() => {
              dispatch(deleteProject(project.id));
              navigate("/dashboard");
            }}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl transition ml-auto"
          >
            🗑️ Delete Project
          </button>
        </div>
      </div>

      <div className="flex">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-slate-950 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

// ==========================================
// ROUTE 5: SETTINGS PAGE
// ==========================================

const SettingsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="space-y-6">
      <div>
        <span className="px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-100/60 rounded-full uppercase tracking-wider">
          Protected Route
        </span>
        <h3 className="text-2xl font-bold text-slate-800 mt-2">Account Settings</h3>
        <p className="text-slate-500 text-sm">Modify mock preferences and check profile data</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Profile Details</h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="font-semibold text-slate-400">Username</p>
                <p className="font-bold text-slate-700 text-sm mt-0.5">{user?.username}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-400">Email Address</p>
                <p className="font-bold text-slate-700 text-sm mt-0.5">{user?.email}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-400">Authorized Role</p>
                <p className="font-bold text-slate-700 text-sm mt-0.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-md">
                    {user?.role}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Session Debugger</h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100/80 font-mono text-[10px] text-slate-600 overflow-x-auto space-y-2">
              <p className="font-semibold text-slate-500">// Redux auth.user state</p>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INNER WRAPPER & MOCK BROWSER CHROME
// ==========================================

const RoutingDemoInner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden bg-slate-50">
      {/* Mock Browser Title Bar */}
      <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 select-none border-b border-slate-950">
        {/* Decorative dots */}
        <div className="flex gap-1.5 mr-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Back / Forward Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(-1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/70 active:scale-95 transition"
            title="Go Back"
          >
            ←
          </button>
          <button
            onClick={() => navigate(1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/70 active:scale-95 transition"
            title="Go Forward"
          >
            →
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/70 active:scale-95 transition text-xs"
            title="Reload Home"
          >
            🔄
          </button>
        </div>

        {/* Mock Address Bar */}
        <div className="flex-1 max-w-lg bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 flex items-center gap-2 text-xs text-slate-400 font-mono select-all">
          <span className="text-slate-600">https://react-redux-sandbox.local</span>
          <span className="text-slate-300 font-bold">{location.pathname}</span>
        </div>

        {/* Auth status indicator & Logout */}
        <div className="ml-auto flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="text-xs text-right hidden sm:block">
                <p className="text-slate-300 font-semibold leading-none">{user?.username}</p>
                <p className="text-[10px] text-slate-500 leading-none mt-1">{user?.role}</p>
              </div>
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                className="px-2.5 py-1 bg-red-600/90 text-white hover:bg-red-700 text-xs font-semibold rounded-lg transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-2.5 py-1 bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold rounded-lg transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mock App Sub-Navigation inside the browser */}
      <div className="bg-white px-6 py-2.5 flex items-center gap-6 border-b border-slate-100 text-sm font-semibold select-none">
        <Link
          to="/"
          className={`transition ${
            location.pathname === "/" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Home (Public)
        </Link>
        <Link
          to="/dashboard"
          className={`transition ${
            location.pathname.startsWith("/dashboard") && location.pathname !== "/dashboard/settings"
              ? "text-blue-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Dashboard (Protected)
        </Link>
        {isAuthenticated && (
          <Link
            to="/dashboard/settings"
            className={`transition ${
              location.pathname === "/dashboard/settings" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Settings (Protected)
          </Link>
        )}
      </div>

      {/* Main viewport rendering routes */}
      <div className="p-6 bg-slate-50/50 min-h-[420px]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/project/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          {/* Catch-all redirect to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Mock Browser Status Bar */}
      <div className="bg-slate-100 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-semibold select-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isAuthenticated ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
            }`}
          ></span>
          <span>{isAuthenticated ? "Session Active" : "No Session / Guest Mode"}</span>
        </div>
        <div>
          <span>Route type: </span>
          <span className="font-bold font-mono">
            {location.pathname === "/" || location.pathname === "/login" ? "Public" : "Protected (Guard active)"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// EXPORTED COMPONENT (ROUTER CONTAINER)
// ==========================================

const RoutingAuth = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold text-slate-800">Routing & Auth Demo</h2>
        <p className="text-slate-500 text-sm">
          A demonstration of React Router with guarded paths and central authentication sync in Redux.
        </p>
      </div>

      <MemoryRouter initialEntries={["/"]}>
        <RoutingDemoInner />
      </MemoryRouter>
    </div>
  );
};

export default RoutingAuth;
