
import Layout from "@/components/layout/Layout";
import NearbyMap from "@/components/nearby/NearbyMap";

const Nearby = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] relative">
        <NearbyMap />
      </div>
    </Layout>
  );
};

export default Nearby;
