export default function CommunityCard() {
  return (
    <section
      id="_communityWrapper"
      className="bg-white md:col-span-2 rounded-t-md py-7 px-6 flex flex-col items-start justify-between space-y-5 md:space-y-0 md:p-10"
    >
      <h1 className="text-xl md:text-2xl text-primaryCyan font-semibold">
        Join our community
      </h1>
      <h2 className="font-semibold text-primaryBrightYellow md:text-lg">
        30-day, hassle-free money back guarantee
      </h2>
      <p className="text-neutralGrayishBlue leading-7 md:text-lg">
        Gain access to our full library of tutorials along with expert code
        reviews. Perfect for any developers who are serious about honing their
        skills.
      </p>
    </section>
  );
}
