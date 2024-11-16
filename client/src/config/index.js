export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter Your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "electronics", label: "Electronics" },
      { id: "clothes", label: "Clothes" },
      { id: "appliances", label: "Appliances" },
      { id: "accessories", label: "accessories" },
      { id: "gaming", label: "Gaming" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "sony", label: "Sony" },
      { id: "puma", label: "Lenovo" },
      { id: "hp", label: "Hp" },
      { id: "xBox", label: "xBox" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "saleprice",
    componentType: "input",
    type: "number",
    placeholder: "Enter product sales price",
  },

  {
    label: "Total Stock",
    name: "totalstock",
    componentType: "input",
    type: "number",
    placeholder: "Enter totla stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
    sublabel: [
      {
        id: "electronics",
        label: "Electronics",
        path: "/shop/listing",
      },
      {
        id: "gaming",
        label: "Gaming",
        path: "/shop/listing",
      },
      {
        id: "clothes",
        label: "Clothes",
        path: "/shop/listing",
      },

      {
        id: "accessories",
        label: "Accessories",
        path: "/shop/listing",
      },
    ],
  },
];

export const categoryOptionsMap = {
  electronics: "Electronics",
  clothes: "Clothes",
  appliances: "Appliances",
  accessories: "Accessories",
  gaming: "Gaming",
};

export const brandOptionsMap = {
  nike: "Nike",
  sony: "Sony",
  puma: "Puma",
  hp: "Hp",
  xBox: "xBox",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "electronics", label: "Electronics" },
    { id: "clothes", label: "Clothes" },
    { id: "appliances", label: "Appliances" },
    { id: "accessories", label: "accessories" },
    { id: "gaming", label: "Gaming" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "sony", label: "Sony" },
    { id: "puma", label: "Lenovo" },
    { id: "hp", label: "Hp" },
    { id: "xBox", label: "xBox" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
