<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title
        v-text="
          selectedGenre
            ? $t('BookPage.addGenre.headerEditGenre')
            : $t('BookPage.addGenre.headerAddGenre')
        "
      />
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
                      :name="$t('Validation.genre')"
                    >
                      <v-text-field
                        filles
                        required
                        v-model="genre.name"
                        data-cy="registerBookName"
                        :label="$t('Validation.genre')"
                        :error-messages="error"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
              </div>
              <div Book="mt-6 mr-4 ml-n3">
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
                      v-text="
                        selectedGenre
                          ? $t('Buttons.editGenre')
                          : $t('Buttons.addGenre')
                      "
                      @click="checkMethod"
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
  name: 'add-genre-dialog',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      loading: false,
      genre: {
        name: '',
      },
    }
  },
  props: {
    dialog: Boolean,
    selectedGenre: Object,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  created() {
    this.genre = this.selectedGenre ? this.selectedGenre : this.genre
  },
  methods: {
    checkMethod() {
      this.selectedGenre ? this.editGenre() : this.addGenre()
    },
    addGenre() {
      this.$store
        .dispatch('data/addGenre', this.genre)
        .then(() => {
          this.loading = false
          this.$emit('done')
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    editGenre() {
      this.$store
        .dispatch('data/editGenre', this.genre)
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
