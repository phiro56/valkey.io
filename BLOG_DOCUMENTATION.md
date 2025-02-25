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
