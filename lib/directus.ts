import { createDirectus, rest, readItems } from '@directus/sdk';

export function getDirectusClient() {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://cms.svastiproduction.com';
  return createDirectus(url).with(rest());
}

// Fetch published gallery images and return asset URLs
export async function getGalleryImages(limit = 24): Promise<string[]> {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://cms.svastiproduction.com';
  const client = getDirectusClient();

  try {
    const items = await client.request(
      readItems('images', {
        fields: ['id', 'image_file.id', 'file', 'image', 'status'],
        filter: { status: { _eq: 'published' } },
        sort: ['sort_order'],
        limit,
      })
    );

    const ids: string[] = (items || [])
      .map((it: any) => {
        // Common patterns: image_file.id (relation), or file (id), or image (id)
        const fileId = it?.image_file?.id || it?.file || it?.image;
        return typeof fileId === 'string' ? fileId : undefined;
      })
      .filter(Boolean) as string[];

    return ids.map((id) => `${url.replace(/\/$/, '')}/assets/${id}`);
  } catch (err) {
    // Fallback to sample assets if CMS is unavailable
    return [
      'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
      'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
      'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
      'https://cms.svastiproduction.com/assets/7f2b9083-1234-4a22-88c2-99f0c0a1bb11',
      'https://cms.svastiproduction.com/assets/9a1d54c2-5678-4ad1-8b6c-77b24e2f90d1',
      'https://cms.svastiproduction.com/assets/1c2b3d4e-90ab-4ef1-b2cd-5e6f7a8b9c0d',
    ];
  }
}
