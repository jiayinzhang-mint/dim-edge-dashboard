<template>
  <v-app>
    <v-row no-gutters style="height:100vh">
      <v-col cols="9"> </v-col>
      <v-col cols="3">
        <v-row no-gutters justify="start" align="center" style="height:100vh">
          <v-container fluid>
            <div class="headline font-weight-black mb-5">DIMedge</div>
            <v-form>
              <v-text-field
                class="mb-3"
                hide-details
                dense
                outlined
                label="Username"
              ></v-text-field>
              <v-text-field
                class="mb-5"
                dense
                hide-details
                outlined
                type="password"
                label="Password"
              ></v-text-field>
            </v-form>
            <v-btn depressed color="primary" @click="login">Login</v-btn>
          </v-container>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HomeView extends Vue {
  username = '';
  password = '';

  async login() {}
}
</script>

<style scoped></style>
