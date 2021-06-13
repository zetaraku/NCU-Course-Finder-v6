<template>
  <div class="App">
    <header
      class="position-fixed top-0 w-100"
      style="background-color: DarkCyan; z-index: 1020;"
    >
      <nav
        class="navbar navbar-dark navbar-expand-md"
      >
        <div class="container">
          <a class="navbar-brand me-0 cursor-pointer">
            <i class="bi mx-3 fs-3 bi-compass" />
          </a>
          <router-link
            class="navbar-brand"
            to="/"
          >
            NCU Course Finder v6
          </router-link>
          <button
            class="navbar-toggler position-relative"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="navbar-collapse collapse justify-content-end">
            <ul class="navbar-nav text-center">
              <li
                v-for="(link, i) in links"
                :key="i"
                class="nav-item py-1"
              >
                <router-link
                  class="nav-link"
                  :to="link.to"
                >
                  {{ link.text }}
                </router-link>
              </li>
            </ul>
          </div>
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
          <a
            class="ms-2"
            href="https://www.free-counter.jp/"
          >
            <img
              :src="ENV.VITE_FREE_COUNTER_IMG_SRC"
              alt="アクセスカウンター"
            >
          </a>
        </div>
      </small>
    </footer>
  </div>
</template>

<script>
export default {
  setup() {
    const links = [
      { text: '選課說明', to: '/' },
      { text: '課程查詢', to: '/' },
      { text: '我的課表', to: '/' },
      { text: '關於本站', to: '/' },
    ];

    return {
      links,
      ENV: import.meta.env,
    };
  },
};
</script>

<style>
</style>
