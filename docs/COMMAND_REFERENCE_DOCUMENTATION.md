# Command Reference Documentation

## Data Structures

### CommandCategory Interface

The `CommandCategory` interface defines the structure for command categories:

```typescript
interface CommandCategory {
  id: string; // Unique identifier for the category
  categoryName: string; // Display name of the category
  description: string; // Description of what commands in this category do
}
```

### CommandReference Interface

The `CommandReference` interface defines the structure for individual commands:

```typescript
interface CommandReference {
  unid: string; // Unique identifier for the command
  command: string; // The command name
  description: string; // Short description of what the command does
  htmlContent: string; // Detailed HTML documentation of the command
  categories: string[]; // Array of category IDs this command belongs to
}
```

## Data Organization

### Command Categories

Commands are organized into categories that represent different functional areas. Each category has:

- A unique identifier
- A display name
- A description of what types of commands it contains

Example categories include:

- admin
- bitmap
- blocking
- connection
- dangerous
- geo
- hash
- hyperloglog
- etc.

### Command References

Each command reference contains:

1. A unique identifier (unid)
2. The command name
3. A brief description
4. Detailed HTML documentation including:
   - Usage syntax
   - Command complexity
   - Version information
   - Examples
   - Response format
   - History of changes
5. Associated categories

## HTML Content Structure

The `htmlContent` field uses a standardized structure:

```html
<dl>
  <dt>Usage:</dt>
  <dd>
    <code>COMMAND [arguments]</code>
  </dd>
</dl>

<dl>
  <dt>Complexity:</dt>
  <dd>O(N)</dd>
</dl>

<dl>
  <dt>Since:</dt>
  <dd>version</dd>
</dl>

<h2>Examples</h2>
<pre><code>example code</code></pre>

<h3>RESP2/RESP3 Reply</h3>
<p>Response information</p>

<h3>History</h3>
<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>version</td>
      <td>change description</td>
    </tr>
  </tbody>
</table>
```

## Usage in Components

The command reference data is used in several React components:

1. `CommandReference.tsx` - Main component that orchestrates the display
2. `CommandReferenceContent.tsx` - Displays detailed command information
3. `CommandReferenceSidebar.tsx` - Shows the list of commands
4. `CommandReferenceHeader.tsx` - Displays the header
5. `CommandReferenceSearch.tsx` - Handles command searching

## Search and Filtering

Commands can be:

1. Filtered by category
2. Searched by command name
3. Grouped by their categories

The search is case-insensitive and matches against command names.

## Styling

The HTML content is styled using Chakra UI's style props and custom CSS. Key styling elements include:

- Code blocks use monospace fonts and specific background colors
- Tables are fully styled with borders and proper spacing
- Headers have consistent sizing and spacing
- Definition lists (dl, dt, dd) have specific margin and padding rules

## Example Usage

```typescript
// Accessing command categories
const categories = commandCategories;

// Finding commands in a specific category
const bitmapCommands = commandReferences.filter(cmd => cmd.categories.includes('bitmap'));

// Getting a specific command
const bitCountCommand = commandReferences.find(cmd => cmd.command === 'BITCOUNT');
```
