import { useEffect, useState } from 'react';
import type { Project } from '../data/projects';

export const getProjects = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  useEffect(() => {
    import('../data/projects').then((module) => {
      setProjectsData(module.projects as any);
      setIsProjectsLoading(false);
    });
  }, []);

  return {
    projectsData,
    isProjectsLoading,
  };
};
