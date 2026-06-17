import Room from "@/components/room/Room";
import { rooms } from "@/content/rooms";
import "@/styles/lobby-theme.css";

export const metadata = {
  title: "Seed — HOME",
  description: "Some doors only open quietly. Seed the first rooms.",
};

export default function Page() {
  return <Room room={rooms.seed} />;
}
