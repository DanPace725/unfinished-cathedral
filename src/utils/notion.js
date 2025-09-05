import { Client } from '@notionhq/client';

// Initialize the Notion client with the API token.
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

const parseNotionProject = (page) => {
  const { properties } = page;
  return {
    id: page.id,
    name: properties.Name?.title?.[0]?.plain_text ?? 'Untitled Project',
    description: properties.Description?.rich_text?.[0]?.plain_text ?? 'No description provided.',
    status: properties.Status?.select?.name ?? 'Unknown',
    signalCount: properties.SignalCount?.number ?? 0,
    content: properties.Content?.rich_text?.[0]?.plain_text ?? '',
    lastUpdate: page.last_edited_time,
  };
};

export async function getProjects() {
  if (!DATABASE_ID || !process.env.NOTION_TOKEN) {
    console.error('DEBUG: NOTION_TOKEN or NOTION_DATABASE_ID is missing. Please check your .env file and Vercel environment variables.');
    return [];
  }
  console.log('DEBUG: Attempting to fetch projects from Notion...');

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'LastUpdate',
          direction: 'descending',
        },
      ],
    });

    if (!response.results || response.results.length === 0) {
      console.log("DEBUG: Notion API call was successful, but returned no projects. Please check the following:\n1. Is the database shared with your Notion integration? (Click the '...' menu on your Notion database > 'Add connections' > Select your integration).\n2. Does the database contain any pages?");
      return [];
    }

    const projects = response.results.map(parseNotionProject);
    console.log(`DEBUG: Successfully fetched and parsed ${projects.length} project(s) from Notion.`);
    return projects;
  } catch (error) {
    console.error('DEBUG: Failed to fetch projects from Notion. This is likely an issue with your environment variables or Notion API permissions.');
    console.error('DEBUG: Full error message:', error.message);
    // Also log the notion object to see if it was instantiated correctly
    console.error('DEBUG: Notion client object state:', JSON.stringify(notion, null, 2));
    return [];
  }
}

export async function incrementProjectSignalCount(projectId) {
  try {
    const page = await notion.pages.retrieve({ page_id: projectId });
    const currentCount = page.properties.SignalCount?.number ?? 0;

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
