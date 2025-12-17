import { useNavigate } from "react-router";
import bannerImg from "../assets/bloodBanner.jpg";
import { LuLogIn } from "react-icons/lu";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-[600px] relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bannerImg}')` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="hero-content relative md:top-25 lg:top-50 z-10 w-full px-4">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            max-w-6xl
            mx-auto
            mt-32
          "
        >
          {/* Join Donor Card */}
          <div
            onClick={() => navigate("/register")}
            className="bg-red-600 text-white
              flex flex-col sm:flex-row
              justify-between
              items-start sm:items-center
              p-6 sm:p-10
              rounded-xl
              cursor-pointer
              transition-all duration-300
              hover:scale-105"
          >
            <div className="space-y-4 text-left">
              <h1 className="font-semibold text-2xl sm:text-3xl">
                Join as a Donor
              </h1>
              <p className="text-sm sm:text-base">
                Register now to become a blood donor and help save countless
                lives. Your small step can make a huge difference.
              </p>
            </div>

            <div className="text-4xl sm:text-5xl self-end sm:self-auto">
              <LuLogIn />
            </div>
          </div>

          {/* Search Donor Card */}
          <div
            onClick={() => navigate("/search")}
            className="
              bg-gray-600 text-white
              flex flex-col sm:flex-row
              justify-between
              items-start sm:items-center
              p-6 sm:p-10
              rounded-xl
              cursor-pointer
              transition-all duration-300
              hover:scale-105
            "
          >
            <div className="space-y-4 text-left">
              <h1 className="font-semibold text-2xl sm:text-3xl">
                Search Donors
              </h1>
              <p className="text-sm sm:text-base">
                Search for blood donors near you quickly and easily. Find the
                right match to save lives in time of need.
              </p>
            </div>

            <div className="text-4xl sm:text-5xl self-end sm:self-auto">
              <LuLogIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
