export type User = {
  id: string;
  name: string;
  email: string;
  onboarding_completed?: boolean;
}

export type UserContextType = {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
}
