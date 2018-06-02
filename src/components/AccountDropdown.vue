<template>
      <v-menu full-width offset-y>
        <v-btn  slot="activator" flat icon color="green lighten-2">
          <v-badge overlap color="yellow darken-4">
            <span slot="badge">!</span>
            <v-icon large color="green lighten-1">account_circle</v-icon>
          </v-badge>
        </v-btn>
        <v-list>
          <v-list-tile>
            {{firebase.firebase.auth().currentUser.displayName}}
          </v-list-tile>
          <v-layout row justify-center>
            <v-dialog v-model="alertModal" hide-overlay transition="dialog-bottom-transition">
              <v-btn flat slot="activator">Alerts</v-btn>
              <v-card>
                <v-toolbar flat dark color="blue-grey darken-2">
                  <v-btn icon dark @click.native="alertModal = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Alert Settings</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn :loading="savingSettings" flat :disabled="savingSettings" color="green" @click.native="saveAlertSettings">Save</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                  <v-subheader>Alerts</v-subheader>
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox v-model="textAlerts"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Text</v-list-tile-title>
                      <v-list-tile-sub-title>Notify me by text about arb changes</v-list-tile-sub-title>

                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-text-field
                      :disabled="!textAlerts"
                      v-model="phoneNumber"
                      label="Phone Number"
                      type="tel"
                    ></v-text-field>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox v-model="emailAlerts"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Email</v-list-tile-title>
                      <v-list-tile-sub-title>Notify me by email about arb changes</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-text-field
                      :disabled="!emailAlerts"
                      v-model="email"
                      label="Email"
                      type="email"
                    ></v-text-field>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>


                <v-divider></v-divider>


                <v-list three-line subheader>
                  <v-subheader>Active Alerts</v-subheader>
                  <v-list-tile avatar v-for="n in 10" :key="n" >
                    <v-list-tile-content>
                      <v-list-tile-title>Alert {{n}} BTC-MXN +1.5%</v-list-tile-title>
                      <v-list-tile-sub-title>Created 05/20/18 8:32PM @Spread% -2.062 </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-btn flat icon color="red lighten-4">
                          <v-icon large color="red darken-2">close</v-icon>
                      </v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-dialog>
          </v-layout>
          <v-layout row justify-center>
            <v-btn flat  @click="logout">Log Out</v-btn>
          </v-layout>
        </v-list>
      </v-menu>
</template>

<script>
const firebase = require('../config/firebaseInit');

export default {
  data() {
    return {
      alertModal: false,
      firebase,
      textAlerts: false,
      emailAlerts: false,
      phoneNumber: null,
      email: '',
      savingSettings: false,
    };
  },
  methods: {
    logout() {
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
    saveAlertSettings() {
      this.savingSettings = true;
      setTimeout(() => {
        this.savingSettings = false;
        this.alertModal = false;
      }, 3000);
    },
  },
  created() {
    console.log(this.firebase.firebase.auth().currentUser);
    this.email = this.firebase.firebase.auth().currentUser.email;
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
