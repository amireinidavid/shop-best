import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

function ShoppingProductTile({ handleAddtoCart, product }) {
  return (
    <Card className="w-full max-w-sm mx-auto hover:shadow-2xl ease-in border-black border-1 transition-shadow">
      <div>
        <Link to={`/shop/product/${product._id}`}>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            {product?.totalstock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Out Of Stock
              </Badge>
            ) : product?.totalstock < 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {`Hurry Only ${product?.totalstock} is items left`}
              </Badge>
            ) : product?.saleprice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            ) : null}
          </div>
        </Link>

        <CardContent className="p-4 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.saleprice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.saleprice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.saleprice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalstock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalstock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
