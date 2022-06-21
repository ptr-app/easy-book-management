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
                </v-row>
              </div>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import i18n from '@/i18n'
import moment from 'moment'
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'

export default {
  name: 'rent-book-dialog',
  components: {
    CustomTable,
    ValidationDialog,
  },
  data() {
    return {
      loading: false,
      rentBookDialog: false,
      search: '',
      books: [],
      selectedBook: {},
      genres: [i18n.t('Filter.all')],
      filteredGenre: i18n.t('Filter.all'),
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
          value: 'releaseDateString',
          align: 'center',
        },
        {
          text: i18n.t('TableHeaders.comment'),
          value: 'comment',
        },
        {
          text: i18n.t('TableHeaders.genre'),
          value: 'genreName',
          filter: (value) => {
            if (this.filteredGenre === i18n.t('Filter.all')) return true
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
          resp.forEach((book) => {
            book.releaseDateString = moment(String(book.releaseDate)).format(
              'DD.MM.YYYY'
            )
            book.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.rentBook'),
                function: 'rentBook',
                icon: 'mdi-arrow-right',
                key: 'rentBook',
              },
            ]
            if (!book.rented) {
              this.books.push(book)
            }
          })
          console.log(this.books)
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
