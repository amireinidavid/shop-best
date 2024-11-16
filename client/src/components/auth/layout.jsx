import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex  min-h-screen w-full">
      <div className="hidden flex-col lg:flex items-center justify-center bg-[#1c1d25] w-1/2 px-12">
        <div className=" md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
          <Lottie
            isClickToPausedDisabled={true}
            height={200}
            width={200}
            options={animationDefaultOptions}
          />
        </div>
        <div className="prata-regular max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ShopBest Store
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
