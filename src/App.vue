<template>
  <div class="App">
    <header
      class="position-fixed top-0 w-100"
      style="background-color: DarkCyan; z-index: 1020;"
    >
      <nav
        class="navbar navbar-dark"
      >
        <div class="container">
          <router-link
            class="navbar-brand"
            to="/"
          >
            NCU Course Finder v6
          </router-link>
        </div>
      </nav>
    </header>
    <main
      class="min-vh-100 px-1"
      style="padding-top: 70px;"
    >
      <router-view />
    </main>
    <footer class="bg-light py-2 mt-4 text-center text-nowrap">
      <small>
        <div>
          Made by
          <a
            href="https://github.com/zetaraku"
            target="_blank"
          >zetaraku</a>
          with Vite + Vue 3 + Bootstrap 5
        </div>
        <div>
          Licensed under the MIT License
          <a
            class="ms-1"
            href="https://github.com/zetaraku/NCU-Course-Finder-v6"
            target="_blank"
          >
            <i class="bi bi-github" />
          </a>
        </div>
      </small>
    </footer>
  </div>
</template>

<script>
export default {
};
</script>

<style>
</style>
