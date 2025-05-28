"use client"

// Ensures the Studio route is statically generated
export const dynamic = "force-static";

// Metadata and viewport exports should be in a Server Component, like a layout.tsx for this route
// Removing them from this client component page.
// export {metadata} from 'next-sanity/studio/metadata'
// export {viewport} from 'next-sanity/studio/viewport'

import {NextStudio} from 'next-sanity/studio' // Changed to NextStudio
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} /> // Changed to NextStudio
}
