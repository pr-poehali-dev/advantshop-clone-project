import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Project } from '@/types/tilda';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useLocalStorage<Project[]>('tilda-projects', [
    {
      id: '1',
      name: 'Мой первый сайт',
      pages: [
        {
          id: 'page-1',
          title: 'Главная',
          slug: 'index',
          blocks: [],
          settings: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      settings: {
        primaryColor: '#ec4899',
        secondaryColor: '#f472b6',
        fontFamily: 'Inter',
      },
    },
  ]);

  const [currentProject, setCurrentProject] = useLocalStorage<Project | null>(
    'tilda-current-project',
    projects[0] || null
  );

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(
      projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    if (currentProject?.id === updatedProject.id) {
      setCurrentProject(updatedProject);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(projects[0] || null);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        setCurrentProject,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}