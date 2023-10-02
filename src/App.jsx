import './App.scss';
import ProjectsListPage from "./porjects/ProjectsListPage";
import TasksListPage from "./tasks/TasksListPage";
import store from "./store";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// Getting projects from store to generate routes
const projects = store.getState().projects.projectsList

const projectRoutes = projects.map(project => (
    {
        path: `${project.id}/tasks`,
        element: <TasksListPage page='tasks' projectId={project.id} />
    }
))

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProjectsListPage page='projects' />
    },
    {
        path: '/tasks',
        element: <TasksListPage page='tasks' />
    },
    ...projectRoutes,
])
// ====

function App() {
  return (
      <Provider store={store}>
          <div className="page">
            <RouterProvider router={router} />
          </div>
      </Provider>
  );
}

export default App;
