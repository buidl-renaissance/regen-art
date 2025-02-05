'use client'

import { useState, useEffect } from "react";
import { getProfile } from "@/app/actions";
import { Profile } from "@/lib/types";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const profileId = localStorage.getItem('profileId');
    if (profileId) {
      const fetchProfile = async () => {
        const profile = await getProfile(profileId);
        setProfile(profile);
      };
      fetchProfile();
    }
  }, []);

  return { profile };
};

