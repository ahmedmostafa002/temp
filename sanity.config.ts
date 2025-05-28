import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision' // Optional: for GROQ query testing in Studio

// Import your schemas
import post from './sanity/schemas/post'
import author from './sanity/schemas/author'
import category from './sanity/schemas/category'
import blockContent from './sanity/schemas/blockContent'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

if (!projectId || !dataset) {
  throw new Error(
    `Missing Sanity project ID or dataset. Check your .env file or environment variables.`
  )
}

export default defineConfig({
  basePath: '/studio', // This will be the route in your Next.js app
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(), // Vision tool (optional)
    // Add other plugins here if needed
  ],
  schema: {
    types: [
      // Add your schema types here
      post,
      author,
      category,
      blockContent,
    ],
  },
})
