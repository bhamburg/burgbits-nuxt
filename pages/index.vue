<template>
  <main>
    <Jumbotron>
      <div class="md:mx-5 py-4">
        <h2>Hi, I&rsquo;m Brian.</h2>
        <p class="text-xl md:text-2xl pt-5">I&rsquo;m a 
          <span class="font-mono bg-emerald-400 dark:bg-black bg-opacity-70 dark:bg-opacity-100 rounded px-1 shadow">software engineer</span>,<br /> 
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
      <CardTrio>
        <div class="card">
          <h3>Software Engineer</h3>
          <p>
            With over two decades of experience building user interfaces for 
            the Web and providing technical support, my focus has always been 
            to remove friction from the user experience.
          </p>
          <a href="/about#résumé">
            Learn more
          </a>
        </div>
        <div class="card">
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
        <div class="card">
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
      </CardTrio>
    </Section>
  </main>
</template>