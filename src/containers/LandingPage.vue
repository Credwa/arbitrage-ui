<template>
    <div>
      <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      fixed
      :clipped="true"
      app
      enable-resize-watcher
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-action>
            <v-btn v-if="!mini" icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="route(item.route); drawer = !drawer">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
      <v-toolbar color="primary">
        <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title>Arbitrage</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-for="item in items" :key="item.title" @click="route(item.route)">{{item.title}}</v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <router-view>
    </router-view>
    </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'dashboard', route: '/' },
        { title: 'Pricing', icon: 'attach_money', route: '/pricing' },
      ],
      mini: false,
      right: null,
    };
  },
  methods: {
    route(route) {
      this.$router.push(route);
    },
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
