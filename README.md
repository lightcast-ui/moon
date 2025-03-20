# Moon

The base UI kit for Lightcast's design system, based on shadcn/ui components with full TypeScript support.

## Installation

```bash
npm install @lightcast-ui/moon
# or
yarn add @lightcast-ui/moon
# or
pnpm add @lightcast-ui/moon
```

## Setup

### 1. Configure Tailwind CSS with Vite

If you're using Tailwind CSS v4 with Vite, follow these steps:

1. Install Tailwind CSS and the Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

2. Configure the Vite plugin in your vite.config.ts:

```typescript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss({
      // Optional: Add Moon components to be scanned for classes
      content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@lightcast-ui/moon/**/*.{js,cjs,mjs}",
      ],
    }),
    // Your other plugins...
  ],
});
```

### 2. Import the styles

For Tailwind CSS v4, you can import the styles in two ways:

**Option 1**: In your CSS file, import both Tailwind CSS and Moon styles:

```css
/* In your main CSS file */
@import "tailwindcss";
@import "@lightcast-ui/moon/styles.css";
```

**Option 2**: In your main component file:

```tsx
// In your main file (e.g., main.tsx, App.tsx)
import "@lightcast-ui/moon/styles.css";
```

## Usage

### Method 1: Import from specific components (recommended)

This approach enables better tree-shaking:

```tsx
import { Button } from "@lightcast-ui/moon/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@lightcast-ui/moon/alert-dialog";

function MyComponent() {
  return (
    <div>
      <Button variant="outline">Click me</Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Open Alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>{/* Alert content here */}</AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
```

### Method 2: Import from main entry point

```tsx
import { Button, AlertDialog, AlertDialogTrigger } from "@lightcast-ui/moon";

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

## Available Components

Moon includes all shadcn/ui components:

- Accordion
- Alert
- Alert Dialog
- Aspect Ratio
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Collapsible
- Command
- Context Menu
- Dialog
- Drawer
- Dropdown Menu
- Form
- Hover Card
- Input
- Input OTP
- Label
- Menubar
- Navigation Menu
- Pagination
- Popover
- Progress
- Radio Group
- Resizable
- Scroll Area
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Sonner
- Switch
- Table
- Tabs
- Textarea
- Toggle
- Toggle Group
- Tooltip

## Custom Hooks

Moon also includes some useful hooks:

```tsx
import { useMobile } from "@lightcast-ui/moon/hooks/use-mobile";

function MyComponent() {
  const isMobile = useMobile();

  return <div>{isMobile ? "Mobile view" : "Desktop view"}</div>;
}
```
