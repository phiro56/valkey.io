# Documentation System Structure

## Overview

The documentation system is built using TypeScript and React, providing a modern and interactive way to browse and search through Valkey's documentation. The system consists of several key components and data structures that work together to deliver a seamless documentation experience.

## Core Components

### Documentation Page (`src/pages/Documentation.tsx`)

The main documentation page component that provides:

- Responsive layout with sidebar and main content area
- Search functionality
- Dynamic routing for different documentation topics

### Documentation Sidebar (`src/components/documentation/DocumentationSidebar.tsx`)

A navigation component that:

- Displays categorized documentation topics
- Implements real-time search filtering
- Shows topic descriptions
- Highlights currently selected topic

### Documentation Content (`src/components/documentation/DocumentationContent.tsx`)

The content display component that:

- Renders documentation HTML content
- Provides breadcrumb navigation
- Applies consistent styling to documentation elements
- Supports dynamic content loading based on selected topic

## Data Structure

### Topics (`src/data/topics.ts`)

The topics data structure consists of:

```typescript
interface CommandCategory {
  id: string;
  topicName: string;
  description: string;
  htmlContent: string;
}

interface TopicCategory {
  title: string;
  items: CommandCategory[];
}
```

Topics are organized into categories:

- CONFIGURATION
- CLIENT HANDLING
- DATA TYPES
- SCRIPTING
- HIGH AVAILABILITY
- ADMINISTRATION
- PERFORMANCE
- TROUBLESHOOTING

### Documentation Data (`src/data/documentation.ts`)

The main documentation data structure:

```typescript
interface DocumentationData {
  introduction: {
    description: string;
    links: Array<{ text: string; url: string }>;
    content?: string;
  };
}
```

## Features

### Search Functionality

- Real-time filtering of documentation topics
- Searches through topic names and descriptions
- Preserves category structure in filtered results
- Empty state handling with user-friendly messages

### Styling

Documentation content uses consistent styling for:

- Headers (h2, h3, h4)
- Paragraphs
- Lists (ordered and unordered)
- Code blocks
- Links
- Images

### Responsive Design

The documentation system is fully responsive with:

- Mobile-first approach
- Flexible layout using Chakra UI
- Collapsible sidebar for mobile views
- Adaptive content width

## Recent Changes

1. Added comprehensive topic categorization
2. Implemented real-time search filtering
3. Enhanced content styling with consistent typography
4. Added support for HTML content in documentation
5. Improved mobile responsiveness
6. Added breadcrumb navigation
7. Enhanced code block styling

## Usage

### Adding New Topics

To add a new topic:

1. Add the topic to the `topics` array in `src/data/topics.ts`:

```typescript
{
  id: "unique-id",
  topicName: "Topic Name",
  description: "Topic description",
  htmlContent: `<p>HTML content here</p>`
}
```

2. Add the topic to appropriate category in the `categories` array:

```typescript
{
  title: 'CATEGORY_NAME',
  items: topics.filter(topic =>
    ['topic-id-1', 'topic-id-2'].includes(topic.id)
  )
}
```

### Styling Content

Use the following HTML elements with appropriate classes:

- `<h2>` for main sections
- `<h3>` for subsections
- `<pre><code>` for code blocks
- `<p>` for paragraphs
- `<ul>` and `<ol>` for lists
- `<a>` for links

### Search Implementation

The search functionality filters topics based on:

- Topic name matches
- Description matches
- Case-insensitive comparison
- Preserves category structure
