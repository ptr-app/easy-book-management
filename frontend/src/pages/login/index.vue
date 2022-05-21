<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-spacer />
                <v-toolbar-title v-text="$t('LoginPage.header')" />
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="user.username"
                  />
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="user.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :loading="loading"
                  color="primary"
                  @click="login"
                  v-text="$t('LoginPage.login')"
                />
                <v-spacer />
              </v-card-actions>
              <v-row class="mt-n1">
                <v-spacer />
                <a
                  href="/register"
                  target="_self"
                  v-text="$t('LoginPage.register')"
                />
                <v-spacer />
              </v-row>
              <v-row class="pb-5">
                <v-spacer />
                <a
                  href="/passwordForgotten"
                  target="_self"
                  v-text="$t('LoginPage.passwordForgotten')"
                />
                <v-spacer />
              </v-row>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import i18n from '@/i18n'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store
        .dispatch('auth/login', this.user)
        .then(async () => {
          this.$router.push('/home').catch((err) => {
            this.loading = false
            console.log(err)
          })
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
