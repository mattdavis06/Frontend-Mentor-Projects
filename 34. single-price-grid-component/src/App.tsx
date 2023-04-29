import CommunityCard from "./components/CommunityCard";
import SubscriptionCard from "./components/SubscriptionCard";
import WhyUsCard from "./components/WhyUsCard";

function App() {
  return (
    <div id="_appWrapper" className="grid place-items-center md:h-screen">
      <main className="grid grid-rows-[minmax(250px,_auto)_minmax(200px,_auto)_minmax(270px,_auto)] grid-cols-1 md:grid-cols-2 md:grid-rows-[minmax(230px,_auto)_minmax(320px,_auto)] drop-shadow-2xl w-[85%] sm:w-[90%] lg:w-9/12 mx-auto max-w-3xl my-20 md:my-0">
        <CommunityCard />
        <SubscriptionCard />
        <WhyUsCard />
      </main>
    </div>
  );
}

export default App;
