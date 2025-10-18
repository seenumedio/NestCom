export const getCurrentUser = () => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
      return null;
    }
  };