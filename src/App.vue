<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
      <router-link  class="myLink"
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"

      >
        <v-list-tile
         value="true"
        >
          <v-list-tile-action class="linkTile" class-active="routerLinkActive">
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>

            <v-list-tile-content class="linkTile">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>

        </v-list-tile>
      </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="primary"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Menu',
        link: '/',
      },
      {
        icon: 'home',
        title: 'Home',
        link: '/',
      },
      {
        icon: 'timeline',
        title: 'Graphs',
        link: '/graphs',
      }],
      miniVariant: false,
      title: 'Arbitrage',
    };
  },
  name: 'App',
};
</script>

<style scoped>
  .myLink:link {
    text-decoration: none;
    font-size: 1.3em;
  }
  .routerLinkActive {
    background-color: indianred;
    cursor: pointer;
  }
  .linkTile:hover {
    color: purple;
  }

  .linkTile:active{
    color: green;
  }
</style>

