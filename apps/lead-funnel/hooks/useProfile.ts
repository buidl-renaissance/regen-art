'use client'

import { useState, useEffect } from "react";
import { getProfile } from "@/app/actions";
import { Profile } from "@/lib/types";
import { useRouter } from "next/navigation";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
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

  const handleLogout = () => {
    localStorage.removeItem('profileId');
    localStorage.removeItem('email');
    setProfile(null);
    router.push('/');
  }

  return { profile, handleLogout };
};

