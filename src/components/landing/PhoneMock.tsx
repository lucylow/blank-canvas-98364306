import appScreenshot from "@/assets/app-screenshot.png";

const PhoneMock = () => {
  return (
    <div className="w-[250px] h-[500px] md:w-[300px] md:h-[600px] rounded-[40px] border-[8px] border-border relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
      <img
        src={appScreenshot}
        alt="SafeStep AR mobile application screenshot"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PhoneMock;
