<template>
    <v-slide-y-transition mode="out-in">
        <v-flex xs12 sm6 md3 lg3>
          <v-card class="arbitrageCard" >
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0" style="color: #2e7d32">{{getArbitrage.symbol}} - ${{(getArbitrage.USDPrice.toLocaleString(undefined, { minimumFractionDigits: 3 }))}}</h3>
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
import { mapMutations } from 'vuex';
import moment from 'moment';

export default {
  props: ['arbitrage'],
  data() {
    return {
      MXNArbitrage: null,
      ARSArbitrage: null,
      newArbitrage: null,
      moment,
    };
  },
  methods: {
    ...mapMutations(['setARSRate', 'setMXNRate', 'setAUDRate', 'setBestArb']),
  },
  computed: {
    getArbitrage() {
      return this.newArbitrage;
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
</style>
