import Lobby from "@/components/lobby/Lobby";
import "@/styles/lobby-theme.css";

export const metadata = {
  title: "HOME — You found the door.",
  description:
    "The front door of a relational ecosystem. Life is a family, not a marketplace.",
};

export default function Page() {
  return <Lobby />;
}
