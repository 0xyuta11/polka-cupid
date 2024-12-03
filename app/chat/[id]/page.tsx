import ChatPage from "@/components/Chatting";

export default function SpecificChatPage({ params }: { params: { id: string } }) {
  return <ChatPage matchId={params.id} />;
}