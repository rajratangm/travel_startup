
import Layout from "@/components/layout/Layout";
import MessagingPanel from "@/components/messaging/MessagingPanel";

const Messages = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <MessagingPanel />
      </div>
    </Layout>
  );
};

export default Messages;
