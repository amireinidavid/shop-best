import { assets } from "@/assets/frontend_assets/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFliteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { useNavigate } from "react-router-dom";
import { getFeatureImages } from "@/store/common-slice";
function ShoppingHome() {
  const categoriesWithImg = [
    {
      id: "electronics",
      label: "Electronics",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/Artboard_1_copy.png",
    },
    {
      id: "clothes",
      label: "Clothes",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/Artboard_1_copy_13.png",
    },
    {
      id: "appliances",
      label: "Appliances",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/Artboard_1_copy_7.png",
    },
    {
      id: "accessories",
      label: "Accessories",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/beauty.png",
    },
    {
      id: "gaming",
      label: "Gaming",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/electronics.png",
    },
    {
      id: "gaming",
      label: "Gaming",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/electronics.png",
    },
    {
      id: "gaming",
      label: "Gaming",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/electronics.png",
    },
    {
      id: "gaming",
      label: "Gaming",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/electronics.png",
    },
    {
      id: "gaming",
      label: "Gaming",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/electronics.png",
    },
    {
      id: "gaming",
      label: "Gaming",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/electronics.png",
    },
    {
      id: "gaming",
      label: "Gaming",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/electronics.png",
    },
    {
      id: "gaming",
      label: "Gaming",
      img: "https://ng.jumia.is/cms/0-6-anniversary/2024/Collections/Thunbmails/electronics.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProduts
  );
  const { cartItems } = useSelector((state) => state.shopCart);

  const navigate = useNavigate();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(
      fetchAllFliteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);
  console.log(productList);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);
  console.log(getFeatureImages, "feature images");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithImg.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={categoryItem.img}
                    alt=""
                    className="w-full h-full object-contain mb-4 text-primary"
                  />
                  <span>{categoryItem.label} </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="inline-flex container gap-2 items-center mb-3 justify-center">
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          <h2 className="text-3xl font-bold  mb-8 text-center">
            Featured Products
          </h2>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:shadow-lg transition-shadow ">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
