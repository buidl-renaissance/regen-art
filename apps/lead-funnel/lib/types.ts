export interface Profile {
    id?: string;
    email: string;
    handle: string;
    name: string;
    bio?: string;
    profilePicture?: string;
    data?: {
      certifications: string[];
      skills: string[];
      creativePursuits: string[];
      groupFitnessActivities: string[];
    };
  }
  