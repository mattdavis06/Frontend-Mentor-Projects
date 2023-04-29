export default function SubscriptionCard() {
  return (
    <section
      id="_subscriptionWrapper"
      className="bg-primaryCyan md:rounded-bl-md md:rounded-br-none py-7 px-6 flex flex-col items-start justify-between space-y-5 md:space-y-0 md:p-10"
    >
      <h3 className="text-xl text-white font-semibold">Monthly Subscription</h3>
      <h4 className="text-4xl text-white flex items-center">
        &#36;29 <span className="text-white/70 text-lg ml-3">per month</span>
      </h4>
      <h5 className="text-white text-lg">
        Full access for less than &#36;1 a day
      </h5>
      <button className="btn bg-primaryBrightYellow text-white text-lg py-3.5 w-full rounded-md drop-shadow-xl hover:bg-primaryBrightYellow/70 transition-colors font-semibold">
        Sign Up
      </button>
    </section>
  );
}
