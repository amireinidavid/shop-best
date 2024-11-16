import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import {
  fetchProductDetails,
  setProductDetails,
} from "@/store/shop/products-slice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Select } from "../ui/select";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/review-slice";

function ProductDetailsDialog({}) {
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { productId } = useParams();
  const { productDetails } = useSelector((state) => state.shopProduts);
  const { reviews } = useSelector((state) => state.shopReview);
  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
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

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }
  console.log(reviews);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="rounded-lg w-full h-full shadow-lg"
            />
          </motion.div>
        </div>
        <article className="px-8 pb-10">
          <h2 className="bg-slate-100 py-1 px-2 text-orange-400 uppercase tracking-wide text-sm font-bold inline-block rounded shadow mb-10">
            ShopBest
          </h2>
          <h1 className="text-slate-900 mb-10 font-bold text-3xl lg:text-4xl">
            {productDetails?.title}
          </h1>
          <p className="text-slate-600 mb-10 leading-relaxed">
            {productDetails?.description}
          </p>

          <div className="flex flex-wrap items-center justify-between lg:flex-col lg:items-start lg:gap-2">
            <ul className="flex items-center gap-5">
              <li className="text-slate-900 font-bold text-2xl">
                ${productDetails?.price}
              </li>
              <li className="bg-orange-100 py-1 px-2 text-orange-400 tracking-wide text-sm font-bold inline-block rounded shadow">
                50%
              </li>
            </ul>

            <p className="text-slate-600 text-sm">
              <s>${productDetails?.saleprice}</s>
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-10 lg:flex items-center justify-between gap-2">
            <div className="lg:flex-1">
              <div className="mb-5 flex items-center justify-center gap-4 py-2 px-4 text-white font-bold rounded-lg shadow mt-5 w-full lg:mt-0 hover:bg-gray-600 transition-all duration-200">
                {productDetails?.totalstock === 0 ? (
                  <Button className="w-full opacity-60 cursor-not-allowed">
                    Out of Stock
                  </Button>
                ) : (
                  <Button
                    className="w-full gap-1"
                    onClick={() =>
                      handleAddToCart(
                        productDetails?._id,
                        productDetails?.totalstock
                      )
                    }
                  >
                    <AiOutlineShoppingCart /> Add to cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
      <Separator />
      <div className="product-details flex flex-col gap-8">
        {/* Product details section */}
        <div className="product-info">
          {/* Your product details code here */}
        </div>

        {/* Reviews and Write a Review section */}
        <div className="reviews-container flex flex-col lg:flex-row gap-8 mt-10 border border-gray-300 rounded-lg p-6">
          {/* Reviews section */}
          <div className="reviews-section lg:w-1/2 pr-6 border-r border-gray-300">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4 items-start p-4 bg-white shadow-md rounded-lg">
                    <Avatar className="w-12 h-12 border rounded-full">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">
                          {reviewItem?.userName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-gray-600">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-gray-500">No Reviews</h1>
              )}
            </div>
          </div>

          {/* Write a Review section */}
          <div className="write-review-section lg:w-1/2 pl-6">
            <h2 className="text-2xl font-bold mb-6">Write a review</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
                className="p-2 border rounded-md"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className=" text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:text-black disabled:border-3 border-black"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsDialog;
