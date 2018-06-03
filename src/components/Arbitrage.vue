<template>
    <v-slide-y-transition mode="out-in">
        <v-flex xs12 sm6 md3 lg3>
          <v-card class="arbitrageCard" >
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0" style="color: #2e7d32">{{getArbitrage.symbol}} - ${{(getArbitrage.USDPrice.toLocaleString(undefined, { minimumFractionDigits: 3 }))}}</h3>
              </div>
              <div class="create-alert-button">
                <v-btn  v-if="!alertStatus" slot="activator" flat icon color="red lighten-2" @click="alertMenu = !alertMenu">
                    <v-icon small color="red lighten-1">visibility_off</v-icon>
                </v-btn>
                <v-btn  slot="activator" flat icon color="blue lighten-2" v-if="alertStatus" @click="alertMenu = !alertMenu">
                  <v-icon small color="blue lighten-1">visibility</v-icon>
                </v-btn>
                <v-dialog v-model="alertMenu" max-width="350">
                  <v-card>
                    <v-card-title>
                      <h4>
                        <span v-if="!alertStatus">Create</span><span v-if="alertStatus">Edit</span> alert for {{getArbitrage.symbol}}-{{getArbitrage.foreignCurrency | shortenCurrencyName}}
                      </h4>
                    </v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="spreadPercChange"
                        type="number"
                        step="0.1"
                        label="Spread Percentage %"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn v-if="!alertStatus" color="primary" flat @click.stop="createAlert">Create</v-btn>
                      <v-btn v-if="alertStatus" color="primary" flat @click.stop="createAlert">Edit</v-btn>
                      <v-btn v-if="alertStatus" color="orange" flat @click.stop="deleteAlert">Delete</v-btn>
                      <v-btn color="red" flat @click.stop="alertMenu=false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text ref="arbCard">
                <div class="arbitrageData">
                  <p>Spread: <span :style="getArbitrage.spread > 0 ? 'color:#2e7d32' : 'color:#e53935'">${{(getArbitrage.spread.toLocaleString(undefined, { minimumFractionDigits: 3 }))}}</span></p>

                  <p>Spread Percentage: <span :style="getArbitrage.spreadPercentage > 0 ? 'color:#ab47bc' : 'color:#e53935'">{{(getArbitrage.spreadPercentage.toLocaleString(undefined, { minimumFractionDigits: 3 }))}}%</span></p>
                  <p>Face Value {{getArbitrage.foreignCurrency | shortenCurrencyName}}: <span style="color: #0d47a1">₱{{(getArbitrage.priceInForeignCurrency.toLocaleString(undefined, { minimumFractionDigits: 3 }))}}</span></p>

                  <p>Foreign Exchange Value: <span style="color: #0d47a1">₱{{(getArbitrage.foreignExchangePrice.toLocaleString(undefined, { minimumFractionDigits: 3 }))}}</span></p>

                  <p>Foreign Exchange Value In USD: <span style="color: #2e7d32">${{(getArbitrage.foreignExchangePriceUSD.toLocaleString(undefined, { minimumFractionDigits: 3 }))}}</span></p>

                </div>
            </v-card-text>
            <v-card-actions>
              <span class="text-xs-right caption">Last Updated: <span style="color:#64b5f6">{{moment(getArbitrage.time).format('MM-DD hh:mm A')}}</span></span>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-slide-y-transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import moment from 'moment';

const db = require('../config/firebaseInit').db;

export default {
  props: ['arbitrage'],
  data() {
    return {
      MXNArbitrage: null,
      ARSArbitrage: null,
      newArbitrage: null,
      alertMenu: false,
      userAlert: null,
      spreadPercChange: 0,
      alertExists: null,
      exchange: null,
      moment,
    };
  },
  methods: {
    ...mapMutations([
      'setARSRate',
      'setMXNRate',
      'setAUDRate',
      'setBestArb',
      'setUserAlert',
      'deleteUserAlert',
    ]),
    createAlert() {
      if (this.spreadPercChange !== 0) {
        const alert = {
          exchange: this.getExchange,
          spreadPercChange: Number(this.spreadPercChange),
          spreadPercAtCreation: this.getArbitrage.spreadPercentage,
          spreadAtCreation: this.getArbitrage.spread,
          foreignExchangePriceUSDAtCreation: this.getArbitrage
            .foreignExchangePriceUSD,
          USDPriceAtCreation: this.getArbitrage.USDPrice,
          foreignExchangePriceAtCreation: this.getArbitrage
            .foreignExchangePrice,
          priceInForeignCurrencyAtCreation: this.getArbitrage
            .priceInForeignCurrency,
          createdAt: new Date(),
        };
        db
          .collection('users')
          .doc(this.getCurrentUser.uid)
          .collection('active-alerts')
          .doc(alert.exchange)
          .set(alert)
          .then(() => {
            this.alertMenu = false;
            this.setUserAlert(alert);
          });
      }
    },
    deleteAlert() {
      db
        .collection('users')
        .doc(this.getCurrentUser.uid)
        .collection('active-alerts')
        .doc(this.getExchange)
        .delete()
        .then(() => {
          this.deleteUserAlert(this.getExchange);
          this.alertMenu = false;
        });
    },
  },
  computed: {
    ...mapGetters(['getUserAlerts', 'getCurrentUser']),
    getArbitrage() {
      return this.newArbitrage;
    },
    getExchange() {
      // format exchange to symbol-foreignexchange
      return `${
        this.getArbitrage.symbol
      }-${this.$options.filters.shortenCurrencyName(
        this.getArbitrage.foreignCurrency,
      )}`;
    },
    alertStatus: {
      get: function () {
        const userAlert = this.getUserAlerts.find(
          val => val.exchange === this.getExchange,
        );
        this.spreadPercChange = userAlert ? userAlert.spreadPercChange : 0;
        this.userAlert = userAlert;
        return Boolean(userAlert);
      },
    },
    getAlertStatus() {
      return Boolean(
        this.getUserAlerts.find(val => val.exchange === this.getExchange),
      );
    },
  },
  filters: {
    shortenCurrencyName(value) {
      if (value === 'Mexican Pesos') {
        return 'MXN';
      } else if (value === 'Argentine Pesos') {
        return 'ARS';
      }
      return 'AUD';
    },
  },
  created() {
    const self = this;
    this.newArbitrage = this.arbitrage;
    this.$options.sockets.newArbitrage = (data) => {
      this.setBestArb(data);
      if (data.foreignCurrency === 'Argentine Pesos') {
        this.setARSRate(data.exchangeRate);
      } else if (data.foreignCurrency === 'Austrailian Dollars') {
        this.setAUDRate(data.exchangeRate);
      } else if (data.foreignCurrency === 'Mexican Pesos') {
        this.setMXNRate(data.exchangeRate);
      }

      if (
        self.newArbitrage.symbol === data.symbol &&
        self.newArbitrage.foreignCurrency === data.foreignCurrency
      ) {
        self.newArbitrage = data;
        this.$refs.arbCard.className = 'card__text newArb';
        setTimeout(() => {
          this.$refs.arbCard.className = 'card__text';
        }, 1000);
      }
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arbitrageData {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.arbitrageCard {
  min-height: 50vh;
  max-height: 50vh;
  width: 100%;
  min-width: 20vw;
}

.newArb {
  animation-name: example;
  animation-duration: 1s;
}

@keyframes example {
  from {
    font-size: 1em;
  }
  to {
    color: grey;
    background-color: #e3f2fd;
    font-size: 1.05em;
  }
}

.create-alert-button {
  position: absolute;
  left: 80%;
}
</style>
