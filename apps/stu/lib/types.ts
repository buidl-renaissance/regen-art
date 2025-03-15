export interface Profile {
    id?: string;
    email: string;
    handle: string;
    name: string;
    bio?: string;
    profile_picture?: string;
    data?: {
      certifications: string[];
      skills: string[];
      creativePursuits: string[];
      groupFitnessActivities: string[];
    };
  }
  