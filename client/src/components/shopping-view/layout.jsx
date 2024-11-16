import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common heaqder */}
      <ShoppingHeader />
      <div className="flex flex-col w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default ShoppingLayout;
