import Room from "@/components/room/Room";
import { rooms } from "@/content/rooms";
import "@/styles/lobby-theme.css";

export const metadata = {
  title: "Belong",
  description: "Come be received.",
};

export default function Page() {
  return <Room room={rooms.belong} />;
}
