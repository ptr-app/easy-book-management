<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title v-text="$t('ClassPage.editClass.header')" />
      <v-card-text>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-form ref="form" data-cy="registerForm">
            <v-container>
              <div>
                <v-row>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required|validateName"
                      :name="$t('Validation.className')"
                    >
                      <v-text-field
                        filles
                        required
                        v-model="editClass.name"
                        data-cy="registerClassName"
                        :label="$t('Validation.className')"
                        :error-messages="errors"
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
                      @click="$emit('close')"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      :loading="loading"
                      :disabled="invalid"
                      v-text="$t('Buttons.save')"
                      @click="startEditClass"
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
  validate: (value) => /(^[a-zA-Z0-9\-.äöüÄÖÜ\s]+)$/.test(value),
  message: i18n.t('Validation.validateName'),
})

export default {
  name: 'edit-class-dialog',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      loading: false,
      editClass: {
        name: this.selectedClass.name,
        _id: this.selectedClass._id,
      },
    }
  },
  props: {
    dialog: Boolean,
    selectedClass: Object,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    startEditClass() {
      this.loading = true
      this.$store
        .dispatch('data/editClass', this.editClass)
        .then(() => {
          this.loading = false
          this.$emit('done')
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
