import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import {
  Flower2,
  Leaf,
  Mail,
  Menu,
  Palette,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Sun,
  X,
  Utensils,
  Flame,
  Globe2,
} from "lucide-react";


/* =========================================================
   SPECIAL DRINK DATA
========================================================= */

const drinks = [
  {
    id: 1,
    name: "Classic Mojito",
    price: 850,

    description:
      "A zesty botanical blend of muddled garden mint, fresh lime, and premium sparkling spring water.",

    tag: "POPULAR",

    flavor: "MINTY & COOL",

    icon: "leaf",

    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMAhHwSUyMHNNhJVGcAeYc7rMqsM1EQZ8w_71nYQvU5HdzRNZtpGrDO5GTmX6hi2XAkRsbhOmAS-jtqOz6jzi7_BADS3O1PETOd6ISZM-1fWEhnln1F742OvaNkVekf5iwjRpChqUY6hNnVq3n5kUG8JFCvNUcvk0WCaTVcJEvRFb27M7QCzvP1LK-bS27ujYjuz5YZWVAyiEGGbhGOCjKsa46LeAxolzXspCLEckfknciLX8hYwA0",
  },

  {
    id: 2,
    name: "Strawberry Hibiscus",
    price: 950,

    description:
      "Egyptian hibiscus infusion layered with hand-macerated strawberries and a touch of agave.",

    flavor: "FLORAL & TART",

    icon: "palette",

    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZvQtzRu4COMRtgb2KMWvwGp0gd1BmbqUImqsVYdhrWj9GQ2aCVnOQnS_T2VQi9XZ96ryXQpUwHaJ1oeBZIMnBwWf4StXK6SF5Y8vY2YRaAhzbfQciE_wQ6BfiWlKJJOwvN2uiV-u8TLmayjCTmxan6Fe2wOZzJWFDyNc950WXxMRkafz7eyT0twOMej6vyMtqBgbPuMZL-fISuPO2--C4_3H8NvhF4QuOuW5mzDM0x8l0-b7cMxTT",
  },

  {
    id: 3,
    name: "Brown Sugar Boba",
    price: 1200,

    description:
      "Slow-cooked tapioca pearls steeped in Okinawan black sugar, served with velvety organic A2 milk. A comforting, caramel-forward ritual.",

    tag: "SIGNATURE",
    
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbMrg1VJ96khixFNkMgC4Pu0rdmGlCOXCKl6IAM8OBmdQt9wArOn9_xJ-IQv1hxkRdFUzRqs507W_82yS4OW6ArP54Gicru2OzrX4kGJkayuh4MCRNuJ7kQExQsRoWfkRehK7-kobxCctIBX7I6EQKpjM1j7hHzFgRj1RZO0JEhSCt9miLg0-Y09lzzskNCVCLEjOV-MHgUhOarw61mZ3yQ-P61WfCILR15r7ukN0DyvivZKEDqYnw",
  },

  {
    id: 4,
    name: "Matcha Strawberry",
    price: 1350,

    description:
      "Ceremonial grade Uji matcha whisked over fresh strawberry purée and chilled milk.",

    tag: "NEW",

    flavor: "UMAMI & BERRY",

    icon: "flower",

    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDh6VbPTNs0MgsNyT9T86jvsAp_k3H_AA-Do7p5M4sqiSO0wiU8YD_LYEM22Td_zNadGHRrbie2t1rjQqUw1u6q20ZjeWcpdWGQGysJdjToUW-VlG-3uanWCOg6U88lHmvY-a9pCIgkXhVE9RzNB4BrJ09ZowrGfyJbVLScU0SmCZPXw1Z7tmuIDciraF63U6XASrmvpXOduh3qJXVIpyMKqz4622wdqmSIJlNrpoPLRiJIxAEtyLsj",
  },

  {
    id: 5,
    name: "Butterfly Pea Tea",
    price: 800,

    description:
      "A magical color-changing infusion of sun-dried butterfly pea petals with citrus highlights.",

    flavor: "CITRUSY & MYSTIC",

    icon: "sparkles",

    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAS29suuxAWWw77Dq6sEH6KINTiOcehElFiiPSRbXyQRb7kTp7PLzcjTVT9CnE6sko_62MF4Xm_0W1t35SAymOoBgwayXFYshYl-Y_n1SvHr11dkK6pTn_vqLGbYSWh6L72Vi6Z4eU3_M9nsOKetNCWheLiQSaWrhV4ojTH0Byg8RipNqWZy204L9uXxwEv8t38V7qir103NpPBsAmDVtp_LRfN-4bQD9CRvrXce9QivEN3SL_DFmCq",
  },

  {
    id: 6,
    name: "Passion Fruit Tea",
    price: 750,

    description:
      "Cold-brewed black tea infused with tropical passion fruit nectar and wild honey.",

    flavor: "TROPICAL & BOLD",

    icon: "sun",

    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoelzzAWYE3UBL4pylFZ4geCguJmu1fGbX9QDVl5lW-k8_zWKEr_DWfEw2JYBq1w6Yyphk5Z_MjTyJRioJN-z2GXP3ELZlvoHoxYE81_6GOFm_illjm2bkm6qn6A1a_mcbiQ9fzafxf591nZlA85lIZP1uuPRVBKwJA-IfARrCnC9QIUPupw9Tl3XJStsMC_gwoVAYEaCdbZ6TKLXPDkz_2LA3nR6_7i0sGg6Pg1TO8FZxAO6ye3QM",
  },

  {
    id: 7,
    name: "Taro Milk Tea",
    price: 1100,

    description:
      "House-made taro root paste blended with creamy milk for a nutty, vanilla-like finish.",

    flavor: "NUTTY & CREAMY",

    icon: "flower",

    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDINxkz2XB75IxsPe0n53gc7mzmz0Fk1yh4sd-rQTTfMh2Jo1aOqUWs-GEIJw39LLanY8W3l3W_6AN64mY8r4UqcCvapVB82zvSL9dtyFwRgpjtwqWWANHVbcpsAAeCsuOcm7MAOEyYorN-dfI9htDPEFiBa__cxX5KRt6YpX3tBB3peY_2r0bB8m1U1fi6GwFy60tHI0GHhe6q5XVafRTY5rBm8RqCRlWBm9x2BEehv00XiuI5S0VK",
  },

  {
    id: 8,
    name: "Lychee Rose Green Tea",
    price: 1500,

    description:
      "Premium Jasmine green tea cold-infused for 12 hours with Damascus rose water and fresh whole lychees.",

    quote:
      "A delicate dance of floral notes and tropical sweetness, perfect for quiet afternoon contemplation.",

    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZdFeZHa1cEuLU6ec1a-jdq77TpyZH5uUHSOkZfZUDa5TDmuj7tCfqd8lrRqzDl2zNaTaoI33mkNLtZgA6Vx71130p47Ponx7sUdogtHgH_Ft388f3GVJJTrjQYMo9C6ogmWz0Ukp-jRC3Og6NQQ6JywcqFV26wir7fnyBQaS1mVCAfnmQFn7rXT_szZsdgURY8Bwmu2sM6I6OUKe-ijh7pmLbCgpA9OalKFtjzv8Ndc9AmEczK62C",
  },
];


/* =========================================================
   ICONS
========================================================= */

const iconMap = {
  leaf: Leaf,
  palette: Palette,
  flower: Flower2,
  sparkles: Sparkles,
  sun: Sun,
};


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}


function Reveal({
  children,
  className = "",
}) {
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
   PRICE
========================================================= */

function Price({ value }) {
  return (
    <>
      Rs.{" "}
      {value.toLocaleString("en-PK")}
    </>
  );
}


/* =========================================================
   DRINK CARD
========================================================= */

function DrinkCard({
  drink,
  onAdd,
}) {
  const Icon =
    iconMap[drink.icon] || Leaf;

  return (
    <div className="group">

      <div className="glass-card hover-zoom flex h-full flex-col overflow-hidden rounded-xl">

        {/* IMAGE */}

        <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">

          <img
            src={drink.image}
            alt={drink.name}
            className="h-full w-full object-cover"
          />

          {drink.tag && (
            <div
              className={`absolute ${
                drink.tag === "NEW"
                  ? "right-4"
                  : "left-4"
              } top-4`}
            >

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium tracking-widest ${
                  drink.tag === "NEW"
                    ? "bg-secondary-container text-secondary"
                    : drink.tag === "POPULAR"
                    ? "bg-primary-container text-primary"
                    : "bg-tertiary-container text-tertiary"
                }`}
              >
                {drink.tag}
              </span>

            </div>
          )}

        </div>


        {/* CONTENT */}

        <div className="flex flex-grow flex-col p-6">

          <div className="mb-2 flex items-start justify-between gap-3">

            <h3 className="font-display text-2xl text-primary">
              {drink.name}
            </h3>

            <span className="shrink-0 rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
              <Price value={drink.price} />
            </span>

          </div>


          <p className="mb-6 flex-grow text-base leading-7 text-on-surface-variant">
            {drink.description}
          </p>


          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-2 text-tertiary">

              <Icon size={18} />

              <span className="text-xs font-medium tracking-widest">
                {drink.flavor}
              </span>

            </div>

<button
  onClick={() => onAdd(drink)}
  className="flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingBag size={16} />
  Add to Cart
</button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   MAIN PAGE
========================================================= */

export default function SpecialDrinks() {

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [newsletter, setNewsletter] =
    useState("");

  const [subscribed, setSubscribed] =
    useState(false);

  const {
  addToCart,
  totalItems,
  subtotal,
} = useCart();


  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredDrinks =
    useMemo(() => {

      const query =
        search.trim().toLowerCase();

      if (!query) {
        return drinks;
      }

      return drinks.filter((drink) =>
        `${drink.name} ${drink.description} ${
          drink.flavor || ""
        }`
          .toLowerCase()
          .includes(query)
      );

    }, [search]);


  /* =======================================================
     ADD TO CART
  ======================================================= */

 


  /* =======================================================
     CART TOTAL
  ======================================================= */


  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-surface">


      {/* ===================================================
          NAVBAR
      =================================================== */}

      <nav className="fixed top-0 z-50 h-20 w-full border-b border-black/5 bg-white/60 backdrop-blur-3xl backdrop-saturate-150">

        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-16">


          {/* LOGO */}

          <a
            href="#top"
            className="font-display text-2xl tracking-tight text-primary"
          >
            Brew Haven
          </a>


          {/* DESKTOP NAV */}

          <div className="hidden items-center space-x-8 md:flex">

          <Link
  to="/coffee/hot"
  className="text-sm text-on-surface-variant transition hover:text-primary"
>
  Hot Coffee
</Link>

<Link
  to="/coffee/cold"
  className="text-sm text-on-surface-variant transition hover:text-primary"
>
  Cold Coffee
</Link>

<Link
  to="/special-drinks"
  className="border-b-2 border-primary pb-1 text-sm text-primary"
>
  Special Drinks
</Link>

<Link
  to="/desserts"
  className="text-sm text-on-surface-variant transition hover:text-primary"
>
  Desserts
</Link>

          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-4 md:gap-6">


            {/* SEARCH */}

            {searchOpen && (
              <input
                autoFocus
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search drinks..."
                className="hidden w-40 border-b border-primary bg-transparent py-2 text-sm outline-none sm:block"
              />
            )}


            <button
              onClick={() =>
                setSearchOpen(
                  (value) => !value
                )
              }
              className="text-primary transition hover:scale-110"
              aria-label="Search"
            >
              <Search size={21} />
            </button>


            {/* CART */}

<Link
  to="/cart"
  className="relative flex items-center gap-2 text-primary transition hover:scale-110"
>
  <ShoppingBag size={21} />

  <span className="text-xs uppercase tracking-widest">
    Cart
  </span>

  {totalItems > 0 && (
    <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-[#5C4033]">
      {totalItems}
    </span>
  )}
</Link>


            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setMobileOpen(
                  (value) => !value
                )
              }
              className="text-primary md:hidden"
              aria-label="Menu"
            >

              {mobileOpen ? (
                <X />
              ) : (
                <Menu />
              )}

            </button>

          </div>

        </div>


        {/* MOBILE NAV */}

        {mobileOpen && (
          <div className="border-t border-black/5 bg-white/95 px-5 py-5 backdrop-blur-xl md:hidden">

            <div className="flex flex-col gap-4">

              <Link to="/coffee/hot">
  Hot Coffee
</Link>

<Link to="/coffee/cold">
  Cold Coffee
</Link>

<Link to="/special-drinks">
  Special Drinks
</Link>

<Link to="/desserts">
  Desserts
</Link>

            </div>

          </div>
        )}

      </nav>


      {/* ===================================================
          MAIN
      =================================================== */}

      <main
        id="top"
        className="pb-24 pt-32"
      >


        {/* =================================================
            HERO
        ================================================= */}

        <header
          id="special-drinks"
          className="mx-auto mb-20 max-w-[1280px] px-5 text-center md:px-16 md:text-left"
        >

          <div className="mb-6 inline-block rounded-full bg-secondary-container px-4 py-1 text-xs font-medium uppercase tracking-widest text-secondary">
            The Non-Coffee Anthology
          </div>


          <h1 className="mb-6 max-w-3xl font-display text-5xl leading-tight tracking-tight text-primary md:text-7xl">

            Specialty sips for intentional rituals.

          </h1>


          <p className="max-w-2xl text-lg leading-8 text-on-surface-variant">

            Beyond the bean, explore our curated
            selection of botanicals, florals, and
            vibrant infusions designed to refresh
            the spirit and soothe the senses.

          </p>

        </header>


        {/* =================================================
            DRINK GRID
        ================================================= */}

        <section className="mx-auto max-w-[1280px] px-5 md:px-16">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">


            {/* CLASSIC MOJITO */}

            <Reveal className="lg:col-span-1">

              <DrinkCard
                drink={drinks[0]}
                onAdd={addToCart}
              />

            </Reveal>


            {/* STRAWBERRY */}

            <Reveal className="mt-8 lg:col-span-1 md:mt-0">

              <DrinkCard
                drink={drinks[1]}
                onAdd={addToCart}
              />

            </Reveal>


            {/* BROWN SUGAR BOBA */}

            <Reveal className="mt-8 lg:col-span-2 lg:mt-0">

              <div className="glass-card hover-zoom flex h-full flex-col overflow-hidden rounded-xl md:flex-row">

                <div className="relative aspect-square w-full overflow-hidden bg-surface-container md:aspect-auto md:w-1/2">

                  <img
                    src={drinks[2].image}
                    alt={drinks[2].name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-4 top-4">

                    <span className="rounded-full bg-tertiary-container px-3 py-1 text-xs font-medium tracking-widest text-tertiary">
                      SIGNATURE
                    </span>

                  </div>

                </div>


                <div className="flex w-full flex-col justify-center p-8 md:w-1/2">

                  <div className="mb-4 flex items-start justify-between gap-3">

                    <h3 className="font-display text-3xl text-primary">
                      Brown Sugar Boba
                    </h3>

                    <span className="shrink-0 rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                      <Price
                        value={1200}
                      />
                    </span>

                  </div>


                  <p className="mb-8 text-lg leading-8 text-on-surface-variant">

                    Slow-cooked tapioca pearls steeped
                    in Okinawan black sugar, served with
                    velvety organic A2 milk. A comforting,
                    caramel-forward ritual.

                  </p>


                  <div className="mb-8 flex items-center gap-4 text-tertiary">

                    <span className="flex items-center gap-1 text-xs uppercase tracking-widest">

                      <Utensils size={20} />

                      Velvety

                    </span>


                    <span className="flex items-center gap-1 text-xs uppercase tracking-widest">

                      <Flame size={20} />

                      Caramel

                    </span>

                  </div>

<button
  onClick={() => addToCart(drinks[2])}
  className="flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingBag size={16} />
  Add to Cart
</button>

                </div>

              </div>

            </Reveal>


            {/* DRINKS 4 - 7 */}

            {drinks
              .slice(3, 7)
              .map((drink) => (

                <Reveal
                  key={drink.id}
                  className="mt-8"
                >

                  <DrinkCard
                    drink={drink}
                    onAdd={addToCart}
                  />

                </Reveal>

              ))}


            {/* LYCHEE ROSE */}

            <Reveal className="mt-8 lg:col-span-4">

              <div className="glass-card hover-zoom flex h-full flex-col overflow-hidden rounded-xl lg:flex-row">


                <div className="relative aspect-video w-full overflow-hidden bg-surface-container lg:w-2/3">

                  <img
                    src={drinks[7].image}
                    alt={drinks[7].name}
                    className="h-full w-full object-cover"
                  />

                </div>


                <div className="flex w-full flex-col justify-center p-8 lg:w-1/3 lg:p-10">

                  <div className="mb-4 flex items-start justify-between gap-3">

                    <h3 className="font-display text-3xl text-primary">
                      Lychee Rose Green Tea
                    </h3>

                    <span className="shrink-0 rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                      <Price value={1500} />
                    </span>

                  </div>


                  <p className="mb-6 italic leading-7 text-on-surface-variant">

                    “A delicate dance of floral notes
                    and tropical sweetness, perfect for
                    quiet afternoon contemplation.”

                  </p>


                  <p className="mb-8 leading-7 text-on-surface-variant">

                    Premium Jasmine green tea cold-infused
                    for 12 hours with Damascus rose water
                    and fresh whole lychees.

                  </p>


                  <div className="mb-8 flex gap-6">

                    <div className="text-center">

                      <div className="font-display text-3xl text-primary">
                        0%
                      </div>

                      <div className="text-xs uppercase tracking-widest text-on-surface-variant">
                        Caffeine
                      </div>

                    </div>


                    <div className="h-10 w-px bg-outline-variant" />


                    <div className="text-center">

                      <div className="font-display text-3xl text-primary">
                        100%
                      </div>

                      <div className="text-xs uppercase tracking-widest text-on-surface-variant">
                        Botanical
                      </div>

                    </div>

                  </div>


<button
  onClick={() => addToCart(drinks[7])}
  className="flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingBag size={16} />
  Add to Cart
</button>

                </div>

              </div>

            </Reveal>

          </div>

        </section>


        {/* =================================================
            SEARCH RESULT
        ================================================= */}

        {search.trim() && (

          <section className="mx-auto mt-12 max-w-[1280px] px-5 md:px-16">

            <div className="rounded-2xl bg-secondary/5 p-5 text-sm text-secondary">

              Search:

              {" "}

              <strong>
                {search}
              </strong>

              {" — "}

              {filteredDrinks.length}

              {" result"}

              {filteredDrinks.length !== 1
                ? "s"
                : ""}

            </div>

          </section>

        )}


        {/* =================================================
            NEWSLETTER
        ================================================= */}

        <section className="mx-auto mt-20 max-w-[1280px] px-5 md:px-16">

          <Reveal>

            <div className="glass-card rounded-[40px] p-8 md:p-12">

              <div className="grid gap-10 md:grid-cols-2 md:items-center">

                <div>

                  <span className="text-xs font-bold uppercase tracking-widest text-tertiary">
                    Stay Connected
                  </span>


                  <h2 className="mt-3 font-display text-4xl text-primary">
                    Join the monthly infusion.
                  </h2>


                  <p className="mt-4 max-w-lg leading-7 text-on-surface-variant">

                    Receive seasonal drink launches,
                    tasting invitations, and quiet rituals
                    from Brew Haven.

                  </p>

                </div>


                <form
                  onSubmit={(event) => {

                    event.preventDefault();

                    if (newsletter.trim()) {
                      setSubscribed(true);
                    }

                  }}
                  className="flex flex-col gap-3 sm:flex-row"
                >

                  <input
                    value={newsletter}
                    onChange={(event) =>
                      setNewsletter(
                        event.target.value
                      )
                    }
                    type="email"
                    required
                    placeholder="Email Address"
                    className="min-w-0 flex-1 border-b border-primary bg-transparent px-0 py-3 outline-none placeholder:text-on-surface-variant/50"
                  />


                  <button
                    type="submit"
                    className="btn-primary-japandi rounded-lg px-6 py-3 text-xs font-bold uppercase tracking-widest"
                  >

                    {subscribed
                      ? "Subscribed"
                      : "Subscribe"}

                  </button>

                </form>

              </div>

            </div>

          </Reveal>

        </section>

      </main>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="border-t border-black/5 bg-surface-container-low py-16">

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 text-center md:grid-cols-3 md:px-16 md:text-left">


          {/* BRAND */}

          <div>

            <span className="font-display text-3xl text-primary">
              Brew Haven
            </span>

            <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-secondary md:mx-0">

              © 2026 Brew Haven.
              Crafted for the intentional ritual.
              High-quality botanicals sourced with respect.

            </p>

          </div>


          {/* LINKS */}

          <div className="flex flex-col gap-4">

            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
              The Collective
            </h4>

            <a
              href="/our-story"
              className="text-sm text-on-surface-variant hover:text-secondary"
            >
              Our Story
            </a>

            <a
              href="#"
              className="text-sm text-on-surface-variant hover:text-secondary"
            >
              Sourcing
            </a>

            <a
              href="#"
              className="text-sm text-on-surface-variant hover:text-secondary"
            >
              Locations
            </a>

            <a
              href="#"
              className="text-sm text-on-surface-variant hover:text-secondary"
            >
              Contact
            </a>

          </div>


          {/* CONNECT */}

          <div>

            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
              Connect
            </h4>


            <div className="mt-5 flex justify-center gap-5 md:justify-start">

              <a href="#" aria-label="Website">
                <Globe2 size={20} />
              </a>

              <a href="#" aria-label="Email">
                <Mail size={20} />
              </a>

              <a href="#" aria-label="Share">
                <Share2 size={20} />
              </a>

            </div>

          </div>

        </div>

      </footer>


      {/* ===================================================
          CART FLOATING NOTIFICATION
      =================================================== */}

     {totalItems > 0 && (
  <Link
    to="/cart"
    className="fixed bottom-5 right-5 z-50 rounded-2xl bg-secondary px-6 py-4 text-white shadow-2xl transition hover:scale-105"
  >
    <div className="flex items-center gap-4">

      <ShoppingBag size={22} />

      <div>

        <p className="font-bold">
          {totalItems} item
          {totalItems !== 1 ? "s" : ""}
        </p>

        <p className="text-sm text-white/80">
          Total: <Price value={subtotal} />
        </p>

      </div>

    </div>
  </Link>
)}

</div>
  );
}