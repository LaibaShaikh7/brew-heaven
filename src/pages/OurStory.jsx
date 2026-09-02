import React from "react";

function OurStory() {
  return (
    <div
  className="min-h-screen bg-[#faf7f5] text-[#4b3025] bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/our-story-bg.png')",
  }}
>

      <section className="max-w-4xl mx-auto px-6 py-24">

        <p className="text-sm tracking-[0.3em] uppercase mb-5 text-[#806052]">
          Our Story
        </p>

        <h1 className="text-5xl md:text-6xl font-serif mb-12">
          The Story Behind Brew Haven
        </h1>

        <div className="space-y-7 text-lg leading-8 text-[#5f4a40]">

          <p>
            The idea behind Brew Haven started with my love for coffee.
          </p>

         <p className="mb-6 text-base leading-8 text-muted">
  I've always had a little dream of opening a café of my own someday —
  not just a place to grab a coffee, but a place where people could slow
  down for a while.
</p>

<p className="mb-6 text-base leading-8 text-muted">
  I imagined a cozy space filled with the smell of freshly brewed coffee,
  the quiet sound of slow music playing in the background, and shelves of
  books waiting to be picked up. A place where someone could sit by the
  window, read a few pages, enjoy their favorite drink, or simply have a
  peaceful moment.
</p>

<p className="mb-6 text-base leading-8 text-muted">
  That dream has always felt a little far away, so I thought —
  <span className="font-medium text-brown">
    why not build a small part of it now?
  </span>
</p>

<p className="mb-6 text-base leading-8 text-muted">
  Since I'm learning Computer Science, I decided to turn that idea into
  something I could create myself. And that's how
  <span className="font-medium text-brown"> Brew Haven </span>
  began.
</p>

<p className="mb-6 text-base leading-8 text-muted">
  I started building this website as my first little version of the café
  I've always imagined — a place where coffee, desserts, books, music,
  and a calm atmosphere come together.
</p>

<p className="mt-10 text-lg font-medium leading-8 text-brown">
  It's not the café I've dreamed of yet.
  <br />
  But maybe it's where the dream begins. 🤎
</p>

<p className="mt-8 text-right italic text-muted">
  — Laiba Shaikh
</p>

        </div>

      </section>

    </div>
  );
}

export default OurStory;