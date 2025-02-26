# Blog Content Documentation

## Adding Blog Posts

Blog posts are stored in the `blogDigest` array in `src/components/blog/BlogContent.tsx`. Each post follows this JSON structure:

```typescript
{
  "title": string,          // The title of the blog post
  "date": string,          // Date in format "Day Month DD, YYYY"
  "excerpt": string,       // A brief summary of the post (displayed in listings)
  "slug": string,         // URL-friendly identifier (used in links)
  "category": "tutorials" | "news" | "case-studies",  // Post category
  "imageUrl": string,     // URL to the post's featured image
  "isTrending": boolean   // Optional: Mark post as trending (will appear in sidebar)
}
```

### Example Post

```json
{
  "title": "Reducing application latency and lowering Cloud bill",
  "date": "Wednesday January 8, 2025",
  "excerpt": "By implementing AZ affinity routing in Valkey and using GLIDE, you can achieve lower latency and cost savings by routing requests to replicas in the same AZ as the client.",
  "slug": "reducing-application-latency",
  "category": "tutorials",
  "imageUrl": "https://example.com/path/to/image.jpg",
  "isTrending": true
}
```

### Field Guidelines

1. **title**

   - Should be descriptive and engaging
   - No character limit, but recommended to keep under 60 characters
   - Can include special characters

2. **date**

   - Format: "Day Month DD, YYYY"
   - Example: "Wednesday January 8, 2025"
   - Used for sorting and filtering

3. **excerpt**

   - Brief summary of the post
   - Recommended length: 150-200 characters
   - Should give readers a clear idea of the post content

4. **slug**

   - URL-friendly version of the title
   - Use lowercase letters, numbers, and hyphens only
   - Must be unique across all posts
   - Example: "reducing-application-latency"

5. **category**

   - Must be one of: "tutorials", "news", "case-studies"
   - Used for filtering and navigation
   - Categories are predefined in the system

6. **imageUrl**

   - Full URL to the post's featured image
   - Recommended image dimensions: 1200x800 pixels
   - Supported formats: JPG, PNG
   - Images should be optimized for web

7. **isTrending** (optional)
   - Boolean value: true/false
   - If true, post will appear in the Trending sidebar
   - Default is false if not specified

### Adding a New Post

To add a new post:

1. Open `src/components/blog/BlogContent.tsx`
2. Locate the `blogDigest` array
3. Add your new post object at the beginning of the array for newest-first ordering
4. Follow the JSON structure above
5. Ensure all required fields are included
6. Verify the slug is unique

### Example of Adding Multiple Posts

```typescript
export const blogDigest: BlogPost[] = [
  {
    title: 'New Feature Release: Advanced Monitoring',
    date: 'Monday March 15, 2025',
    excerpt:
      'Introducing our new monitoring dashboard with real-time metrics and customizable alerts.',
    slug: 'advanced-monitoring-release',
    category: 'news',
    imageUrl: 'https://example.com/monitoring-dashboard.jpg',
    isTrending: true,
  },
  {
    title: 'Optimizing Database Performance',
    date: 'Friday March 12, 2025',
    excerpt:
      'Learn best practices for optimizing your database queries and improving overall system performance.',
    slug: 'database-optimization-guide',
    category: 'tutorials',
    imageUrl: 'https://example.com/database-optimization.jpg',
  },
  // ... existing posts ...
];
```

## Best Practices

1. **Image Optimization**

   - Compress images before uploading
   - Use appropriate aspect ratios (16:9 or 4:3 recommended)
   - Provide fallback images when possible

2. **Content Organization**

   - Keep newest posts at the top of the array
   - Limit trending posts to 3-4 at a time
   - Maintain a good balance between categories

3. **Maintenance**

   - Regularly review and update trending status
   - Remove outdated content
   - Verify all image URLs are still valid

4. **SEO Considerations**
   - Use descriptive, keyword-rich titles
   - Write compelling excerpts
   - Create SEO-friendly slugs

## Individual Blog Post Page

The individual blog post page (`BlogPost.tsx`) displays a full blog post with the following sections:

### Page Structure

```typescript
{
  "title": string,          // Post title
  "date": string,          // Post date
  "content": string,       // Full post content
  "imageUrl": string,      // Featured image URL
  "category": string,      // Post category
  "author": Author,        // Author information
}
```

### Author Information

Each blog post requires author information with the following structure:

```typescript
{
  "name": string,          // Author's full name
  "username": string,      // Author's username (without @)
  "bio": string,          // Author's biography
  "imageUrl": string      // Author's profile image URL
}
```

Example author object:

```json
{
  "name": "Kyle Davis",
  "username": "stockholmux",
  "bio": "Kyle is the Senior Developer Advocate on the Valkey project...",
  "imageUrl": "https://example.com/path/to/author-image.jpg"
}
```

### Related Posts

Related posts are automatically generated based on the following criteria:

- Posts with the same category as the current post
- Excluding the current post
- Limited to 3 posts maximum
- Displayed in card format with:
  - Featured image (50% width)
  - Title (max 2 lines)
  - Excerpt (max 2 lines)
  - "Read More" button

### Navigation Elements

#### Breadcrumbs

The breadcrumb navigation appears at the top of the page with:

- Background color: #FAFAFD
- Height: 44px
- Format: "Blog > {Post Title}"
- "Blog" links back to the main blog page
- Current post title is non-clickable

### Page Layout

1. **Header Section**

   - Breadcrumb navigation
   - Featured image (400px height)
   - Post title
   - Publication date

2. **Main Content Area**

   - Background: white
   - Padding: 16px
   - Full post content
   - Responsive layout

3. **Sidebar (33% width)**
   - Background: #F2F0FA
   - Author section
   - Related posts section

### Best Practices

1. **Author Information**

   - Keep author bios concise and professional
   - Use high-quality profile images (recommended: 120x120px)
   - Maintain consistent username format

2. **Related Posts**

   - Ensure posts within the same category have similar themes
   - Use high-quality featured images for cards
   - Keep titles and excerpts clear and concise

3. **Content Formatting**

   - Use appropriate heading hierarchy
   - Include high-quality images
   - Maintain consistent spacing
   - Ensure content is mobile-responsive

4. **Performance**
   - Optimize all images (featured, author, related posts)
   - Lazy load images where appropriate
   - Consider implementing pagination for very long posts

### URL Structure

Individual blog posts follow the URL pattern:

```
/blog/{slug}
```

Where `slug` is the unique identifier from the blog post object.

### Error Handling

- Invalid or non-existent slugs redirect to the main blog page
- Missing images use a fallback placeholder
- Missing author information displays defaults where appropriate
