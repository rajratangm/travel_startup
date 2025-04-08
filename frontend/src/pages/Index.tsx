
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import QuickActions from "@/components/home/QuickActions";
import UpcomingTrips from "@/components/home/UpcomingTrips";
import ExploreNearby from "@/components/home/ExploreNearby";
import SuggestedMatches from "@/components/home/SuggestedMatches";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <QuickActions />
      <ExploreNearby />
      <UpcomingTrips />
      <SuggestedMatches />
    </Layout>
  );
};

export default Index;
