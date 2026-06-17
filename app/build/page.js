import Room from "@/components/room/Room";
import { rooms } from "@/content/rooms";
import "@/styles/lobby-theme.css";

export const metadata = {
  title: "Build — HOME",
  description: "Bring what wants to become real. Place your build on the table.",
};

export default function Page() {
  return <Room room={rooms.build} />;
}
