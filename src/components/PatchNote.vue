<template>
    <div class="patchNote" >
      <v-flex xs12 sm6 offset-sm3>
      <v-card style="padding-left: 2vw; padding-right: 2vw">
        <v-card-title primary-title>
          <div>
            <h3 style="color:#64B5F6" class="headline mb-0">{{title}}</h3>
            <ul >
              <li  style="padding: 1vw" v-for="note in notes">{{note}}</li>
            </ul>
          </div>
        </v-card-title>
        <v-card-actions>
          <p>Updated: <b>{{date}}</b></p>
        </v-card-actions>
      </v-card>
    </v-flex>
    </div>
</template>

<script>
export default {
  props: ['title', 'notes', 'date'],
  data() {
    return {
    };
  },
  created() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.patchNote {
  min-width: 80vw;
  margin-bottom: 1vh;
}
</style>
