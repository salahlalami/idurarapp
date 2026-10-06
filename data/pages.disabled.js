// DISABLED e-commerce pages (shop, cart, checkout, orders, wishlist).
// Not imported anywhere. To re-enable: move these entries into data/pages.js,
// restore the layouts in layout/index.js, the "products"/"categories" collections
// in lib/collections.js, and the cart icon in Header.js.
const disabledPages = [
  {
    id: "shop",
    showInNav: false,
    layout: "shop",
    translations: {
      en: {
        slug: "shop",
        title: "Shop",
        description: "Software licenses and services.",
        content: [],
      },
      fr: {
        slug: "boutique",
        title: "Boutique",
        description: "Licences logicielles et services.",
        content: [],
      },
      ar: {
        slug: "المتجر",
        title: "المتجر",
        description: "تراخيص برمجية وخدمات.",
        content: [],
      },
    },
  },
  {
    id: "wishlist",
    noindex: true,
    layout: "wishlist",
    translations: {
      en: {
        slug: "wishlist",
        title: "Wishlist",
        description: "Products you saved.",
        content: [],
      },
      fr: {
        slug: "favoris",
        title: "Favoris",
        description: "Les produits que vous avez enregistrés.",
        content: [],
      },
      ar: {
        slug: "المفضلة",
        title: "المفضلة",
        description: "المنتجات التي حفظتها.",
        content: [],
      },
    },
  },
  {
    id: "orders",
    noindex: true,
    layout: "orders",
    translations: {
      en: {
        slug: "orders",
        title: "My orders",
        description: "Orders placed in this browser.",
        content: [],
      },
      fr: {
        slug: "commandes",
        title: "Mes commandes",
        description: "Commandes passées dans ce navigateur.",
        content: [],
      },
      ar: {
        slug: "طلباتي",
        title: "طلباتي",
        description: "الطلبات المسجلة في هذا المتصفح.",
        content: [],
      },
    },
  },
  {
    id: "cart",
    noindex: true,
    layout: "cart",
    translations: {
      en: {
        slug: "cart",
        title: "Cart",
        description: "Your shopping cart.",
        content: [],
      },
      fr: {
        slug: "panier",
        title: "Panier",
        description: "Votre panier.",
        content: [],
      },
      ar: {
        slug: "السلة",
        title: "السلة",
        description: "سلة التسوق الخاصة بك.",
        content: [],
      },
    },
  },
  {
    id: "checkout",
    noindex: true,
    layout: "checkout",
    translations: {
      en: {
        slug: "checkout",
        title: "Checkout",
        description: "Complete your order.",
        content: [],
      },
      fr: {
        slug: "paiement",
        title: "Paiement",
        description: "Finalisez votre commande.",
        content: [],
      },
      ar: {
        slug: "إتمام-الشراء",
        title: "إتمام الشراء",
        description: "أكمل طلبك.",
        content: [],
      },
    },
  },
  {
    id: "order-confirmation",
    noindex: true,
    layout: "confirmation",
    translations: {
      en: {
        slug: "order-confirmation",
        title: "Order confirmation",
        description: "Your order.",
        content: [],
      },
      fr: {
        slug: "confirmation-commande",
        title: "Confirmation de commande",
        description: "Votre commande.",
        content: [],
      },
      ar: {
        slug: "تأكيد-الطلب",
        title: "تأكيد الطلب",
        description: "طلبك.",
        content: [],
      },
    },
  },
];

export default disabledPages;
