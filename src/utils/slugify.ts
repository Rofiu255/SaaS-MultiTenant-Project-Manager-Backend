export const slugify = (text: string): string =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove special characters
      .trim()
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // collapse multiple hyphens
  