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
        <div class="bg-zinc-100 dark:bg-zinc-700 p-6 pb-0 shadow rounded-lg">
          <h3>Software Engineer</h3>
          <p>
            With over a decade of experience building user interfaces for 
            the Web and providing technical support, my focus has always been 
            to remove friction from the user experience.
          </p>
        </div>
        <div class="bg-zinc-100 dark:bg-zinc-700 p-6 pb-0 shadow rounded-lg">
          <h3>Designer</h3>
          <p>
            My background in graphic design gives me an appreciation for both 
            accessibility and aesthetics. I strive to create components that 
            are usable and reusable. Design is how it works!
          </p>
        </div>
        <div class="bg-zinc-100 dark:bg-zinc-700 p-6 pb-0 shadow rounded-lg">
          <h3>Musician</h3>
          <p>
            When I'm not behind my laptop, you can often find me behind my 
            four-string banjo, plunking out traditional jazz favorites 
            written circa a century ago.
          </p>
        </div>
      </article>
    </Section>
  </main>
</template>