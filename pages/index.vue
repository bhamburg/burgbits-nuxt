<template>
  <main>
    <Jumbotron>
      <div class="md:mx-5 py-4">
        <h2>Hi, I&rsquo;m Brian.</h2>
        <p class="text-xl md:text-2xl pt-5">I&rsquo;m a 
          <span class="font-mono bg-black bg-opacity-10 dark:bg-opacity-100 rounded px-1 shadow">software engineer</span>,<br /> 
          a <strong><em>designer</em></strong>,<br />
          and a <em class="font-serif">musician</em>.
        </p>
        <div>
          <Button to="/about" aria-current="page" type="button" class="solid">
            About Brian
          </Button>
          <Button to="/posts" aria-current="page" type="button">
            Blog Posts
          </Button>
        </div>
      </div>
      <div class="flex md:mx-5 p-4 justify-center">
        <HomeHeroFlipper />
      </div>
    </Jumbotron>

    <Section>
      <article class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-7 mt-4 lg:mt-10">
        <div class="card card--engineer">
          <h3>Software Engineer</h3>
          <p>
            With over a decade of experience building user interfaces for 
            the Web and providing technical support, my focus has always been 
            to remove friction from the user experience.
          </p>
          <a href="/about#résumé">
            Learn more
          </a>
        </div>
        <div class="card card--designer">
          <h3>Designer</h3>
          <p>
            My background in graphic design gives me an appreciation for both 
            accessibility and aesthetics. I strive to create components that 
            are usable and reusable. Design is how it works!
          </p>
          <a href="/about#résumé">
            Learn more
          </a>
        </div>
        <div class="card card--musician">
          <h3>Musician</h3>
          <p>
            When I'm not behind my laptop, you can often find me behind my 
            four-string banjo, plunking out traditional jazz favorites 
            written about a century ago, give or take.
          </p>
          <a href="/about#music">
            Learn more
          </a>
        </div>
      </article>
    </Section>
  </main>
</template>

<style scoped>
/* Cards */
.card { @apply border-t-2; }
.card--engineer { @apply border-t-sky-500 dark:border-t-indigo-500; }
.card--designer { @apply border-t-orange-500 dark:border-t-blue-500; }
.card--musician { @apply border-t-emerald-400 dark:border-t-purple-500; }

/* Fade-up entrance */
.fade-up {
  animation: fadeUp 0.45s ease both;
}

.card:nth-child(1) { animation: fadeUp 0.45s 0.1s ease both; }
.card:nth-child(2) { animation: fadeUp 0.45s 0.2s ease both; }
.card:nth-child(3) { animation: fadeUp 0.45s 0.3s ease both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>