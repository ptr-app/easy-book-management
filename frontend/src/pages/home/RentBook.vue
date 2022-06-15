<template>
  <div>
    <validation-dialog
      :title="$t('Home.Student.rentBook.header')"
      :content="$t('Home.Student.rentBook.content')"
      :dialog="rentBookDialog"
      @close="rentBookDialog = false"
      @done="confirmRentBook"
      :buttons="[$t('Buttons.cancel'), $t('Buttons.rentBook')]"
    />
    <v-dialog v-model="dialog" persistent width="1000">
      <v-card>
        <v-card-title v-text="$t('Home.Student.rentBook.header')" />
        <v-card-text>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form ref="form" data-cy="registerForm">
              <v-container>
                <v-col cols="3" sm="3">
                  <v-select
                    :label="$t('TableHeaders.genre')"
                    :items="genres"
                    v-model="filteredGenre"
                  />
                </v-col>
                <div class="mt-n10">
                  <custom-table
                    :items="books"
                    :search="search"
                    :headers="header"
                    :filters="filters"
                    @rentBook="rentBook"
                  />
                </div>
                <div class="mt-6 mr-4 ml-n3">
                  <v-row>
                    <v-btn
                      :loading="loading"
                      v-text="$t('Buttons.cancel')"
                      @click=";(rentBookDialog = false), $emit('close')"
                      class="ml-6"
                    />
                    <v-spacer />
                    <v-btn
                      :loading="loading"
                      :disabled="invalid"
                      v-text="$t('Buttons.rentBook')"
                      @click="rentBook"
                    />
                  </v-row>
                </div>
              </v-container>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import i18n from '@/i18n'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'

extend('required', {
  ...required,
  message: i18n.t('Validation.required'),
})

extend('validateName', {
  validate: (value) => /(^[a-zA-Z0-9\-.\s]+)$/.test(value),
  message: i18n.t('Validation.validateName'),
})

export default {
  name: 'rent-book-dialog',
  components: {
    ValidationObserver,
    ValidationProvider,
    CustomTable,
    ValidationDialog,
  },
  data() {
    return {
      loading: false,
      rentBookDialog: false,
      search: '',
      books: [{}],
      selectedBook: {},
      genres: ['all'],
      filteredGenre: 'all',
      header: [
        {
          text: i18n.t('TableHeaders.name'),
          align: 'start',
          value: 'name',
        },
        {
          text: i18n.t('TableHeaders.author'),
          value: 'author',
        },
        {
          text: i18n.t('TableHeaders.releaseDate'),
          value: 'releaseDate',
        },
        {
          text: i18n.t('TableHeaders.comment'),
          value: 'comment',
        },
        {
          text: i18n.t('TableHeaders.genre'),
          value: 'genreName',
          filter: (value) => {
            if (this.filteredGenre === 'all') return true
            return this.filteredGenre === value
          },
        },
        {
          value: 'actions',
          align: 'end',
          sortable: false,
        },
      ],
      filters: [
        {
          label: "$t('TableHeaders.genre')",
          items: 'genres',
          model: 'filteredGenre',
        },
      ],
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
  created() {
    this.initializeBooks()
    this.initializeGenres()
  },
  methods: {
    initializeBooks() {
      this.loading = true
      this.$store
        .dispatch('data/getAllBooks')
        .then((resp) => {
          this.loading = false
          this.books = resp
          this.books.forEach((book) => {
            book.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.rentBook'),
                function: 'rentBook',
                icon: 'mdi-arrow-right',
                key: 'rentBook',
              },
            ]
          })
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    initializeGenres() {
      this.loading = true
      this.$store
        .dispatch('data/getAllGenres')
        .then((resp) => {
          this.loading = false
          resp.forEach((genre) => {
            this.genres.push(genre.name)
          })
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    rentBook(book) {
      this.selectedBook = book
      this.rentBookDialog = true
    },
    confirmRentBook() {
      var book = this.selectedBook
      var rentBookItem = {
        bookID: book._id,
        studentID: this.currentUser._id,
      }
      console.log('RENT BOOK')
      console.log(rentBookItem)
      this.$store
        .dispatch('data/rentBook', rentBookItem)
        .then(() => {
          this.loading = false
          this.$emit('done', this.rentedBook)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
