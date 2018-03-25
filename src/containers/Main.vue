<template>
  <div>
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
      <v-spacer></v-spacer>
      {{firebase.firebase.auth().currentUser.displayName}}
      <v-btn color="white" @click="logout" :loading="loggingOut">Log Out</v-btn>
    </v-toolbar>

    <router-view/>
  </div>
</template>

<script>
const firebase = require('../config/firebaseInit');

export default {
  data() {
    return {
      loggingOut: false,
      clipped: true,
      drawer: false,
      firebase: firebase,
      items: [
        {
          icon: 'home',
          title: 'Home',
          link: '/home',
        },
        {
          icon: 'timeline',
          title: 'Graphs',
          link: '/graphs',
        },
        {
          icon: 'help_outline',
          title: 'Patch Notes',
          link: '/updates',
        },
      ],
      miniVariant: false,
      title: 'Arbitrage',
    };
  },
  methods: {
    logout() {
      this.loggingOut = true;
      firebase.firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push('/');
          this.logginOut = false;
        })
        .catch((error) => {
          // An error happened.
          this.logginOut = false;
          console.log(error);
        });
    },
  },
  name: 'Main',
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

.linkTile:active {
  color: green;
}
</style>
