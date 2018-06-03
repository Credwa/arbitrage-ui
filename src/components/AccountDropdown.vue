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
                      <v-checkbox v-model="emailAlerts" disabled></v-checkbox>
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
                  <v-list-tile avatar v-for="(alert,index) in getUserAlerts" :key="index" >
                    <v-list-tile-content>
                      <v-list-tile-title>Alert @ {{alert.exchange}} reaches <span :style="alert.spreadPercChange > 0 ? 'color:purple' : 'color:orange'">{{alert.spreadPercChange}}%</span></v-list-tile-title>
                      <v-list-tile-sub-title>Created {{moment(alert.createdAt).format('MM/DD/YY HH:mm')}} @ Spread <span :style="alert.spreadPercAtCreation > 0 ? 'color: green' : 'color:red'">{{alert.spreadPercAtCreation.toLocaleString(undefined, { minimumFractionDigits: 3 })}}%</span>
                    </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-btn flat icon color="red lighten-4" @click="deleteAlert(alert.exchange)">
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
import { mapMutations, mapGetters } from 'vuex';
import moment from 'moment';

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
      moment,
    };
  },
  methods: {
    ...mapMutations(['deleteUserAlert', 'changeAllowAlertCreation']),
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
    deleteAlert(exchange) {
      firebase.db
        .collection('users')
        .doc(this.getCurrentUser.uid)
        .collection('active-alerts')
        .doc(exchange)
        .delete()
        .then(() => {
          this.deleteUserAlert(exchange);
        });
    },
    saveAlertSettings() {
      this.savingSettings = true;
      if (
        this.getCurrentUser.phoneNumber !== this.phoneNumber ||
        this.textAlerts !== this.getCurrentUser.receiveTextAlerts
      ) {
        firebase.db
          .collection('users')
          .doc(this.getCurrentUser.uid)
          .update({
            phoneNumber: this.phoneNumber,
            receiveTextAlerts: this.textAlerts,
            alerts: {
              text: {
                receive: this.textAlerts,
                number: this.phoneNumber,
                verified: false,
              },
            },
          })
          .then(() => {
            this.savingSettings = false;
            this.alertModal = false;
          });
      } else {
        this.savingSettings = false;
        this.alertModal = false;
      }
    },
  },
  computed: {
    ...mapGetters(['getUserAlerts', 'getCurrentUser']),
  },
  created() {
    console.log(this.firebase.firebase.auth().currentUser);
    this.email = this.firebase.firebase.auth().currentUser.email;
    setTimeout(() => {
      if (this.getCurrentUser) {
        if ('alerts' in this.getCurrentUser) {
          if ('text' in this.getCurrentUser.alerts) {
            if ('number' in this.getCurrentUser.alerts.text) {
              this.changeAllowAlertCreation();
              this.phoneNumber = this.getCurrentUser.alerts.text.number;
            }
            if ('receive' in this.getCurrentUser.alerts.text) {
              this.textAlerts = this.getCurrentUser.alerts.text.receive;
            }
          }
        }
      }
    }, 1000);
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
