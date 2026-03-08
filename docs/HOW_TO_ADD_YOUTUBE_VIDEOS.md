# How to Add Your YouTube Videos to the Films Page

## Step 1: Get Your YouTube Video IDs

### From YouTube Watch URL:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                 ↑
                        This is the Video ID
```

### From YouTube Share Link:
```
https://youtu.be/dQw4w9WgXcQ
              ↑
     This is the Video ID
```

## Step 2: Update the Films Array

Open the file: `app/films/page.tsx`

Find the `films` array (around line 10) and replace the placeholder data:

```typescript
const films = [
  {
    title: 'Your Video Title',           // ← Change this
    location: 'Location Name',            // ← Change this
    type: 'Wedding Film',                 // ← Choose: Wedding Film, Pre-Wedding, Cinematic Teaser, etc.
    description: 'Your description...',   // ← Change this
    thumbnail: 'https://...',             // ← Optional: Change thumbnail image
    youtubeId: 'YOUR_ACTUAL_VIDEO_ID',   // ← IMPORTANT: Put your real YouTube video ID here
  },
  // Add more films...
];
```

## Step 3: Example with Real Data

```typescript
const films = [
  {
    title: 'Priya & Rahul Wedding',
    location: 'Mumbai',
    type: 'Wedding Film',
    description: 'A beautiful celebration of love in the heart of Mumbai.',
    thumbnail: 'https://cms.viyafilms.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
    youtubeId: 'dQw4w9WgXcQ',  // Replace with your actual YouTube video ID
  },
  {
    title: 'Anjali & Vikram Pre-Wedding',
    location: 'Goa',
    type: 'Pre-Wedding Film',
    description: 'Romance on the beaches of Goa captured in stunning 4K.',
    thumbnail: 'https://cms.viyafilms.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
    youtubeId: 'abc123xyz',  // Replace with your actual YouTube video ID
  },
];
```

## Step 4: Thumbnails (Optional)

You have two options for thumbnails:

### Option A: Use YouTube Auto-Generated Thumbnail
The video player will show YouTube's thumbnail automatically. Just use any placeholder image.

### Option B: Use Custom Thumbnail
Upload your custom thumbnail image and update the `thumbnail` URL.

## Step 5: Test Your Videos

1. Save the file
2. Go to http://localhost:3000/films
3. Click on a video card
4. The video should play in a modal window!

## Tips

### Video Privacy Settings
Make sure your YouTube videos are set to:
- **Public** - Anyone can watch
- **Unlisted** - Only people with the link can watch (good for client previews)
- ❌ NOT **Private** - Won't work on your website

### Optimal Video Settings
- Resolution: 1080p or 4K
- Format: MP4 (YouTube converts automatically)
- Aspect Ratio: 16:9 (standard)

### Adding More Videos
Just copy-paste another film object in the array:

```typescript
const films = [
  {
    title: 'Film 1',
    location: 'Location 1',
    type: 'Wedding Film',
    description: 'Description 1',
    thumbnail: 'https://...',
    youtubeId: 'VIDEO_ID_1',
  },
  {
    title: 'Film 2',
    location: 'Location 2',
    type: 'Pre-Wedding',
    description: 'Description 2',
    thumbnail: 'https://...',
    youtubeId: 'VIDEO_ID_2',
  },
  // Add as many as you want!
];
```

## Common Issues

### Video doesn't play
- Check if the video ID is correct
- Make sure video is Public or Unlisted on YouTube
- Check browser console for errors (F12)

### Modal doesn't close
- Click the X button or click outside the video
- Press ESC key

### Video quality is low
- YouTube may start with lower quality to load faster
- Click the settings gear in the video player to change quality

## Need Help?

If you're stuck, provide me with:
1. Your YouTube video URLs
2. The titles and descriptions you want
3. Any error messages you see

I'll help you set them up!
