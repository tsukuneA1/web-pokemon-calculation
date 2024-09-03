/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4LcqOUIdcIY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { JSX, SVGProps } from 'react';

export default function Component() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MenuIcon className="w-6 h-6" />
          <h1 className="text-lg font-bold">ポケソル</h1>
        </div>
        <div className="flex items-center space-x-2">
          <SunIcon className="w-6 h-6" />
          <SettingsIcon className="w-6 h-6" />
          <BellIcon className="w-6 h-6" />
          <UserIcon className="w-6 h-6" />
        </div>
      </header>
      <div className="flex items-center justify-between mb-4">
        <Button variant="default" className="flex items-center space-x-2">
          <SaveIcon className="w-4 h-4" />
          <span>保存</span>
        </Button>
        <Button variant="destructive" className="flex items-center space-x-2">
          <DeleteIcon className="w-4 h-4" />
          <span>キャンセル</span>
        </Button>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src="/placeholder.svg"
          alt="Pokemon"
          className="w-16 h-16"
          width="64"
          height="64"
          style={{ aspectRatio: '64/64', objectFit: 'cover' }}
        />
        <div className="flex space-x-2">
          <Badge variant="default" className="bg-purple-500 text-white">
            ゴースト
          </Badge>
          <Badge variant="default" className="bg-pink-500 text-white">
            フェアリー
          </Badge>
          <Badge variant="default" className="bg-blue-500 text-white">
            ステラ
          </Badge>
        </div>
      </div>
      <form className="space-y-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="pokemon-name">ポケモン</Label>
          <Input id="pokemon-name" placeholder="ハバタクカミ" className="flex-1" />
          <Label htmlFor="level">レベル</Label>
          <Input id="level" placeholder="50" className="w-16" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="move1">技1</Label>
          <Input id="move1" placeholder="ムーンフォース" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="move2">技2</Label>
          <Input id="move2" placeholder="シャドーボール" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="move3">技3</Label>
          <Input id="move3" placeholder="あまえる" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="move4">技4</Label>
          <Input id="move4" placeholder="いたみわけ" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teratype">テラスタイプ</Label>
            <Select>
              <SelectTrigger id="teratype">
                <SelectValue placeholder="ステラ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ステラ">ステラ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ability">特性</Label>
            <Select>
              <SelectTrigger id="ability">
                <SelectValue placeholder="こだいかっせい" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="こだいかっせい">こだいかっせい</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="item">もちもの</Label>
            <Input id="item" placeholder="こだわりメガネ" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nature">せいかく</Label>
            <Input id="nature" placeholder="おくびょう" />
          </div>
        </div>
      </form>
    </div>
  );
}

function BellIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function DeleteIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SaveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );
}

function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SunIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
