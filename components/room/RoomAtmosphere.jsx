// Fixed, full-viewport backdrop. Stays anchored behind the scrolling
// content so the room itself never moves — only what's inside it does.
export default function RoomAtmosphere() {
  return (
    <div className="room-backdrop" aria-hidden="true">
      <div className="room-layer room-backdrop__wall" style={{ "--depth": 0.1 }} />
      <div className="room-layer room-backdrop__chandelier" style={{ "--depth": 0.16 }} />
      <div className="room-layer room-backdrop__hearth" style={{ "--depth": 0.2 }} />
      <div className="room-layer room-backdrop__floor" style={{ "--depth": 0.14 }} />
      <div className="room-layer room-backdrop__vignette" style={{ "--depth": 0.28 }} />
    </div>
  );
}
