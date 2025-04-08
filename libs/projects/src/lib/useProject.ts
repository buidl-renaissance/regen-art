import { useState, useEffect } from 'react';
import { Project } from './interfaces';

interface UseProjectOptions {
  initialData?: Project;
  projectId?: string;
  fetchOnMount?: boolean;
}

export const useProject = (options: UseProjectOptions = {}) => {
  const { initialData, projectId, fetchOnMount = true } = options;
  const [project, setProject] = useState<Project | null>(initialData || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProject = async (id: string) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/projects/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (updatedData: Partial<Project>) => {
    if (!project?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update project: ${response.statusText}`);
      }
      
      const updatedProject = await response.json();
      setProject(updatedProject);
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error updating project:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (newProject: Omit<Project, 'id'>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API call
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create project: ${response.statusText}`);
      }
      
      const createdProject = await response.json();
      setProject(createdProject);
      return createdProject;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error creating project:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.statusText}`);
      }
      
      setProject(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error deleting project:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOnMount && projectId) {
      fetchProject(projectId);
    }
  }, [projectId, fetchOnMount]);

  return {
    project,
    loading,
    error,
    fetchProject,
    updateProject,
    createProject,
    deleteProject,
    setProject,
  };
};
