import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowRight,
  Coffee,
  Globe2,
  Mail,
  Menu,
  Search,
  Share2,
  ShoppingBag,
  X,
} from "lucide-react";

const icedLattes = [
  {
    name: "Vanilla Bean Iced Latte",
    price: 820,
    description:
      "Madagascar vanilla bean steeped in cold milk, finished with a double shot of our house espresso.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCg84ir7C3vmAjBxZD-bAm8aMnO0tc_DWk8EYEM-lHCeTFNjvDCxZR6hd7I87eW2ZxqjQ1IvikNRmT0C8-hE7lxya9vV6H0dRStFGGtfDdrGprPxEV5LOWjJOJwY71kJ_8gn8B0O_6CczmkM_S2evhwwr5DI9FLlHanKpfu84EcgIu0RT7yQPXSVnM_845SSWMB9EgLNmHWFK4uv8eJVsEAXx9qWf5XF_kdBy8r34_av_oUt_nBFaZ6",
  },
  {
    name: "Pistachio Iced Latte",
    price: 880,
    description:
      "Our signature roasted pistachio paste folded into silk milk and chilled espresso for a nutty, buttery finish.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7kzBosvMuDffnUMhUGan94h_1RBBDbOCT5iZF94KDqT6aslb-GlMrtFt0DwVw681vS3wJP4i-FjhjoBn6SZEOuYEc15i0JTtJTTrklZpJSTRIDkyEgAPa8fOVjMfMRRw_K1OIU3MyqfLrkIbN5O-824NTnqAKqdPt63wWB6_Xm6idv4-LQup5xObf94wDF8YYk0izGaPeV7TBh4UjUhR2ForsK429SLokfrtO6GuO-KGleh4oD-F_",
  },
  {
    name: "Spanish Iced Latte",
    price: 850,
    description:
      "A sweet, creamy homage to the traditional recipe, balanced with the robust depth of our dark roast.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBb6dcb8816zY6y0HkOe7qengATioUpakh_ItU3ondJpcQaQk2Wv4DoMtZHQEOi94_iAfVB6vHaqqws2Pk2anwKMmWFEV6hj7NLpSR0-gdj7WCYjwNYO6bnclRpuG3GuL2ggnhdjulrSCYy_wozgUF7B8A3y3FOrnfkGAzpdl2kQ4tocYfYSARz_EgEo0zVvR8xe6dVKejXseRmPCIcnnH1rpqwO65kGfvEpeQwjq3HI0c3pLs-hfF_",
  },
];

const frappes = [
  {
    name: "Belgian Chocolate Frappe",
    price: 950,
    description:
      "Indulgent 70% dark Belgian cocoa blended with ice and velvet cream. A sophisticated reimagining of a classic.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAI5hjcwTWfCs91TO-15vKomQ4-pzE9dzm11cyG8Nhi2-VtuCDKPk3_0lYRaNn80JtoBGy1jKU6u7_wcbQOScC55cu_ozmlbaaT-dC7z57xPNMqKnp7TAs_RooX2qen6K7m-8KF7AuWi6GltGE4lFfaTqJIyX4IJVtXpWMV87SkVouEnzX9mk2yLSpIvKFy3SOQATcWN9PKyeq_aLyO4o3itBbEG8Mj7M02YK88kaGAYB0uyCH9Yv-l",
  },
  {
    name: "Caramel Sea Salt",
    price: 920,
    description:
      "A delicate balance of sweet house-made caramel and flakes of artisanal sea salt.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIlFhD468Vrhi1lWDx0-qjQSSGVziF7RRsVuZBzS3EsFJIgSJSxXTKN1IF4a09hB2cYkgrrbpr2guVlaS1fF-Ulhiuc7NPKDsMZe0Zhvwc3tzK3JdlUjK2FLIadLcjqivdsjtWbJbMxUeJXwSnoVajWrBsn8YDnD0ArDBgoE3Qm8-18cG5XAqL_wnPimDZNpQrg6m8wv82Xov-i62VrIKw0EH-ouLphB9euE6cDghtNCHj6h1-F-4r",
  },
  {
   
  name: "Matcha Green Tea",
  price: 980,
  description:
    "Stone-ground ceremonial matcha blended with organic milk and a hint of wildflower honey.",
  image: "/images/MatchaGreenTea.jpg",
},
  
];

const cappuccinos = [
  {
    name: "Classic Iced Cappuccino",
    price: 780,
    description:
      "Double shot espresso, chilled, topped with a thick layer of cold-stretched foam.",
      image: "/images/classic_iced_cappuccino.jpg",
  },
  {
    name: "Toffee Nut Iced Cappuccino",
    price: 840,
    description:
      "Warm toffee notes paired with toasted hazelnut, topped with caramel microfoam.",
      image: "/images/toffee_nut_iced_cappuccino.jpg",
  },
];

function Price({ value }) {
  return <>Rs. {value.toLocaleString("en-PK")}</>;
}

function ProductCard({ item, onAdd }) {
  return (
    <article className="group">
      <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="glass-card absolute right-4 top-4 rounded-full px-4 py-1 text-sm text-secondary">
          <Price value={item.price} />
        </div>
      </div>

      <h3 className="font-display mb-2 text-2xl text-secondary group-hover:text-tertiary">
        {item.name}
      </h3>

      <p className="leading-relaxed text-on-surface-variant">
        {item.description}
      </p>

      <button
  onClick={() => onAdd(item)}
  className="mt-5 flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingBag size={16} />
  Add to Cart
</button>
    </article>
  );
}

export default function ColdCoffee() {
  const [mobileOpen, setMobileOpen] = useState(false);
 const {
  addToCart,
  totalItems,
  subtotal,
} = useCart();
  return (
    <div className="min-h-screen bg-background text-on-background">

      {/* ================= NAVBAR ================= */}

      <header className="fixed top-0 z-50 w-full border-b border-secondary/5 bg-white/60 shadow-sm backdrop-blur-3xl">
        <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-16">

          <a
            href="/"
            className="font-display text-2xl tracking-tight text-secondary"
          >
            Brew Haven
          </a>

          <div className="hidden items-center gap-8 md:flex">

            <a
              href="/coffee/hot"
              className="text-on-surface-variant hover:text-secondary"
            >
              Hot Coffee
            </a>

            <a
              href="/coffee/cold"
              className="border-b-2 border-secondary pb-1 font-bold text-secondary"
            >
              Cold Coffee
            </a>

            <a
              href="/special-drinks"
              className="text-on-surface-variant hover:text-secondary"
            >
              Special Drinks
            </a>

            <a
              href="/desserts"
              className="text-on-surface-variant hover:text-secondary"
            >
              Desserts
            </a>

          </div>

         <div className="flex items-center gap-5">

  {/* SEARCH */}

  <button
    aria-label="Search"
    className="text-secondary transition hover:scale-105"
  >
    <Search size={21} />
  </button>


  {/* CART */}

  <Link
    to="/cart"
    className="relative flex items-center gap-2 text-secondary transition hover:scale-105"
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
    onClick={() => setMobileOpen((v) => !v)}
    className="text-secondary md:hidden"
  >
    {mobileOpen ? <X /> : <Menu />}
  </button>

</div>

        </nav>

        {mobileOpen && (
          <div className="border-t border-secondary/5 bg-white/95 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">

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

      </header>


      {/* ================= MAIN ================= */}

      <main className="pt-20">

        {/* HERO */}

        <section className="relative flex min-h-[700px] items-center overflow-hidden md:h-[819px]">

          <div className="absolute inset-0">

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNOOU4lr_ejAoZnsfzublbolyR8gabSPigyTdf0L7SPojhmD1AwlJmSCX-csH2pklufIDS1zQ3Md-TsmabMNZl7rmIgnpvzvMuTAOoqa6h63g8D2zpp43X2_SlCtfi_996x044LC-B9rVIMcgpZvAG6TcYsxFE9cbfASOfRdOXE-endWb9wwiG0-JcsZNI2Vk1qlG1PnIWn9vfRE95RjdILKebZ1g3r0H8ZmCULWX0Ob8IP3HG1ZuJ"
              alt="Brew Haven cold coffee hero"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-white/20" />

          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-16">

            <div className="glass-card max-w-2xl rounded-xl p-8 md:p-16">

              <h1 className="font-display mb-6 text-5xl italic leading-tight text-secondary md:text-7xl">
                The Chilled Anthology
              </h1>

              <p className="text-lg leading-relaxed text-on-surface-variant">
                A slow descent into tranquility. We honor the ritual of the
                cold pour—where time and temperature coalesce to reveal the
                subtle, hidden notes of our single-origin beans. Each sip is a
                breath of clarity in a bustling world.
              </p>

            </div>

          </div>

        </section>


        {/* ================= ICED LATTES ================= */}

        <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-16">

          <div className="mb-16 flex flex-col items-end justify-between gap-4 md:flex-row">

            <div>

              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-secondary">
                The Velvet Collection
              </span>

              <h2 className="font-display text-4xl text-secondary">
                Iced Lattes
              </h2>

            </div>

            <div className="mx-12 mb-4 hidden h-px flex-grow bg-secondary/10 md:block" />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {icedLattes.map((item) => (
              <ProductCard
                key={item.name}
                item={item}
                onAdd={addToCart}
              />
            ))}

          </div>

        </section>


        {/* ================= FRAPPES ================= */}

        <section className="bg-surface-container-low py-24">

          <div className="mx-auto max-w-[1280px] px-5 md:px-16">

            <div className="mb-16 text-center">

              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-secondary">
                Textured & Frozen
              </span>

              <h2 className="font-display text-4xl text-secondary">
                Hand-Blended Frappes
              </h2>

            </div>


            <div className="grid grid-cols-1 gap-6 md:h-[800px] md:grid-cols-4 md:grid-rows-2">

              {/* BELGIAN CHOCOLATE */}

              <article className="glass-card group flex flex-col justify-between rounded-xl p-6 md:col-span-2 md:row-span-2 md:p-8">

                <div className="mb-8 h-72 overflow-hidden rounded-lg md:h-[60%]">

                  <img
                    src={frappes[0].image}
                    alt={frappes[0].name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                </div>

                <div>

                  <div className="mb-4 flex items-center justify-between gap-4">

                    <h3 className="font-display text-2xl text-secondary">
                      {frappes[0].name}
                    </h3>

                    <span className="text-secondary">
                      <Price value={frappes[0].price} />
                    </span>

                  </div>

                  <p className="text-lg leading-relaxed text-on-surface-variant">
                    {frappes[0].description}
                  </p>

                 <button
  onClick={() => addToCart(frappes[0])}
  className="mt-6 flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingBag size={16} />
  Add to Cart
</button>

                </div>

              </article>


              {/* OTHER FRAPPES */}

              {frappes.slice(1).map((item) => (

                <article
                  key={item.name}
                  className="glass-card group flex flex-col gap-6 rounded-xl p-6 md:col-span-2 md:flex-row md:p-8"
                >

                  <div className="h-48 w-full overflow-hidden rounded-lg md:h-full md:w-1/2">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                  </div>

                  <div className="flex w-full flex-col justify-center md:w-1/2">

                    <div className="mb-4 flex items-center justify-between gap-3">

                      <h3 className="font-display text-2xl text-secondary">
                        {item.name}
                      </h3>

                      <span className="shrink-0 text-secondary">
                        <Price value={item.price} />
                      </span>

                    </div>

                    <p className="italic leading-relaxed text-on-surface-variant">
                      {item.description}
                    </p>

                   <button
  onClick={() => addToCart(item)}
  className="mt-5 flex w-fit items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
>
  <ShoppingBag size={16} />
  Add to Cart
</button>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>


        {/* ================= COLD CAPPUCCINOS ================= */}

        <section className="mx-auto max-w-[1280px] px-5 py-32 md:px-16">

          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

            <div className="relative">

              <div className="ambient-shadow overflow-hidden rounded-[60%_40%_70%_30%/30%_60%_40%_70%]">

                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVrxAvIXtUsoHzZE-MMOD8EBuecV1HBYgwZ5vjg4jnKagRQYQFZjgCYu_3NXQtioiQszT4UP3caaWqB91__XdRJgi3Px0c265H1HjLWyXbitEn3A3O2AumAQJAsdPxsDu7hnhGhl27n6JaKmAFJjw-9XtZuLXopmubWt2iCcVJAwAa0BY7-o9nSxS9MiP1STfgv3uxv_3Y1f9EY6VbecXCaHImy_wSED6O382iI1jE5h1Ui589F3Bi"
                  alt="Cold cappuccino"
                  className="h-[600px] w-full object-cover"
                />

              </div>

            </div>


            <div>

              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-secondary">
                The Foam Masterpiece
              </span>

              <h2 className="font-display mb-6 text-4xl text-secondary">
                Cold Cappuccinos
              </h2>

              <p className="mb-12 text-lg leading-relaxed text-on-surface-variant">
                Our cold-frothed microfoam remains stable and silky, creating a
                textural contrast that traditional iced coffees simply cannot match.
              </p>


              <div className="space-y-8">

                {cappuccinos.map((item) => (

  <div
    key={item.name}
    className="border-b border-secondary/10 pb-6"
  >

    <div className="flex items-start justify-between gap-6">

      <div>

        <h4 className="font-display text-2xl text-secondary">
          {item.name}
        </h4>

        <p className="mt-1 italic leading-relaxed text-on-surface-variant">
          {item.description}
        </p>

      </div>

      <span className="shrink-0 text-lg text-secondary">
        <Price value={item.price} />
      </span>

    </div>

    <button
      onClick={() => addToCart(item)}
      className="mt-4 flex items-center gap-2 rounded-full bg-[#E8D8CC] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#5C4033] shadow-sm transition hover:scale-105 hover:bg-[#D8C1B2]"
    >
      <ShoppingBag size={16} />
      Add to Cart
    </button>

  </div>

))}

              </div>


              <button className="mt-8 flex items-center gap-3 rounded-full bg-secondary px-10 py-4 text-white hover:scale-105">

                Explore Full Menu

                <Coffee size={20} />

              </button>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="mt-20 bg-surface-container-low">

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-16 md:grid-cols-4 md:px-16">

          <div className="md:col-span-2">

            <div className="font-display mb-4 text-4xl text-secondary">
              Brew Haven
            </div>

            <p className="mb-6 max-w-sm italic text-on-surface-variant">
              © 2026 Brew Haven. Embracing the ritual of the perfect pour.
            </p>

            <div className="flex gap-6 text-secondary">
              <Globe2 size={20} />
              <Mail size={20} />
              <Share2 size={20} />
            </div>

          </div>


          <div className="flex flex-col gap-3">

            <h5 className="mb-2 font-bold text-secondary">
              Philosophy
            </h5>

            <a href="/our-story"className="text-on-surface-variant hover:text-secondary">
              Our Story
            </a>

            <a href="#" className="text-on-surface-variant hover:text-secondary">
              Sustainability
            </a>

            <a href="#" className="text-on-surface-variant hover:text-secondary">
              Locations
            </a>

          </div>


          <div className="flex flex-col gap-3">

            <h5 className="mb-2 font-bold text-secondary">
              Concierge
            </h5>

            <a href="#" className="text-on-surface-variant hover:text-secondary">
              Contact Us
            </a>

            <a href="#" className="text-on-surface-variant hover:text-secondary">
              Privacy Policy
            </a>

          </div>

        </div>


        <div className="mx-auto max-w-[1280px] border-t border-secondary/5 px-5 py-8 text-center text-xs tracking-widest text-on-surface-variant/60 md:px-16 md:text-left">

          Designed for those who appreciate the silence between sips.

        </div>

      </footer>


      {/* ================= CART SUMMARY ================= */}

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