/* Daily Deal Bazar — product catalog (real products only, no fake prices/ratings) */
const PRODUCTS = [
  {
    id: "hydraulic-jack-30t",
    name: "Heavy Duty 30 Ton Portable Low Profile Hydraulic Ram Cylinder 700bar Jack with Hand Pump",
    short: "Heavy Duty 30 Ton Hydraulic Jack",
    price: 638.49,
    oldPrice: null,
    rating: null,
    badge: "Top On Sale",
    category: "home-kitchen",
    categoryName: "Home & Kitchen",
    link: "https://s.click.aliexpress.com/e/_c37x9Ah5",
    images: [
      "assets/products/hydraulic-jack/main.png",
      "assets/products/hydraulic-jack/photo-2.png",
      "assets/products/hydraulic-jack/photo-3.png",
      "assets/products/hydraulic-jack/photo-4.png",
      "assets/products/hydraulic-jack/photo-5.png",
      "assets/products/hydraulic-jack/photo-6.png"
    ],
    video: "assets/products/hydraulic-jack/ad-video.mp4",
    poster: "assets/products/hydraulic-jack/ad-photo.png",
    desc: "Heavy duty 30 ton portable low profile hydraulic ram cylinder with 700bar hand pump. Strong, reliable lifting power for garage, workshop and heavy jobs.",
    specs: [["Capacity", "30 Ton"], ["Pressure", "700 bar"], ["Type", "Portable low profile hydraulic ram cylinder"], ["Includes", "Hand pump"]],
    added: 1,
    popular: true
  },
  {
    id: "jesus-saves-hoodie",
    name: "Jesus Saves Good News Prints Women Fleece Pocket Hoodie Suit Sport Soft Sportpants Loose Casual Clothes Street Jogging Tops",
    short: "Jesus Saves Good News Hoodie Suit",
    price: 24.79,
    oldPrice: null,
    rating: null,
    badge: "Top On Sale",
    category: "fashion-beauty",
    categoryName: "Fashion & Beauty",
    link: "https://s.click.aliexpress.com/e/_c43v8zMf",
    images: [
      "assets/products/jesus-saves-hoodie/main.jpg",
      "assets/products/jesus-saves-hoodie/photo-2.jpg",
      "assets/products/jesus-saves-hoodie/photo-3.jpg",
      "assets/products/jesus-saves-hoodie/photo-4.jpg",
      "assets/products/jesus-saves-hoodie/photo-5.jpg",
      "assets/products/jesus-saves-hoodie/photo-6.jpg"
    ],
    video: "assets/products/jesus-saves-hoodie/ad-video.mp4",
    poster: "assets/products/jesus-saves-hoodie/ad-photo.png",
    desc: "Women fleece pocket hoodie suit with Jesus Saves Good News print. Soft, loose and casual — hoodie top with matching sport sweatpants for street and jogging wear.",
    specs: [["Set", "2 pieces — hoodie top + sweatpants"], ["Material", "Fleece"], ["Fit", "Loose casual"], ["Style", "Street / jogging"]],
    added: 2,
    popular: false
  },
  {
    id: "nyc-hoodie-set",
    name: "2Pcs Zipper Hoodie Set Women New York City Prints Sweatpants Sporty Oversized Fleece Warm Sweatshirts Pants Autumn Pocket Clothes",
    short: "New York City Zipper Hoodie Set",
    price: 30.29,
    oldPrice: null,
    rating: null,
    badge: "Top On Sale",
    category: "fashion-beauty",
    categoryName: "Fashion & Beauty",
    link: "https://s.click.aliexpress.com/e/_c3WzEFv1",
    images: [
      "assets/products/nyc-hoodie-set/main.jpg",
      "assets/products/nyc-hoodie-set/photo-2.jpg",
      "assets/products/nyc-hoodie-set/photo-3.jpg",
      "assets/products/nyc-hoodie-set/photo-4.jpg",
      "assets/products/nyc-hoodie-set/photo-5.jpg",
      "assets/products/nyc-hoodie-set/photo-6.jpg"
    ],
    video: "assets/products/nyc-hoodie-set/ad-video.mp4",
    poster: "assets/products/nyc-hoodie-set/ad-photo.png",
    desc: "2-piece zipper hoodie set with New York City prints. Sporty oversized fleece, warm sweatshirt and sweatpants with pockets — perfect for autumn.",
    specs: [["Set", "2 pieces — zipper hoodie + sweatpants"], ["Material", "Fleece"], ["Fit", "Oversized sporty"], ["Season", "Autumn"]],
    added: 3,
    popular: false
  },
  {
    id: "ny-tracksuit",
    name: "NEW YORK Women's Tracksuit Autumn Winter Hoodies Trousers 2PCS Suit Sports Jogging Street High quality Clothes Women Pants Sets",
    short: "NEW YORK Women's Tracksuit",
    price: 23.19,
    oldPrice: null,
    rating: null,
    badge: "Top On Sale",
    category: "fashion-beauty",
    categoryName: "Fashion & Beauty",
    link: "https://s.click.aliexpress.com/e/_c3MvCmVz",
    images: [
      "assets/products/ny-tracksuit/main.jpg",
      "assets/products/ny-tracksuit/photo-2.jpg",
      "assets/products/ny-tracksuit/photo-3.jpg",
      "assets/products/ny-tracksuit/photo-4.jpg",
      "assets/products/ny-tracksuit/photo-5.jpg",
      "assets/products/ny-tracksuit/photo-6.jpg"
    ],
    video: "assets/products/ny-tracksuit/ad-video.mp4",
    poster: "assets/products/ny-tracksuit/ad-photo.png",
    desc: "NEW YORK women's tracksuit for autumn and winter. 2-piece hoodies and trousers suit for sports, jogging and street wear — high quality everyday comfort.",
    specs: [["Set", "2 pieces — hoodie + trousers"], ["Season", "Autumn / Winter"], ["Style", "Sports / jogging / street"], ["Fit", "Comfortable"]],
    added: 4,
    popular: false
  }
];

const CATEGORIES = [
  { slug: "all", name: "All Products" },
  { slug: "electronics", name: "Electronics" },
  { slug: "home-kitchen", name: "Home & Kitchen" },
  { slug: "fashion-beauty", name: "Fashion & Beauty" },
  { slug: "health-care", name: "Health & Personal Care" },
  { slug: "toys-gifts", name: "Toys & Gifts" },
  { slug: "sports-fitness", name: "Sports & Fitness" },
  { slug: "mobile-accessories", name: "Mobile Accessories" },
  { slug: "digital", name: "Digital Products" }
];

function catName(slug) {
  const c = CATEGORIES.find(x => x.slug === slug);
  return c ? c.name : slug;
}
function money(n) { return "USD " + n.toFixed(2); }
