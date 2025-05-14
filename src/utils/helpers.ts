export const generateRandomToken = (length = 32): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  };
  
  export const capitalize = (text: string): string =>
    text.charAt(0).toUpperCase() + text.slice(1);
  
  export const parsePagination = (
    query: any,
    defaultLimit = 10,
    maxLimit = 100
  ): { page: number; limit: number; skip: number } => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(maxLimit, parseInt(query.limit) || defaultLimit);
    const skip = (page - 1) * limit;
  
    return { page, limit, skip };
  };
  