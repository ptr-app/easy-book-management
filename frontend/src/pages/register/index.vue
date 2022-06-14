<template>
  <div>
    <v-row align="center" justify="center">
      <v-card class="elevation-12 mt-10 mb-10">
        <v-card-title v-text="$t('RegisterPage.header')" />
        <v-card-text>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form ref="form" data-cy="registerForm">
              <v-container>
                <header-medium :title="$t('RegisterPage.generall')" />
                <div>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        rules="required|validateName"
                        :name="$t('Validation.loginName')"
                      >
                        <v-text-field
                          filles
                          required
                          v-model="user.loginName"
                          data-cy="registerLoginName"
                          :label="$t('Validation.loginName')"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        rules="required|validateName"
                        :name="$t('Validation.name')"
                      >
                        <v-text-field
                          filles
                          required
                          v-model="user.name"
                          data-cy="registerFirstName"
                          :label="$t('Validation.name')"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        rules="required|validateName"
                        :name="$t('Validation.birthdate')"
                      >
                        <custom-date-picker
                          v-model="user.birthdate"
                          :label="$t('Validation.birthdate')"
                          required
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        rules="required"
                        :name="$t('Validation.type')"
                      >
                        <v-select
                          filled
                          required
                          v-model="type"
                          :label="$t('Validation.type')"
                          :items="types"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        rules="required|validatePassword"
                        :name="$t('Validation.password')"
                      >
                        <v-text-field
                          filles
                          required
                          v-model="user.password"
                          data-cy="registerPassword"
                          :label="$t('Validation.password')"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        rules="required|validatePassword"
                        :name="$t('Validation.confirmPassword')"
                      >
                        <v-text-field
                          filles
                          required
                          v-model="user.confirmPassword"
                          data-cy="registerPassword"
                          :label="$t('Validation.confirmPassword')"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                </div>
                <header-medium
                  :title="$t('RegisterPage.typeSpecific')"
                  class="mb-3"
                />
                <div v-if="type === 'student'">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        :name="$t('Validation.classID')"
                      >
                        <v-text-field
                          filles
                          v-model="user.classID"
                          data-cy="registerClassID"
                          :label="$t('Validation.classID')"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                </div>
                <div v-if="type === 'employee'">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        :name="$t('Validation.role')"
                      >
                        <v-select
                          filled
                          v-model="user.roleName"
                          :label="$t('Validation.role')"
                          :items="roles"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        :name="$t('Validation.schoolID')"
                      >
                        <v-text-field
                          filled
                          v-model="user.schoolID"
                          data-cy="registerSchoolID"
                          :label="$t('Validation.schoolID')"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                </div>
                <div v-if="type === 'school'">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <validation-provider
                        v-slot="{ error }"
                        :name="$t('Validation.schoolName')"
                      >
                        <v-text-field
                          filles
                          v-model="user.schoolName"
                          data-cy="registerSchoolName"
                          :label="$t('Validation.schoolName')"
                          :error-messages="error"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                </div>
                <div class="mt-6">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-btn
                        :loading="loading"
                        v-text="$t('Buttons.cancel')"
                        @click="cancel"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn
                        :loading="loading"
                        v-text="$t('Buttons.register')"
                        @click="register"
                      />
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import i18n from '@/i18n'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import HeaderMedium from '../../components/text/HeaderMedium.vue'
import CustomDatePicker from '../../components/text/CustomDatePicker.vue'

extend('required', {
  ...required,
  message: i18n.t('Validation.required'),
})

extend('validateName', {
  validate: (value) => /(^[a-zA-Z\-.\s]+)$/.test(value),
  message: i18n.t('Validation.validateName'),
})

extend('validatePassword', {
  validate: (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=[!@#$%^])[A-za-z\d!@#$%^]{8,}$/.test(
      value
    ),
  message: i18n.t('Validation.validatePassword'),
})

export default {
  name: 'Register',
  title: i18n.t('RegisterPage.header'),
  components: {
    ValidationObserver,
    ValidationProvider,
    HeaderMedium,
    CustomDatePicker,
  },
  data() {
    return {
      loading: false,
      type: '',
      user: {
        loginName: '',
        name: '',
        birthdate: '',
        password: '',
        confirmPassword: '',
        schoolName: '',
        roleName: '',
      },
      types: [
        {
          value: 'employee',
          text: i18n.t('TabHeader.employees'),
        },
        {
          value: 'student',
          text: i18n.t('TabHeader.students'),
        },
        {
          value: 'school',
          text: i18n.t('TabHeader.school'),
        },
      ],
      roles: [
        {
          value: 'teacher',
          text: i18n.t('RegisterPage.teacherRole'),
        },
        {
          value: 'dean',
          text: i18n.t('RegisterPage.deanRole'),
        },
      ],
    }
  },
  methods: {
    cancel() {
      this.$router.push('/home')
    },
    register() {
      this.loading = true
      if (this.user.password !== this.user.confirmPassword) {
        this.$emit('done')
        this.loading = false
        return false
      }
      delete this.user.confirmPassword

      if (this.type === 'student') {
        this.$store
          .dispatch('auth/registerStudent', this.user)
          .then((resp) => {
            this.loading = false
            this.$router.push('/home')
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      } else if (this.type === 'employee') {
        this.$store
          .dispatch('auth/registerEmployee', this.user)
          .then(() => {
            this.loading = false
            this.$router.push('/home')
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      } else if (this.type === 'school') {
        this.$store
          .dispatch('auth/registerSchool', this.user)
          .then(() => {
            this.loading = false
            this.$router.push('/home')
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      }
    },
  },
}
</script>
