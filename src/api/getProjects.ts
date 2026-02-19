import { useEffect, useState } from 'react';

export const getProjects = () => {
  const [projectsData, setProjectsData] = useState([]);
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
