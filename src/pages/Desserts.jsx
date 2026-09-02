import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import {
  ArrowDown,
  ArrowRight,
  Camera,
  Coffee,
  Menu,
  Search,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";


/* =========================================================
   IMAGES
========================================================= */

const images = {
  hero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCaZIHRUzvGQDEABSmrXMto3ZuD6vzR1mpQN2lF-q21LozAKh_36b8K9BzoJd_RAPN3eJJ3NY8M_yzzjS8RqCeqXC0zmIOjekR5tTdBArl_sDeHAsl4KYl28sIe66ln3eu36n67E3vyAE_iNCIMr4929_NXCu0lFpcwqUoW-Ykjp7RFpp-u9iKx00S7uyMDbzfKc7SlemnmybPF7Doy47fjQ8uaja2SI9Jihxhr0AWTRv_MQNwlDuz0",

  cheesecake:
 "/images/silkcheesecake.jpg",
  tiramisu:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDoIGHjCaQkOXA6305DwMJKwA3Oe99ROlKVDSypK3Sr3DkMxRGORrF8F5RJsKEX7cDG7viEyzyf0vRGcH2FcsWuj9_bkv598e8HhiYDCYPCO8PfsXceACXfLbL_2FjMTUX8RK4f82LuvjsquLdfSrUHPKKfvnvl_mG12nRCRYsfnu01QEEQgwMuOZ5qX_RqvcOFFUSLDOEMUJClMlunX7bQpLY0gtZlLzg-gXIVdkW_fMuFgqbVK3A1",

  velvet:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDjtifNIrL0LHCrSlO3L9mqgsi3Fd37DZxVemxhTA9HKJVmSgK-i8G0RfBDAFFdREki1G5V6Hhal-8ey6fnb8OPWwixD8KxZaa6Vjf8MHpsGYIX9ssMxGL5vClWVM0aVGV9HicUYsZq7BL9ZQ7-9LK7f4_RZEGe-dHHkgQgcXNMYDGSElBQFA2majUmY634hOoc01I6sS9FNyeSJ0lYd5sqjeu_eAuiKG3J_g52-cGe9WPl4KVGj7uc",

  pistachio:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBZWVOMSRot-9s1lc7DzLJBGKmDTumf6J64pEFGEsIOXfPxgeEFZoMpTZd6-q2gqGnt8QdwZM_gZfg1PJrqwxhYhBNE2nW7jdIsknzePB-IeO4Hv-Ylw3mdlQW9MfeF7Pmhq5uijhGxJnbsPCynTS5U5a5igGP-GVEeY3XbNgE7brG-c0_DGiKzjOqribPtEO6BtSEMPKqVH-yBaOfzD_oKhgOqMQZZupEVMKNie223rYrT540i1j3m",

  lotus:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCgTJAq3UEohhbZnhYhEtBnPUuwRAajJSgakgXibPWvWo4hjFacmVgIcl_qvUH5DFeLlqT68xSsBmOCeKMfpbdoWRkv5USldEL6s9uyx2D6L3ncs1whrEw_vIPdbLIC4xwF141kUixLMVQ6XAgBuFdSCSf1CUN3iafYNcj2GGTjIisXfcTZ0G6zGY5o2G6TCzsH3z5wq-Nt6kXG1tO90L4mNq1bOGdsM4oGO_8r-MpXO5lOvt-87ZFO",

  chocolate:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAWxxz39JRvOvmj4gMvA0qV5i02LiotAvJPqVmOIcN79IiezevlfUCAgER6TLL771uuU2Try2oswB5j7hS668skEYvjPpF0PDuxvRX7cuwCa36tk3g1DKtKe1Zy9u3tdo_AJBe-HVrpHUHWWiTUcwZnA6FnO0lFdtKeo4z53-rH_I7T-_So15LuLcvABs7y4uahx2J5bR-xqGx_iRopsk7e1Y42frkAedl9gHSsxC2-WmwwwEesaufX",

  pairing1:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9yXBAT10gNiFFo6cNbcM73t4Q3C3-ShWzYGd9YhawWLzsRFfgZqVGbIzVR3WgahkTozuCsqs8Zb1xlfnN1d3oWg__ETRVZ2fcJat5FZLSlizlGVnEzM3HFGLm9BqE6rImeuw8qJ0avI8YxAmNWPKBHYfB-qWr0CwnMgSi564x4iuin9KC9ZbZL6AhI-sLEMEPJMJxWbdmBhb3db851B97fvv31RiaVY1vZprwGavfl05t1nUueQQt",

  pairing2:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBUn5FvczUqWfXLeip0elGc7r3nuJ5lGS4tQd5-CBIiBqdh7R-DvYI-M1ZwkV1_oRtfWUdDp2NTgQ59mBAsTlPrkchJyhHL4XzEUT7SP37cjz-3XMHndvdGHu0XvmANrghrHQAFYax3Ao9PilsGHbd1tPUTJlfrqSvsKjStkRCbepsugzl4KqtjceCENxx7aGsl3JCxlfdQ6aX4ljUYozyhNp9mFScTZYiE-5TieR8iOdAiDUZ_zw_x",

  croissant:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBnBrlM4JJX3f4hbv2QFPB5JHPox1LTR0Qyt5E5AQPbvx3Ff17I-8ewEpUqSNRaU1JT1883Vktkb6hRqI-Vt8eiJSdlj6a6ysun9CbCIhKbI4zCOWpQOn5Gr_rbSP5OnQh_jyEPtJTrBfvdvx2EDvjUs4lah5ohm0vVONco6IrTYdyYAKvfXi3NRnohjqIBJqCml3mgb8RLC14yu4s2jMRG7sQ6ztGu2pGLmKoPc4TQqlR9ulGfbtVL",

  cinnamon:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDBPc6E196WRzCLZyMoOA9LIX6pc-xAmJIxiCjcJYYXWyB6O1HCuU-Y2sAGCSQYkDTtnsnWY4TunKCOk6QMipWoQXr45V8nUDOlCfzSgnoXprTmGgWyczYsxPL7VcFXWUcnIoyHQBg-EhxinGAvhKLD46yAfR3Ta84SexFzzxSqhyF7Exe5eVSymIcBODoAr8_uT-d1uXiEr7YRxeU5BPKw4fLCPF3Pi8JZ-8q6B3h4fYPkPBxT8R3e",

  banana:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAQsyW0_PNb7-q9La-JBmLo9LcUDnAAIT2BnSpRWyaHRjKN6uCRXa86Q8NdQUmU3RiBs0rG0g5Zcagnh8jPQf62Gi2glTCm-R7wEIvSfuZJC56eRH_w8FKF16Oj9TjUkWuOEzX5R-t2BFtvcPS4k802_zMERcJeK572T_Ofvn7gsSgCWH_Untji3hPFdC988Swns54l-y-6bBV35lGvQ4Ko1yzBEFaZulNzUNeQTE3dq7lYtNOlxAGn",


  bakersDozen: "/images/bakers-dozen.jpg",
};


/* =========================================================
   PRODUCT DATA
========================================================= */

const cakes = [
  {
    name: "Silk Cheesecake",
    description:
      "Notes of Tahitian vanilla, salted Hokkaido cream, graham crust.",
    price: 1200,
    calories: 420,
    image: images.cheesecake,
  },
  {
    name: "Kyoto Tiramisu",
    description:
      "Matcha-infused ladyfingers, light mascarpone, ceremonial dust.",
    price: 1400,
    calories: 380,
    image: images.tiramisu,
  },
  {
    name: "Velvet Rouge",
    description:
      "Dark cocoa, organic buttermilk, whipped vanilla bean frosting.",
    price: 1150,
    calories: 450,
    image: images.velvet,
  },
];

const donuts = [
  {
    name: "Sicilian Pistachio",
    description:
      "Lightly roasted nuts blended into silky white chocolate ganache, finished with sea salt.",
    price: 650,
    calories: 310,
    image: images.pistachio,
  },
  {
    name: "Lotus Speculoos",
    description:
      "Spiced cookie butter glaze with crushed lotus biscuit topping.",
    price: 575,
    image: images.lotus,
  },
  {
    name: "70% Belgian Dark",
    description:
      "A rich, bitter-sweet ganache made from responsibly sourced cocoa.",
    price: 625,
    image: images.chocolate,
  },
];

const bakery = [
  {
    name: "Almond Croissant",
    description:
      "Twice-baked with almond frangipane.",
    price: 750,
    image: images.croissant,
  },
  {
    name: "Cinnamon Roll",
    description:
      "Ceylon cinnamon & brown butter glaze.",
    price: 600,
    image: images.cinnamon,
  },
  {
    name: "Banana Bread",
    description:
      "Caramelized bananas & walnut crunch.",
    price: 550,
    image: images.banana,
  },
];


/* =========================================================
   SCROLL REVEAL
========================================================= */

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return ref;
}


function Reveal({ children, className = "" }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}


/* =========================================================
   IMAGE COMPONENT
========================================================= */

function Image({
  src,
  alt,
  className = "",
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
}


/* =========================================================
   ADD BUTTON
========================================================= */

function AddButton({
  item,
  onAdd,
  compact = false,
}) {
return (
  <button
    onClick={() => onAdd(item)}
    className={
      compact
        ? "flex items-center gap-2 rounded-full bg-[#E8D8CC] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
        : "flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
    }
  >
    <ShoppingCart size={16} />
    Add to Cart
  </button>
);
}


/* =========================================================
   MAIN APP
========================================================= */

function Desserts() {
 

  const [search, setSearch] = useState("");

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [subscribed, setSubscribed] =
    useState(false);

   const {
  addToCart,
  totalItems,
  subtotal,
} = useCart(); 


  /* =====================================================
     ADD TO CART
  ===================================================== */




  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) =>
      `${cake.name} ${cake.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);





  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="fixed top-0 z-50 h-20 w-full border-b border-brown/5 bg-white/70 shadow-sm shadow-brown/5 backdrop-blur-3xl">

        <nav className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-16">

          {/* LOGO */}

          <a
            href="#"
            className="font-display text-2xl tracking-tight text-brown md:text-3xl"
          >
            Brew Haven
          </a>


          {/* DESKTOP NAVIGATION */}

<div className="hidden items-center gap-8 md:flex">

  <Link
    to="/coffee/hot"
    className="text-muted transition-colors hover:text-brown"
  >
    Hot Coffee
  </Link>

  <Link
    to="/coffee/cold"
    className="text-muted transition-colors hover:text-brown"
  >
    Cold Coffee
  </Link>

  <Link
    to="/special-drinks"
    className="text-muted transition-colors hover:text-brown"
  >
    Special Drinks
  </Link>

  <Link
    to="/desserts"
    className="border-b-2 border-brown pb-1 font-bold text-brown"
  >
    Desserts
  </Link>

</div>


          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3 md:gap-6">

            {/* SEARCH */}

            <button
  onClick={() => {
    const query = window.prompt("Search desserts...");
    if (query !== null) {
      setSearch(query);
    }
  }}
  className="text-brown transition-transform hover:scale-110"
  aria-label="Search"
>
  <Search size={20} />
</button>


            {/* CART */}

<Link
  to="/cart"
  className="relative text-brown transition-transform hover:scale-110"
  aria-label="Shopping cart"
>
  <ShoppingBag size={22} />

  {totalItems > 0 && (
    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brown text-[8px] font-bold text-white">
      {totalItems}
    </span>
  )}
</Link>


            {/* COFFEE */}

            <button
              className="hidden text-brown transition-transform hover:scale-110 sm:block"
              aria-label="Coffee"
            >
              <Coffee size={22} />
            </button>


            {/* SIGN IN */}

            <button className="hidden rounded-full bg-brown px-6 py-2 text-white transition-transform hover:scale-[1.02] active:scale-95 sm:block">
              Sign In
            </button>


            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setMobileOpen((value) => !value)
              }
              className="text-brown md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>

          </div>

        </nav>


        {/* MOBILE NAVIGATION */}

        {mobileOpen && (
          <div className="border-t border-brown/10 bg-white/95 px-5 py-5 backdrop-blur-xl md:hidden">

            <div className="flex flex-col gap-4">

              <a
                href="#cakes"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Hot Coffee
              </a>

              <a
                href="#donuts"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Cold Coffee
              </a>

              <a
                href="#pairing"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Special Drinks
              </a>

              <a
                href="#bakery"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Desserts
              </a>

            </div>

          </div>
        )}

      </header>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="pt-20">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative flex min-h-[720px] items-center overflow-hidden px-5 md:min-h-[819px] md:px-16">

          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-6">


            {/* HERO TEXT */}

            <Reveal className="z-10 space-y-6">

              <span className="inline-block rounded-full bg-peach px-4 py-1 text-xs font-bold uppercase tracking-[.2em] text-brown-dark">
                Premium Selection
              </span>


              <h1 className="font-display text-5xl leading-[1.1] text-brown md:text-6xl">

                Artisan

                <br />

                <span className="italic font-light">
                  Confections
                </span>

              </h1>


              <p className="max-w-md text-lg leading-8 text-muted">

                Experience the ritual of sweetness.
                Every dessert is handcrafted with
                mindful precision, blending Nordic
                simplicity with Japanese artistry.

              </p>


              <button
                onClick={() =>
                  document
                    .querySelector("#cakes")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="flex items-center gap-3 rounded-full bg-brown px-10 py-4 text-white transition-transform hover:scale-[1.02] active:scale-95"
              >

                Explore the Menu

                <ArrowDown size={20} />

              </button>

            </Reveal>


            {/* HERO IMAGE */}

            <Reveal className="relative">

              <div className="organic-1 absolute -right-10 -top-10 h-[500px] w-[500px] bg-[#fff8f0] opacity-60 blur-3xl" />


              <div className="glass-card relative z-10 rotate-3 rounded-[40px] p-4 transition-transform duration-700 hover:rotate-0">

                <div className="h-[520px] overflow-hidden rounded-[32px] md:h-[600px]">

                  <Image
                    src={images.hero}
                    alt="Minimalist Japanese cheesecake"
                    className="h-full w-full object-cover"
                  />

                </div>

              </div>

            </Reveal>

          </div>

        </section>


        {/* =================================================
            SIGNATURE CAKES
        ================================================= */}

        <section
          id="cakes"
          className="mx-auto max-w-[1280px] px-5 py-20 md:px-16 md:py-24"
        >

          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-16 md:flex-row md:items-end">

            <div>

              <h2 className="font-display text-4xl text-brown md:text-5xl">
                Signature Cakes
              </h2>

              <p className="mt-2 text-muted">
                Sophisticated layers of flavor and texture.
              </p>

            </div>


            <div className="hidden h-px flex-grow bg-line/30 md:mx-12 md:block" />


            <span className="text-xs font-bold uppercase tracking-[.2em] text-brown">
              01 / 03
            </span>

          </div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {filteredCakes.map((cake) => (

              <Reveal key={cake.name}>

                <article className="glass-card hover-scale group flex h-full flex-col rounded-3xl p-6">

                  <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl">

                    <Image
                      src={cake.image}
                      alt={cake.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs text-brown backdrop-blur">

                      {cake.calories}

                      {" "}

                      kcal

                    </span>

                  </div>


                  <h3 className="font-display text-2xl text-brown">
                    {cake.name}
                  </h3>


                  <p className="mb-4 mt-2 flex-grow italic leading-7 text-muted">
                    {cake.description}
                  </p>


                  <div className="mt-auto flex items-center justify-between border-t border-brown/5 pt-4">

                    <span className="text-lg font-bold text-brown">
                      Rs. {cake.price.toFixed(2)}
                    </span>


                    <AddButton
                      item={cake}
                      onAdd={addToCart}
                    />

                  </div>

                </article>

              </Reveal>

            ))}

          </div>

        </section>


        {/* =================================================
            DONUTS
        ================================================= */}

        <section
          id="donuts"
          className="bg-cream-2 py-20 md:py-24"
        >

          <div className="mx-auto max-w-[1280px] px-5 md:px-16">

            <div className="mb-12 text-center md:mb-16">

              <h2 className="font-display text-4xl text-brown md:text-5xl">
                Handcrafted Donuts
              </h2>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-muted">

                Brioche-style dough, slow-proofed
                for 24 hours to achieve the perfect
                cloud-like texture.

              </p>

            </div>


            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">


              {/* FEATURED DONUT */}

              <Reveal className="md:col-span-8">

                <article className="glass-card flex h-full flex-col gap-8 overflow-hidden rounded-[40px] p-6 md:flex-row md:p-8">

                  <div className="h-80 w-full overflow-hidden rounded-3xl md:w-1/2">

                    <Image
                      src={donuts[0].image}
                      alt={donuts[0].name}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                  </div>


                  <div className="flex w-full flex-col justify-center space-y-4 md:w-1/2">

                    <span className="text-xs font-bold uppercase tracking-[.2em] text-sage">
                      Staff Favorite
                    </span>


                    <h3 className="font-display text-3xl text-brown">
                      {donuts[0].name}
                    </h3>


                    <p className="leading-7 text-muted">
                      {donuts[0].description}
                    </p>


                    <div className="flex items-center gap-6 pt-4">

                      <div>

                        <span className="block text-xs text-muted/60">
                          Calories
                        </span>

                        <b className="text-brown">
                          {donuts[0].calories} kcal
                        </b>

                      </div>


                      <div className="h-8 w-px bg-line" />


                      <div>

                        <span className="block text-xs text-muted/60">
                          Price
                        </span>

                        <b className="text-brown">
                          Rs. {donuts[0].price.toFixed(2)}
                        </b>

                      </div>

                    </div>


                   <button
  onClick={() => addToCart(donuts[0])}
  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#E8D8CC] py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingCart size={18} />
  Add to Cart
</button>

                  </div>

                </article>

              </Reveal>


              {/* SMALL DONUTS */}

              {donuts.slice(1).map((donut) => (

                <Reveal
                  key={donut.name}
                  className="md:col-span-4"
                >

                  <article className="glass-card group flex h-full flex-col rounded-[40px] p-6">

                    <div className="mb-6 h-48 overflow-hidden rounded-2xl">

                      <Image
                        src={donut.image}
                        alt={donut.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                    </div>


                    <h4 className="font-display text-xl text-brown">
                      {donut.name}
                    </h4>


                    <p className="mb-4 mt-2 text-sm leading-6 text-muted">
                      {donut.description}
                    </p>


                    <div className="mt-auto flex items-center justify-between">

                      <span className="font-bold text-brown">
                        Rs. {donut.price.toFixed(2)}
                      </span>


                      <AddButton
                        item={donut}
                        onAdd={addToCart}
                        compact
                      />

                    </div>

                  </article>

                </Reveal>

              ))}


              {/* BAKER'S DOZEN */}

             {/* BAKER'S DOZEN */}

<Reveal className="md:col-span-8">

  <article className="glass-card flex flex-col gap-8 overflow-hidden rounded-[40px] p-6 md:flex-row md:items-center md:p-8">

    {/* IMAGE */}

    <div className="h-72 w-full overflow-hidden rounded-3xl md:h-64 md:w-1/2">

      <Image
        src={images.bakersDozen}
        alt="The Baker's Dozen - box of 12 artisan donuts"
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />

    </div>


    {/* CONTENT */}

    <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">

      <span className="text-xs font-bold uppercase tracking-[.2em] text-sage">
        Best Value
      </span>

      <h4 className="font-display text-3xl text-brown">
        The Baker's Dozen
      </h4>

      <p className="leading-7 text-muted">
        A customizable box of 12 artisan donuts,
        perfect for sharing with family and friends.
      </p>

      <div className="space-y-2 text-sm text-muted">
        <p>• 12 handcrafted donuts</p>
        <p>• Customizable flavors</p>
        <p>• Save more with a dozen</p>
      </div>

      <button
        onClick={() =>
          addToCart({
            name: "The Baker's Dozen",
            price: 6000,
            image: images.bakersDozen,
          })
        }
        className="mt-2 flex w-fit items-center gap-2 rounded-full bg-[#E8D8CC] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
      >
        <ShoppingCart size={16} />
        Add to Cart · Rs. 6,000
      </button>

    </div>

  </article>

</Reveal>

            </div>

          </div>

        </section>


        {/* =================================================
            SWEET PAIRING
        ================================================= */}

        <section
          id="pairing"
          className="overflow-hidden px-5 py-24 md:px-16 md:py-32"
        >

          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">


            {/* IMAGES */}

            <Reveal className="relative">

              <div className="organic-2 absolute -bottom-10 -left-10 h-[450px] w-[450px] bg-peach opacity-30 blur-2xl" />


              <div className="relative grid grid-cols-2 gap-6">

                <Image
                  src={images.pairing1}
                  alt="Latte and donut pairing"
                  className="h-80 w-full rotate-[-5deg] rounded-3xl object-cover shadow-xl"
                />


                <Image
                  src={images.pairing2}
                  alt="Cinnamon roll and coffee"
                  className="h-80 w-full rotate-[5deg] rounded-3xl object-cover shadow-xl"
                />

              </div>

            </Reveal>


            {/* CONTENT */}

            <Reveal className="space-y-8">

              <span className="text-xs font-bold uppercase tracking-[.2em] text-sage">
                Curated Experiences
              </span>


              <h2 className="font-display text-5xl leading-tight text-brown">
                The Sweet Pairing
              </h2>


              <p className="text-lg leading-8 text-muted">

                Our master baristas and pastry chefs
                have collaborated to design the ultimate
                flavor symphonies. Each pairing is designed
                to elevate the nuances of both the bean
                and the bake.

              </p>


              <div className="space-y-4">

                {[
                  [
                    "The Morning Glow",
                    "Flat White + Almond Croissant",
                    Coffee,
                  ],
                  [
                    "The Dark Ritual",
                    "Pour Over + Belgian Chocolate Donut",
                    Sparkles,
                  ],
                ].map(
                  ([title, subtitle, Icon]) => (

                    <button
                      key={title}
                      onClick={() =>
                        addToCart({
                          name: title,
                          price: 15,
                        })
                      }
                      className="glass-card group flex w-full items-center justify-between rounded-2xl p-6 text-left transition-all hover:border-sage/20"
                    >

                      <span className="flex items-center gap-4">

                        <Icon
                          className="text-sage"
                          size={22}
                        />

                        <span>

                          <b className="block text-brown">
                            {title}
                          </b>

                          <small className="text-muted">
                            {subtitle}
                          </small>

                        </span>

                      </span>


                      <ArrowRight className="transition-transform group-hover:translate-x-2" />

                    </button>

                  )
                )}

              </div>

            </Reveal>

          </div>

        </section>


        {/* =================================================
            BAKERY
        ================================================= */}

        <section
          id="bakery"
          className="mx-auto max-w-[1280px] px-5 py-20 md:px-16 md:py-24"
        >

          <div className="mb-12 flex items-center justify-between md:mb-16">

            <h2 className="font-display text-4xl text-brown md:text-5xl">
              The Bakery
            </h2>


            <button className="flex items-center gap-2 font-bold text-brown transition-all hover:gap-4">

              View Daily Specials

              <ArrowRight size={18} />

            </button>

          </div>


          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">

            {bakery.map((item) => (

              <Reveal key={item.name}>

              <article
  className="group"
>

                  <div className="relative mb-6 h-72 overflow-hidden rounded-sm">

                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-brown/0 transition-colors group-hover:bg-brown/10" />

                  </div>


                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h4 className="font-display text-xl text-brown">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-sm text-muted">
                        {item.description}
                      </p>

                    </div>


                    <span className="font-bold text-brown">
                      Rs. {item.price.toFixed(2)}
                    </span>

                    <button
  onClick={() => addToCart(item)}
  className="flex items-center gap-2 rounded-full bg-[#E8D8CC] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingCart size={15} />
  Add to Cart
</button>

                  </div>

                </article>

              </Reveal>

            ))}

          </div>

        </section>


        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="px-5 py-20 md:px-16 md:py-24">

          <Reveal className="mx-auto max-w-[1280px]">

            <div className="glass-card relative overflow-hidden rounded-[60px] p-10 text-center md:p-24">

              <div className="organic-1 absolute -right-20 -top-20 h-96 w-96 bg-[#e7ffee] opacity-50 blur-3xl" />


              <div className="relative z-10">

                <h2 className="mb-6 font-display text-4xl text-brown md:text-5xl">
                  Join the Ritual
                </h2>


                <p className="mx-auto mb-10 max-w-xl text-lg leading-8 text-muted">

                  Subscribe to receive exclusive
                  invitations to our seasonal tasting
                  events and early access to new
                  confection launches.

                </p>


                {subscribed ? (

                  <div className="mx-auto max-w-lg rounded-full bg-sage/10 px-6 py-4 font-bold text-sage">

                    You're on the list.
                    Welcome to the ritual.

                  </div>

                ) : (

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSubscribed(true);
                    }}
                    className="mx-auto flex max-w-lg flex-col gap-4 md:flex-row"
                  >

                    <input
                      required
                      type="email"
                      placeholder="Your email address"
                      className="flex-grow border-0 border-b-2 border-brown/20 bg-transparent px-0 py-4 text-brown outline-none placeholder:text-muted/40 focus:border-brown focus:ring-0"
                    />


                    <button
                      type="submit"
                      className="rounded-full bg-brown px-10 py-4 font-bold text-white transition-transform hover:scale-105"
                    >
                      Subscribe
                    </button>

                  </form>

                )}

              </div>

            </div>

          </Reveal>

        </section>

      </main>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="mt-20 bg-cream-2">

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-16 md:grid-cols-4 md:gap-6 md:px-16">


          {/* BRAND */}

          <div>

            <div className="mb-4 font-display text-3xl text-brown">
              Brew Haven
            </div>

            <p className="max-w-xs text-sm leading-7 text-muted">

              Embracing the ritual of the perfect
              pour and the art of slow-living
              through mindful baking.

            </p>

          </div>


          {/* DISCOVER */}

          <FooterColumn
            title="Discover"
            links={[
              "Our Story",
              "Sustainability",
              "Locations",
            ]}
          />


          {/* SUPPORT */}

          <FooterColumn
            title="Support"
            links={[
              "Contact Us",
              "Privacy Policy",
              "FAQ",
            ]}
          />


          {/* CONNECT */}

          <div>

            <h6 className="mb-6 text-xs font-bold uppercase tracking-[.2em] text-brown">
              Connect
            </h6>


            <div className="flex gap-4">

              <a
                href="#"
                aria-label="Share"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown transition-all hover:bg-brown hover:text-white"
              >
                <Share2 size={18} />
              </a>


              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown transition-all hover:bg-brown hover:text-white"
              >
                <Camera size={18} />
              </a>

            </div>


            <div className="mt-8 text-xs text-muted">
              © 2026 Brew Haven.
              Embracing the ritual of the perfect pour.
            </div>

          </div>

        </div>

      </footer>


      {/* ==================================================
          CART NOTIFICATION
      ================================================== */}

{totalItems > 0 && (
  <Link
    to="/cart"
    className="fixed bottom-5 right-5 z-50 rounded-2xl bg-brown px-6 py-4 text-white shadow-2xl transition hover:scale-105"
  >
    <div className="flex items-center gap-4">

      <ShoppingBag size={22} />

      <div>

        <p className="font-bold">
          {totalItems} item
          {totalItems !== 1 ? "s" : ""}
        </p>

        <p className="text-sm text-white/80">
          Total: Rs. {subtotal.toFixed(2)}
        </p>

      </div>

    </div>
   </Link>
)}

</div>
);
}
 
/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({
  title,
  links,
}) {
  return (
    <div>

      <h6 className="mb-6 text-xs font-bold uppercase tracking-[.2em] text-brown">
        {title}
      </h6>


      <ul className="space-y-4">

        {links.map((link) => (

          <li key={link}>

           <a
  href={link === "Our Story" ? "/our-story" : "#"}
  className="text-muted transition-colors hover:text-brown"
>
  {link}
</a>

          </li>

        ))}

      </ul>

    </div>
  );
}


export default Desserts;