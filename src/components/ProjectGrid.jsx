import React from 'react';
import ProjectCard from './ProjectCard';

/**
 * A component to display a grid of project cards.
 * @param {Array} projects - An array of project objects to display.
 */
const ProjectGrid = ({ projects }) => {
  // Handle the case where there are no projects to display.
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-white">The Cathedral is Quiet</h2>
        <p className="text-gray-400 mt-2">No unfinished dreams have been shared yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;
