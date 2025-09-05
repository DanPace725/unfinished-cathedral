import React from 'react';

/**
 * A component to display a single project card.
 * It shows the project's name, description, and signal count.
 * The entire card is a link to the individual project page.
 * @param {object} project - The project data to display.
 */
const ProjectCard = ({ project }) => {
  // NOTE: We're assuming a simplified project structure for now.
  // This will be updated when we process the real Notion API response.
  const { id, name, description, signalCount } = project;

  return (
    <a
      href={`/project/${id}`}
      className="block p-6 bg-gray-800 border border-gray-700 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-400 mb-4">
        {description}
      </p>
      <div className="flex items-center justify-end text-right">
        <span className="text-xl font-bold text-white">{signalCount}</span>
        <span className="ml-2 text-gray-400 text-sm">signals</span>
      </div>
    </a>
  );
};

export default ProjectCard;
