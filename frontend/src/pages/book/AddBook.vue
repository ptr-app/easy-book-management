<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title
        v-text="
          selectedBook
            ? $t('BookPage.addBook.headerEditBook')
            : $t('BookPage.addBook.headerAddBook')
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
                      :name="$t('Validation.bookName')"
                    >
                      <v-text-field
                        filles
                        required
                        v-model="book.name"
                        data-cy="registerBookName"
                        :label="$t('Validation.bookName')"
                        :error-messages="error"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ error }"
                      rules="required|validateName"
                      :name="$t('Validation.authorName')"
                    >
                      <v-text-field
                        filles
                        required
                        v-model="book.author"
                        data-cy="registerBookName"
                        :label="$t('Validation.authorName')"
                        :error-messages="error"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ error }"
                      :name="$t('Validation.releaseDate')"
                    >
                      <custom-date-picker
                        v-model="book.releaseDate"
                        :label="$t('Validation.releaseDate')"
                        :error-messages="error"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ error }"
                      rules="validateName"
                      :name="$t('Validation.comment')"
                    >
                      <v-text-field
                        filles
                        v-model="book.comment"
                        data-cy="registerBookName"
                        :label="$t('Validation.comment')"
                        :error-messages="error"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ error }"
                      rules="required"
                      :name="$t('Validation.genre')"
                    >
                      <v-select
                        filled
                        required
                        v-model="book.genreID"
                        :label="$t('Validation.genre')"
                        :items="genres"
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
                      @click="$emit('close')"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      :loading="loading"
                      :disabled="invalid"
                      v-text="
                        selectedBook
                          ? $t('Buttons.editBook')
                          : $t('Buttons.addBook')
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
import CustomDatePicker from '../../components/text/CustomDatePicker.vue'

extend('required', {
  ...required,
  message: i18n.t('Validation.required'),
})

extend('validateName', {
  validate: (value) => /(^[a-zA-Z0-9\-.äöüÄÖÜ\s]+)$/.test(value),
  message: i18n.t('Validation.validateName'),
})

export default {
  name: 'add-book-dialog',
  components: {
    ValidationObserver,
    ValidationProvider,
    CustomDatePicker,
  },
  data() {
    return {
      loading: false,
      book: {
        name: '',
        author: '',
        releaseDate: undefined,
        comment: '',
        genreID: '',
      },
    }
  },
  props: {
    dialog: Boolean,
    selectedBook: Object,
    genres: Array,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  created() {
    this.book = this.selectedBook ? this.selectedBook : this.book
  },
  methods: {
    checkMethod() {
      if (this.book.releaseDate === undefined) {
        this.$store.commit('ui/setNotification', {
          display: true,
          code: i18n.t('BookPage.noReleaseDate'),
          alertClass: 'error',
        })
        this.loading = false
        return false
      }
      this.selectedBook ? this.editBook() : this.addBook()
    },
    addBook() {
      this.$store
        .dispatch('data/addBook', this.book)
        .then(() => {
          this.loading = false
          this.$emit('done')
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    editBook() {
      this.$store
        .dispatch('data/editBook', this.book)
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
