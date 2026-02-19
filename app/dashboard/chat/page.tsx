import ChatRoomList from "./chatroomlist";

export default function page() {
  const rooms = [
    {
      id: "1",
      name: "Hostel Manager - Room 204",
      unread: 3,
      lastMessage: "Please confirm availability.",
      lastMessageTime: "12:40 PM",
    },
    {
      id: "2",
      name: "Support - New Booking",
      unread: 0,
      lastMessage: "Thank you!",
      lastMessageTime: "11:10 AM",
    },
    {
      id: "3",
      name: "Admin - System Alerts",
      unread: 10,
      lastMessage: "Server restart required.",
      lastMessageTime: "Yesterday",
    },
  ];

  return (
    <div className="p-6">
      <ChatRoomList rooms={rooms} />
    </div>
  );
}
