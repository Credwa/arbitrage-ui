<template>
  <v-container text-xs-center fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center wrap column justify-space-between>
          <v-form ref="form" lazy-validation>
            <v-select
              label="Graph"
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              @change="graphChanged()"
              required
              ref='graphSelect'
            ></v-select>
        </v-form>
        <graph :chartData="histData" class="graphs"> </graph>
        <v-progress-circular v-bind:size="250" v-bind:width="2" v-if="loading" indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import axios from 'axios';
import Graph from './../components/Graph';

export default {
  components: {
    Graph,
  },
  data() {
    return {
      select: 'BTC-MXN',
      items: [
        'BTC-MXN',
        'ETH-MXN',
        'BCH-MXN',
        'LTC-MXN',
        'XRP-MXN',
        'BTC-ARS',
        'ETH-ARS',
      ],
      loading: false,
      histData: null,
    };
  },
  methods: {
    graphChanged() {
      this.loading = true;
      setTimeout(() => {
        // console.log(this.$refs.graphSelect.value);
        const graphr = this.select.split('-');
        axios
        .get(
          `https://shielded-oasis-26232.herokuapp.com/historical/${graphr[0]}/${
            graphr[1]
          }`,
        )
        .then((data) => {
          this.histData = data.data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
      }, 100);
    },
  },
  created() {
    const graph = this.select.split('-');
    this.loading = true;
    axios
      .get(
        `https://shielded-oasis-26232.herokuapp.com/historical/${graph[0]}/${
          graph[1]
        }`,
      )
      .then((data) => {
        this.histData = data.data;
        this.loading = false;
      })
      .catch((e) => {
        console.log(e);
        this.loading = false;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graphs {

}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
