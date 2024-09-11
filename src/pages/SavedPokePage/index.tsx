import Component from '@/components/organisms/SavePoke';
import { useRouter } from 'next/router';

export default function savedPokePage() {
  const router = useRouter();
  const query = router.query;

  return (
    <div>
      <Component {...query} />
    </div>
  );
}
