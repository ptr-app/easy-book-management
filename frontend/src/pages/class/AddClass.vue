<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title v-text="$t('ClassPage.addClass.header')" />
      <v-card-text>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-form ref="form" data-cy="registerForm">
            <v-container>
              <div>
                <v-row>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ error }"
                      rules="required|validateName"
                      :name="$t('Validation.className')"
                    >
                      <v-text-field
                        filles
                        required
                        v-model="newClass.name"
                        data-cy="registerClassName"
                        :label="$t('Validation.className')"
                        :error-messages="error"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ error }"
                      :name="$t('Validation.employeeID')"
                    >
                      <v-text-field
                        filles
                        v-model="newClass.employeeID"
                        data-cy="registerEmployeeID"
                        :label="$t('Validation.employeeID')"
                        :error-messages="error"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
              </div>
              <div class="mt-6 mr-4 ml-n3">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn
                      :loading="loading"
                      v-text="$t('Buttons.cancel')"
                      @click=";(dialog = false), $emit('close')"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      :loading="loading"
                      :disabled="invalid"
                      v-text="$t('Buttons.addClass')"
                      @click="addClass"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import i18n from '@/i18n'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: i18n.t('Validation.required'),
})

extend('validateName', {
  validate: (value) => /(^[a-zA-Z0-9\-.\s]+)$/.test(value),
  message: i18n.t('Validation.validateName'),
})

export default {
  name: 'add-user-dialog',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      loading: false,
      newClass: {
        name: '',
        employeeID: '',
      },
    }
  },
  props: {
    dialog: Boolean,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  created() {},
  methods: {
    addClass() {
      this.$store
        .dispatch('data/addClass', this.newClass)
        .then(() => {
          this.loading = false
          this.$router.push('/home')
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
