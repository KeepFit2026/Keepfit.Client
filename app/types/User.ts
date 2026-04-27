export type User = {
  id: string;
  name: string;
  email: string;
  onboarding_completed?: boolean;
  current_xp: number;
  current_level: number;
  xp_required: number
}

export type UserContextType = {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
}
