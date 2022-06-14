<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title v-text="$t('StudentPage.editStudent.header')" />
      <v-card-text>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-form ref="form" data-cy="registerForm">
            <v-container>
              <div>
                <v-row>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ error }"
                      rules="required"
                      :name="$t('Validation.name')"
                    >
                      <v-text-field
                        filles
                        required
                        v-model="editStudent.name"
                        data-cy="registerFirstName"
                        :label="$t('Validation.name')"
                        :error-messages="error"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ error }"
                      rules="required"
                      :name="$t('Validation.birthdate')"
                    >
                      <custom-date-picker
                        v-model="editStudent.birthdate"
                        :label="$t('Validation.birthdate')"
                        :value="editStudent.birthdate"
                        required
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
                      @click="startEditStudent"
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
import CustomDatePicker from '../../components/text/CustomDatePicker.vue'

extend('required', {
  ...required,
  message: i18n.t('Validation.required'),
})

export default {
  name: 'edit-student-dialog',
  components: {
    ValidationObserver,
    ValidationProvider,
    CustomDatePicker,
  },
  data() {
    return {
      loading: false,
      editStudent: {
        name: this.selectedStudent.name,
        birthdate: this.selectedStudent.birthdate,
        _id: this.selectedStudent._id,
      },
    }
  },
  props: {
    dialog: Boolean,
    selectedStudent: Object,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    startEditStudent() {
      this.loading = true
      this.$store
        .dispatch('data/editStudent', this.editStudent)
        .then(() => {
          this.loading = false
          this.$emit('close')
          window.location.reload()
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
