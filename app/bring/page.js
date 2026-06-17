import Room from "@/components/room/Room";
import { rooms } from "@/content/rooms";
import "@/styles/lobby-theme.css";

export const metadata = {
  title: "Bring — HOME",
  description: "There's a seat with your name on it. Bring who you are.",
};

export default function Page() {
  return <Room room={rooms.bring} />;
}
