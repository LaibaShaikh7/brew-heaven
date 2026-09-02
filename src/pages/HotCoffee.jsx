import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowRight,
  Coffee,
  Globe2,
  Mail,
  Menu,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Search,
} from "lucide-react";

const coffeeCollection = [
  {
    name: "Classic Americano",
    price: 450,
    description:
      "Rich espresso stretched with filtered hot water, revealing complex dark chocolate notes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw7PFqogNvCw9Mfizw7w-1vAmr3604vXLV6TXEwbyjcB6b6LUXn1Df73K5-McY6byUUXddag4wXJ1NodYievpd7dMcza-EwTzL7-GmlrlDEBRt8PodBM8fI939OIEZpGGtq8i05BOqcLdPQwjvfAtEYoKohLzHswniyWByx5hF9Vw4EgqtdFi0xROVYo0pSAH1-JLvtX_7FsETlQddVHfwMOHukRgSi6ZILq2--PJPb54Ljv4Tg_xQ",
  },
  {
    name: "Spanish Latte",
    price: 640,
    description:
      "A harmonious blend of espresso, textured milk, and subtle sweet condensed milk.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAldvxWj9k1MbB4LpJrIhkl1MOZGpECZs2WyKRZIXKjgp-a9X5qm9O57VUoM17HJzWZyLaA416J7E5oS9F2x09P_fT37XrlJA-ozIAIhgINxEoQuS2u8JQUpPlCoOV0ky_kO0KYKDgz16NgI2tvSVzIkNrbr9b4pwu0REKRF0aX9fmwm_M3Va69gpE6fFKsPBKnJVPNCTgsedbEvVnnQzLjCPl8FMdtE4A98E_Idc0ve15vSCWxhFD",
  },
  {
    name: "Flat White",
    price: 580,
    description:
      "Double ristretto topped with velvety micro-foam. A strong, silky ritual.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7cflnpUOQbBTXZvl2M51X_-dGOipnNJ0PUAUbjJ1qnboQtOM91ZOGKzojB4WHD5WlHbPOdJdJtr2wzzdysmoddlzNF44PwOW1vl-7ENxV5x5D0oLqTP3kboRCUBbUr2b0ksVrFcy3Gi_kvouMD_sOaQfDS3T7jWjewx2TK2cOSWXQRxyW7VMPSSDd5JwMwz0ytSsycFQwUzwe6YrmMrS_DmXO0y4VXCRH400sLSsuDh9ayoQ5ndL",
  },
  {
    name: "Mocha",
    price: 720,
    description:
      "Artisanal dark chocolate melted into espresso and enveloped in steamed milk.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBROaVAdCgcYn3wzc9JVHl56p6Rc-zvmP1btFpW1em6b8t9IIk6h_FgbdKTnskBzti-RTao1_uBSHtV9K-BoAm_G-PdKrerKL4e6s7AqAHzD0Qbqm23einOTHMmvHv6PrSqPdslT03dmpbkOkftdTZPA219_U2JJ5mDpfa_MW6ekI4cGBmTDPI2XwbTUMfuzN6FlYsORmlJb13cTOSvrwkMyUrOhjHkTSavyeu1H3shECm7JwzdXQY1",
  },
];

const teas = [
  {
    name: "Saffron Infused Tea",
    price: 750,
    description:
      "A luminous, golden infusion of premium saffron threads, cardamom, and subtle floral notes. A truly majestic steep.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTzUwILzsg9TkSyEPsEwj0EFUF4uBgGisr0K6nGiHTRJYB2mJnuzNsPaOddoCLpop_-iRWQ7_xZygjWoGcd-NY_8wd-GOevBhbtpSfvetpp4s6km_3ct11OccnzSJlVrMgbWGR-BaJsukFDzSTYN5DSQbT8eZOOW62zgUUHh8nApgTzTZOWJ8EZhxJkC509YPUqHaU33KDcIe7nm_UiQU0xoR9ztMcieEH5B9ldW_MbESYhKzuSPTP",
  },
  {
    name: "Classic Karak Chai",
    price: 350,
    description:
      "Strong black tea simmered slowly with evaporated milk and crushed cardamom pods.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPcUP5GK9iJTtEWecFXLfzwcedn4PIGnz-BFU8QqAx3AKCkH92DVOUhIRQU-UjUXKuS_pCEcIpGJ9Twm3txWcn5Hveh1fSvynAWpI41JpMlKy6gUbOl7wL4kOSY_WjG1zPwf5ag9cl6rqm0ifOZUnRPP56xHBlBqkRPHtvbAqIGaOhZEz_DtRiuXyszZh_H0C_2DG_E_-hXJ5XxKyyPOmSWOMWhpY1n6vX7JYDxrm0J52w1s9e4Wxq",
  },
  {
    name: "Earl Grey",
    price: 550,
    description:
      "Robust black tea elegantly perfumed with vibrant Italian bergamot oil.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2C49DRVAXdYWKk618G1jgohSaOFxdZwlJvKWTeptMgn5TkID83y4ED_5RBRVFtVuDB_c5U8kAo0n6xhCTVzraQLjFKdddc-HtcRO_3rZ5OGocbmuuDHem8jytY05pRbwUhAPzDD8Sh8SlUfPNP_SwGUMChy8JFS8ihWheV9lG_tHiG2yR02XyMcIbRqnOiPKryjKNSnxBQmCzUDv9P6p7l3bbflgcAvDdQB9liUciuoDeDURYvbxm",
  },
];

const greenTeas = [
  {
    name: "Uji Matcha",
    price: 850,
    description:
      "Ceremonial grade, whisked to a vibrant emerald froth.",
      image:"/images/uji_matcha.jpg",
  },
  {
    name: "Genmaicha",
    price: 780,
    description:
      "Green tea blended with roasted brown rice for a nutty warmth.",
      image:"/images/genmaicha.jpg",
  },
  {
    name: "Jasmine Pearl",
    price: 950,
    description:
      "Hand-rolled tea pearls unfurling with delicate jasmine blossoms.",
      image:"/images/jasmine_pearl.jpg",
  },
];

function Price({ value }) {
  return <>Rs. {value.toLocaleString("en-PK")}</>;
}

function CoffeeCard({ item, onAdd }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 card-border hover-scale japandi-ease">

      <div className="relative mb-6 aspect-square overflow-hidden rounded-xl bg-surface-container-low">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-headline-md text-lg text-on-surface">
          {item.name}
        </h3>

        <span className="shrink-0 font-label-sm text-secondary">
          <Price value={item.price} />
        </span>
      </div>

      <p className="text-sm leading-relaxed text-on-surface-variant">
        {item.description}
      </p>

<button
  onClick={() => onAdd(item)}
  className="mt-5 flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingCart size={16} />
  Add to Cart
</button>
    </article>
  );
}

export default function HotCoffee() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const heroImageRef = useRef(null);

const handleHeroMouseMove = (e) => {
  const container = e.currentTarget;

  const rect = container.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  const moveX = x - 0.5;
  const moveY = y - 0.5;

  const background = container.querySelector(".coffee-background");
  const cup = container.querySelector(".coffee-cup");

  if (background) {
    background.style.transform = `
      translate(${moveX * 8}px, ${moveY * 8}px)
    `;
  }

  if (cup) {
    cup.style.transform = `
      translate(${moveX * 35}px, ${moveY * 35}px)
      translateZ(100px)
      scale(1.04)
    `;
  }
};
const handleHeroMouseLeave = () => {
  const element = heroImageRef.current;

  if (!element) return;

  element.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
  `;
};

  const {
    addToCart,
    totalItems,
    subtotal,
  } = useCart();

  return (
    <div className="min-h-screen overflow-x-hidden bg-primary-container text-on-surface">

      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 z-50 w-full animate-slide-down border-b border-on-surface/5 bg-white/60 backdrop-blur-3xl">

        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-16">

          <a
            href="/"
            className="font-headline-md text-2xl tracking-tight text-primary"
          >
            Brew Haven
          </a>

          <div className="hidden items-center gap-8 md:flex">

            <a
              href="/coffee/hot"
              className="border-b-2 border-primary pb-1 text-xs uppercase tracking-widest text-primary"
            >
              Hot Coffee
            </a>

            <a
              href="/coffee/cold"
              className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary"
            >
              Cold Coffee
            </a>

            <a
              href="/special-drinks"
              className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary"
            >
              Special Drinks
            </a>

            <a
              href="/desserts"
              className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary"
            >
              Desserts
            </a>

          </div>

          <div className="flex items-center gap-4">

            <button
              aria-label="Search"
              className="text-primary transition hover:scale-105"
            >
              <Search size={21} />
            </button>

<Link
  to="/cart"
  className="relative flex items-center gap-2 text-primary transition hover:scale-105"
>
  <ShoppingBag size={21} />

  <span className="text-xs uppercase tracking-widest">
    Cart
  </span>

  {totalItems > 0 && (
    <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] text-[#5C4033]">
      {totalItems}
    </span>
  )}
</Link>

            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="text-primary md:hidden"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

          </div>

        </div>

        {mobileOpen && (
          <div className="border-t border-on-surface/5 bg-white/95 p-5 md:hidden">

            <div className="flex flex-col gap-5">

              <a href="/coffee/hot">
                Hot Coffee
              </a>

              <a href="/coffee/cold">
                Cold Coffee
              </a>

              <a href="/special-drinks">
                Special Drinks
              </a>

              <a href="/desserts">
                Desserts
              </a>

            </div>

          </div>
        )}

      </nav>


      {/* ================= HERO ================= */}

      <header className="relative flex min-h-[819px] items-center overflow-hidden px-5 pb-24 pt-32 md:px-16 md:pb-32 md:pt-48">

        <div
          className="absolute right-0 top-0 -z-10 h-full w-2/3 bg-cover bg-center opacity-20 mix-blend-multiply"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtQhk1DYKfz5LZPa_zF11Y2ouYtIGHnsyOlCou0Xe85BeQ9td8s8-6cLWgrLI7yj5HMtVQpeKtcTX4QV6ZPlX-PWcrU4kA6w5_-FkQDOs_Ssnn9XhRSRQupolZUR1x2Nk7z1RQgzsFXIcvHnM6wUX4_wuczg2rH5jc-v-JOpKbtWm9OwQQsN9YFaFGFa9qDAPWMxs64Vzxu0srgDPjtAZliHjDZh4fLIjcrZoFBjPtkENAXKVMEES2')",
          }}
        />

        <div className="absolute bottom-0 left-10 -z-10 h-96 w-96 rounded-full bg-secondary-fixed opacity-30 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 md:grid-cols-12">

         <div className="animate-fade-up flex flex-col justify-center space-y-8 md:col-span-7 lg:col-span-6">

            <div className="flex items-center gap-2">

              <span className="h-px w-12 bg-outline" />

              <span className="text-xs uppercase tracking-widest text-outline">
                The Winter Collection
              </span>

            </div>

            <h1 className="font-headline-lg text-5xl leading-tight text-on-surface md:text-7xl">

              The Warmth of
              <br />

              <span className="italic text-secondary">
                Tradition
              </span>

            </h1>

            <p className="max-w-md text-lg leading-relaxed text-on-surface-variant">

              A sensory journey through our curated hot rituals.
              Experience the tactile comfort of warm ceramics and
              the deep, complex notes of perfectly extracted brews.

            </p>

            <div className="pt-4">

              <a
                href="#coffee-collection"
                className="inline-block rounded-full bg-secondary px-8 py-4 text-xs uppercase tracking-widest text-white shadow-[0_12px_40px_rgba(92,61,46,0.08)] transition duration-300 hover:scale-105"
              >
                Explore the Rituals
              </a>

            </div>

          </div>


         <div
  className="relative mt-16 hidden md:col-span-5 md:mt-0 md:block lg:col-span-6"
  onMouseMove={handleHeroMouseMove}
  onMouseLeave={handleHeroMouseLeave}
>

        <div
  ref={heroImageRef}
  className="organic-shape-1 relative h-[600px] w-full overflow-hidden shadow-2xl"
  style={{
    transition: "transform 0.15s ease-out",
    transformStyle: "preserve-3d",
     perspective: "1000px",
  }}
>

  <img
  src="/images/coffee3d/background.png"
  alt=""
  clclassName="coffee-background absolute inset-0 h-full w-full object-cover"
  style={{
    transform: "translateZ(0px)",
  }}
/>

            <img
  src="/images/coffee3d/coffee-cup.png"
  alt="Hot coffee"
className="coffee-cup absolute inset-0 h-full w-full object-contain"
  style={{
    transform: "translateZ(100px)",
  }}
/>
            </div>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="space-y-32 pb-32">


        {/* COFFEE COLLECTION */}

        <section
          id="coffee-collection"
          className="mx-auto max-w-[1280px] px-5 md:px-16"
        >

          <div className="mb-16 space-y-4 text-center">

            <h2 className="font-headline-lg text-4xl text-on-surface">
              The Coffee Collection
            </h2>

            <p className="mx-auto max-w-2xl text-on-surface-variant">
              Sourced with intent, roasted with precision. Each cup
              is an expression of terroir and craft.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {coffeeCollection.map((item) => (

              <CoffeeCard
                key={item.name}
                item={item}
                onAdd={addToCart}
              />

            ))}

          </div>

        </section>


        {/* ================= TEA ANTHOLOGY ================= */}

        <section className="mx-auto max-w-[1280px] px-5 md:px-16">

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">


            <div className="flex flex-col justify-center space-y-6 lg:col-span-4 lg:pr-12">

              <h2 className="font-headline-lg text-4xl text-on-surface">
                The Tea Anthology
              </h2>

              <p className="leading-relaxed text-on-surface-variant">
                Steeped in history and patience. Our selection of
                infused teas and chais are designed to warm the soul
                and quiet the mind.
              </p>

              <div className="pt-4">

                <button className="rounded-full border border-tertiary px-6 py-3 text-xs uppercase tracking-widest text-tertiary transition hover:scale-105 hover:border-secondary hover:text-secondary">
                  View Origins
                </button>

              </div>

            </div>


            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-8">


              {/* FEATURED TEA */}

              <article className="card-border flex flex-col items-center gap-8 rounded-3xl bg-white/60 p-8 backdrop-blur-xl md:col-span-2 md:flex-row">

                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl md:w-1/2">

                  <img
                    src={teas[0].image}
                    alt={teas[0].name}
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="w-full space-y-4 md:w-1/2">

                  <span className="inline-block rounded-full bg-tertiary/10 px-3 py-1 text-[10px] uppercase tracking-widest text-tertiary">
                    Signature Blend
                  </span>

                  <div className="flex items-end justify-between gap-4 border-b border-outline/20 pb-2">

                    <h3 className="font-headline-md text-2xl text-on-surface">
                      {teas[0].name}
                    </h3>

                    <span className="shrink-0 text-xs text-secondary">
                      <Price value={teas[0].price} />
                    </span>

                  </div>

                  <p className="leading-relaxed text-on-surface-variant">
                    {teas[0].description}
                  </p>

                 <button
  onClick={() => addToCart(teas[0])}
  className="rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  Add to Cart
</button>

                </div>

              </article>


              {/* KARAK */}

              <article className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 card-border">

                <div className="mb-6 aspect-square overflow-hidden rounded-xl">

                  <img
                    src={teas[1].image}
                    alt={teas[1].name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                </div>

                <div className="space-y-4">

                  <div className="flex items-start justify-between gap-3">

                    <h3 className="font-headline-md text-xl text-on-surface">
                      {teas[1].name}
                    </h3>

                    <span className="shrink-0 text-xs text-secondary">
                      <Price value={teas[1].price} />
                    </span>

                  </div>

                  <p className="text-sm text-on-surface-variant">
                    {teas[1].description}
                  </p>

                </div>

                <button
  onClick={() => addToCart(teas[1])}
  className="mt-6 flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingCart size={16} />
  Add to Cart
</button>
              </article>


              {/* EARL GREY */}

              <article className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 card-border">

                <div className="mb-6 aspect-square overflow-hidden rounded-xl">

                  <img
                    src={teas[2].image}
                    alt={teas[2].name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                </div>

                <div className="space-y-4">

                  <div className="flex items-start justify-between gap-3">

                    <h3 className="font-headline-md text-xl text-on-surface">
                      {teas[2].name}
                    </h3>

                    <span className="shrink-0 text-xs text-secondary">
                      <Price value={teas[2].price} />
                    </span>

                  </div>

                  <p className="text-sm text-on-surface-variant">
                    {teas[2].description}
                  </p>

                </div>

               <button
  onClick={() => addToCart(teas[2])}
  className="mt-6 flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingCart size={16} />
  Add to Cart
</button>

              </article>

            </div>

          </div>

        </section>


        {/* ================= GREEN TEAS ================= */}

        <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-16">

          <div className="relative overflow-hidden rounded-[40px] bg-surface-container-low">

            <div className="relative z-10 grid grid-cols-1 items-center gap-12 p-8 md:p-16 lg:grid-cols-2">


              <div className="order-2 space-y-8 lg:order-1">

                <div>

                  <h2 className="mb-4 font-headline-lg text-4xl text-on-surface">
                    Ceremonial Green Teas
                  </h2>

                  <p className="leading-relaxed text-on-surface-variant">
                    Embrace the quiet discipline of Japanese tea culture.
                    Whisked, steeped, and poured with profound respect
                    for the leaf.
                  </p>

                </div>


                <div className="space-y-6">
{greenTeas.map((item) => (

  <div
    key={item.name}
    className="group flex items-center gap-5 border-b border-outline/20 pb-5 text-left transition hover:border-secondary"
  >

    {/* IMAGE */}

    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">

      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

    </div>


    {/* CONTENT */}

    <button
      onClick={() => addToCart(item)}
      className="flex flex-1 items-center justify-between gap-4 text-left"
    >

      <div>

        <h3 className="font-headline-md text-xl text-on-surface group-hover:text-secondary">
          {item.name}
        </h3>

        <p className="mt-1 text-sm text-on-surface-variant">
          {item.description}
        </p>

        <span className="mt-3 inline-block rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-secondary">
          Add to Cart
        </span>

      </div>


      <span className="shrink-0 text-xs text-secondary">
        <Price value={item.price} />
      </span>

    </button>

  </div>

))}

                </div>

              </div>


              <div className="order-1 lg:order-2">

                <div className="organic-shape-2 aspect-square w-full overflow-hidden shadow-xl">

                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKcsTEF4f31PxQpGCYqF9ZlOOc-Mwtk1TLMCH5zRF-qdTDnihhqDEJ5mrRPf-ZwIWZ5gDOug-tokRaTVvabWqDGF7MBRDb1AUitOYXvCHfUlx8H2WDGgPv0RPykwR7OkM3gMCucIwee-mKCT-unw9JDNNIAdg-ec2GtS3WwyRBHRssxbDulMuxiX2TLCwNZjaK7KayhQOkxIVn66vr7eB-On6siXyH-UsorQozRABvLaM4mbyW9YGJ"
                    alt="Ceremonial Matcha Preparation"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="w-full bg-surface-container-low py-16">

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-5 text-center md:grid-cols-3 md:px-16 md:text-left">

          <div>

            <div className="mb-4 font-headline-lg text-4xl text-primary">
              Brew Haven
            </div>

            <p className="text-sm text-on-surface-variant">
              © 2026 Brew Haven. Crafted for the intentional ritual.
            </p>

          </div>


          <div className="flex flex-col space-y-4 md:items-center">

            <a href="/our-story" className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary">
              Our Story
            </a>

            <a href="#" className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary">
              Sourcing
            </a>

          </div>


          <div className="flex flex-col space-y-4 md:items-end">

            <a href="#" className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary">
              Locations
            </a>

            <a href="#" className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary">
              Contact
            </a>

          </div>

        </div>

      </footer>


      {/* ================= CART ================= */}

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