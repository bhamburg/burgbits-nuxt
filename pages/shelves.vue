<script setup lang="ts">
useHead({
  title: 'Shelves - Brian Hamburg'
})
</script>

<template>
  <Jumbotron>
    <h1>Shelves</h1>
  </Jumbotron>
  <Section>
    <div class="flex flex-col lg:flex-row-reverse">
      
      <OnThisPage :links="[
        { text: 'Books', id: 'books' },
        { text: 'Movies & Shows', id: 'videos' },
        { text: 'Games', id: 'games' }
      ]" />

      <article class="lg:w-[75%] lg:mr-auto pt-4">
        <h2 id="books">Books</h2>
        <blockquote>
          <p>
            “The man who does not read has no advantage over the man who cannot read.”
            <em class="text-nowrap">— Mark Twain</em>
          </p>
        </blockquote>
        <Shelf dataPath="/api/shelf/books" />

        <h2 id="videos">Movies & Shows</h2>
        <blockquote>
          <p>
            “There should be a point to movies. Sure, you're giving people a diversion 
            from the cold world for a bit, but at the same time, you pass on some facts 
            and rules and maybe a little bit of wisdom.”
            <em class="text-nowrap">— George Lucas</em>
          </p>
        </blockquote>
        <Shelf dataPath="/api/shelf/videos" />

        <h2 id="games">Games</h2>
        <blockquote>
          <p>
            “Video games are bad for you? That’s what they said about rock and roll.”
            <em class="text-nowrap">— Shigeru Miyamoto</em>
          </p>
        </blockquote>
        <Shelf dataPath="/data/shelves/games.json" />
      </article>
    </div>
  </Section>
</template>