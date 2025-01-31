import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import { InstagramOAuth } from '../components/InstagramOAuth';

interface SocialConnectFormProps {
  data: {
    socialConnection: 'instagram' | 'linkedin' | 'skip' | null;
  };
  updateData: (
    data: Partial<{
      socialConnection: 'instagram' | 'linkedin' | 'skip' | null;
    }>
  ) => void;
  onNext: () => void;
}

export default function SocialConnectForm({
  data,
  updateData,
  onNext,
}: SocialConnectFormProps) {
  const handleConnect = async (platform: 'instagram' | 'linkedin') => {
    // Simulate API call to retrieve user data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let name, handle;
    if (platform === 'instagram') {
      name = 'Instagram User';
      handle = '@insta_user';
    } else {
      name = 'LinkedIn Professional';
      handle = '@linkedin_pro';
    }

    updateData({ socialConnection: platform, name, handle });
    onNext();
  };

  const handleInstagramSuccess = (instagramData: {
    name: string;
    handle: string;
    profilePicture: string;
  }) => {
    updateData({
      socialConnection: 'instagram',
      name: instagramData.name,
      handle: instagramData.handle,
      // You might want to add profilePicture to your profileData state if you haven't already
      // profilePicture: instagramData.profilePicture,
    });
    onNext();
  };

  const handleSkip = () => {
    updateData({ socialConnection: 'skip' });
    onNext();
  };

  const handleInstagramError = (error: string) => {
    // Handle error (e.g., show a toast notification)
    console.error(error);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-center">
        Connect your social media to get started
      </h2>
      <div className="flex flex-col space-y-4">
        <InstagramOAuth
          onSuccess={handleInstagramSuccess}
          onError={handleInstagramError}
        />

        {/* <Button
          onClick={() => handleConnect('linkedin')}
          className="flex items-center justify-center space-x-2"
        >
          <Linkedin className="w-5 h-5" />
          <span>Connect LinkedIn</span>
        </Button> */}
        <Button variant="outline" onClick={handleSkip}>
          Skip and create profile manually
        </Button>
      </div>
    </div>
  );
}
