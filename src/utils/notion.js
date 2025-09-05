import { Client } from '@notionhq/client';

// Initialize Notion client using the environment variable for the auth token.
const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
});

const DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

/**
 * Parses a raw Notion page object into a simplified, clean project object.
 * This function is crucial for abstracting the complex Notion API response structure
 * from the rest of the application. It provides safe access to properties with fallbacks.
 * @param {object} page - The raw Notion page object from the API.
 * @returns {object} A simplified project object usable by the UI components.
 */
const parseNotionProject = (page) => {
  const { properties } = page;

  // Using optional chaining (?.) and the nullish coalescing operator (??)
  // to safely access nested properties and provide default values.
  return {
    id: page.id,
    name: properties.Name?.title?.[0]?.plain_text ?? 'Untitled Project',
    description: properties.Description?.rich_text?.[0]?.plain_text ?? 'No description provided.',
    status: properties.Status?.select?.name ?? 'Unknown',
    signalCount: properties.SignalCount?.number ?? 0,
    // The full content for the project page.
    content: properties.Content?.rich_text?.[0]?.plain_text ?? '',
    lastUpdate: page.last_edited_time,
  };
};

/**
 * Fetches all projects from the configured Notion database and parses them.
 * @returns {Promise<Array>} A promise that resolves to an array of simplified project objects.
 */
export async function getProjects() {
  if (!DATABASE_ID) {
    console.error('Notion Database ID is not configured in environment variables.');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      // Example filter to only show projects with a specific status.
      // This can be enabled later to create a curation flow.
      // filter: {
      //   property: 'Status',
      //   select: {
      //     equals: 'Published',
      //   },
      // },
      sorts: [
        {
          // 'LastUpdate' is the name of the 'Last edited time' property in the Notion DB.
          property: 'LastUpdate',
          direction: 'descending',
        },
      ],
    });

    // Map over the raw results and parse each one into our clean format.
    const projects = response.results.map(parseNotionProject);
    return projects;
  } catch (error) {
    console.error('Failed to fetch projects from Notion:', error);
    // Return an empty array to prevent the site from crashing on API errors.
    return [];
  }
}

/**
 * Increments the 'SignalCount' for a specific project in Notion.
 * This is called by the Stripe webhook after a successful payment.
 * @param {string} projectId - The ID of the Notion page (project) to update.
 * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, false otherwise.
 */
export async function incrementProjectSignalCount(projectId) {
  try {
    // First, we need to get the current signal count for the project.
    const page = await notion.pages.retrieve({ page_id: projectId });
    const currentCount = page.properties.SignalCount?.number ?? 0;

    // Then, we update the page with the incremented count.
    await notion.pages.update({
      page_id: projectId,
      properties: {
        SignalCount: {
          number: currentCount + 1,
        },
      },
    });
    console.log(`Successfully incremented signal count for project ${projectId} to ${currentCount + 1}`);
    return true;
  } catch (error) {
    console.error(`Failed to increment signal count for project ${projectId}:`, error);
    return false;
  }
}
