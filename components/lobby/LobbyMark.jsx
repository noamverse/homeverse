import Image from "next/image";
import Link from "next/link";

export default function LobbyMark() {
  return (
    <Link href="/" className="lobby-mark" aria-label="Return to the Lobby">
      <Image src="/home-icon.png" alt="" width={34} height={34} priority />
    </Link>
  );
}
