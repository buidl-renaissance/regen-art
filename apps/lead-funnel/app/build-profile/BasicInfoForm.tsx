import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface BasicInfoFormProps {
  data: {
    bio: string;
    handle: string;
    name: string;
    socialConnection: 'instagram' | 'linkedin' | 'skip' | null;
  };
  updateData: (
    data: Partial<{ bio: string; handle: string; name: string }>
  ) => void;
}

export default function BasicInfoForm({
  data,
  updateData,
}: BasicInfoFormProps) {
  return (
    <div className="space-y-4">
      {data.socialConnection && data.socialConnection !== 'skip' && (
        <p className="text-sm text-gray-600 mb-4">
          We've pre-filled some information based on your{' '}
          {data.socialConnection} profile. Feel free to edit or add more
          details.
        </p>
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="Your name"
        />
      </div>
      <div>
        <Label htmlFor="handle">Handle</Label>
        <Input
          id="handle"
          value={data.handle}
          onChange={(e) => updateData({ handle: e.target.value })}
          placeholder="Your unique handle"
        />
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          placeholder="Tell us about yourself"
          rows={6}
        />
      </div>
    </div>
  );
}
