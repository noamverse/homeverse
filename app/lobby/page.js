import Lobby from "@/components/lobby/Lobby";
import "@/styles/lobby-theme.css";

export const metadata = {
  title: "The Lobby",
  description: "You found the door.",
};

export default function Page() {
  return <Lobby />;
}
