import { create } from 'zustand';

interface User {
  username: string;
  uuid: string;
}

interface UserState {
  users: User[];
  pendingUsers: Map<string, string>; // uuid -> username
  checkUsername: (username: string) => boolean;
  generateUuid: (username: string) => string;
  confirmRegistration: (uuid: string) => User | undefined;
  getUserByUuid: (uuid: string) => User | undefined;
}

// Function to generate a shorter, memorable ID
const generateShortId = () => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Removed similar looking characters
  const length = 8; // 8 characters long
  let result = '';
  
  // First 2 characters are always letters for better readability
  for (let i = 0; i < 2; i++) {
    const letterIndex = Math.floor(Math.random() * 24) + 8; // Index range for letters only
    result += chars[letterIndex];
  }
  
  // Remaining 6 characters can be numbers or letters
  for (let i = 2; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  
  // Insert dashes for better readability
  return `${result.slice(0, 4)}-${result.slice(4)}`;
};

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  pendingUsers: new Map(),
  
  checkUsername: (username: string) => {
    const { users } = get();
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
  },
  
  generateUuid: (username: string) => {
    let uuid;
    const { users, pendingUsers } = get();
    
    // Keep generating until we find a unique ID
    do {
      uuid = generateShortId();
    } while (
      users.some(user => user.uuid === uuid) || 
      pendingUsers.has(uuid)
    );
    
    set(state => {
      const newPendingUsers = new Map(state.pendingUsers);
      newPendingUsers.set(uuid, username);
      // Expire pending users after 1 hour
      setTimeout(() => {
        set(state => {
          const updatedPendingUsers = new Map(state.pendingUsers);
          updatedPendingUsers.delete(uuid);
          return { pendingUsers: updatedPendingUsers };
        });
      }, 3600000);
      return { pendingUsers: newPendingUsers };
    });
    return uuid;
  },
  
  confirmRegistration: (uuid: string) => {
    const { pendingUsers } = get();
    const username = pendingUsers.get(uuid);
    
    if (!username) return undefined;
    
    const user = { username, uuid };
    set(state => {
      const newPendingUsers = new Map(state.pendingUsers);
      newPendingUsers.delete(uuid);
      return {
        users: [...state.users, user],
        pendingUsers: newPendingUsers
      };
    });
    return user;
  },
  
  getUserByUuid: (uuid: string) => {
    const { users } = get();
    return users.find(user => user.uuid === uuid);
  }
}));