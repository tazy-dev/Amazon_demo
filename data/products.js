import { formatCurrency } from "../scripts/utils/money.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }
  extraInfoHTML() {
    return ``;
  }
}

class Clothing extends Product {
  type;
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.type = productDetails.type;
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}

export let products = [];

// Using the Fetch API
export async function loadProdects() {
  const response = await fetch("https://supersimplebackend.dev/products");
  const data = await response.json();
  products = data.map((product) => {

    if (product.type == "clothing") {
      return new Clothing(product);
    }
    return new Product(product);
  });    
  
}

// export function loadProjects(fun) {
//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener("load", () => {
//     products = JSON.parse(xhr.response).map((product) => {
//       if (product.type == "clothing") {
//         return new Clothing(product);
//       }
//       return new Product(product);
//     });
//     fun();
//   });
//   xhr.open("GET", "https://supersimplebackend.dev/products");
//   xhr.send();
// }

