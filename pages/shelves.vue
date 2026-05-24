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
        { text: '📚 Books', id: 'books' },
        { text: '🎮 Games', id: 'games' },
        { text: '📺 Movies & TV', id: 'videos' },
        { text: '🎭 Mummers Parades', id: 'parades' },
        { text: '🏅 Runs', id: 'runs' },
        // { text: '🎸 Shows', id: 'shows' },
      ]" />

      <article class="lg:w-[75%] lg:mr-auto pt-4">
        <p>
          I like keeping track of what I've done, both as a data project and a personal record.
          Here you'll find logs of what I've been reading, watching, and playing,
          along with Mummers Parades I've been a part of and races I've run.
        </p>   
        <h2 id="books">Books</h2>
        <blockquote>
          <p>
            “The man who does not read has no advantage over the man who cannot read.”
            <em class="text-nowrap">— Mark Twain</em>
          </p>
        </blockquote>
        <Shelf dataPath="/api/shelf/books" />

        <h2 id="games">Games</h2>
        <blockquote>
          <p>
            “Video games are bad for you? That’s what they said about rock and roll.”
            <em class="text-nowrap">— Shigeru Miyamoto</em>
          </p>
        </blockquote>
        <Shelf dataPath="/api/shelf/games" />

        <h2 id="videos">Movies & TV</h2>
        <blockquote>
          <p>
            “There should be a point to movies. Sure, you're giving people a diversion 
            from the cold world for a bit, but at the same time, you pass on some facts 
            and rules and maybe a little bit of wisdom.”
            <em class="text-nowrap">— George Lucas</em>
          </p>
        </blockquote>
        <Shelf dataPath="/api/shelf/videos" />

        <h2 id="parades">Mummers Parades</h2>
        <blockquote>
          <p>
            “This city and the world would be better if everyone 
            could experience the best of the Philadelphia Mummers.”
            <em class="text-nowrap">— Steve Highsmith</em>
          </p>
        </blockquote>
        <Shelf dataPath="/api/shelf/parades" alwaysTable />

        <h2 id="runs">Runs</h2>
        <blockquote>
          <p>
            “But when I run, the world grows quiet. Demons are forgotten, 
            Krakens are slain, and Blerches are silenced.”
            <em class="text-nowrap">— The Oatmeal</em>
          </p>
        </blockquote>
        <Shelf dataPath="/api/shelf/runs" alwaysTable />

        <!-- <h2 id="shows">Shows (Concerts)</h2>
        <blockquote>
          <p>
            “The reason I play music is to touch people, for selfish reasons, as well. 
            It feels good to make someone else feel something, 
            whether it's a kiss, a painting, good idea or it's a song.”
            <em class="text-nowrap">— Dave Matthews</em>
          </p>
        </blockquote>
        <Shelf dataPath="/api/shelf/books" alwaysTable /> -->

      </article>
    </div>
  </Section>
</template>