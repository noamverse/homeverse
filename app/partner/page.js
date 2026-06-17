import Room from "@/components/room/Room";
import { rooms } from "@/content/rooms";
import "@/styles/lobby-theme.css";

export const metadata = {
  title: "Partner — HOME",
  description: "Every city is a door. Open a channel between houses.",
};

export default function Page() {
  return <Room room={rooms.partner} />;
}
