<template>
  <div>
    <validation-dialog
      :title="$t('BookPage.deleteBook.header')"
      :content="$t('BookPage.deleteBook.content') + ' ' + selectedBook.name"
      :dialog="deleteBookD"
      @close="deleteBookD = false"
      @done="deleteBook"
      :buttons="[$t('Buttons.cancel'), $t('Buttons.delete')]"
    />
    <validation-dialog
      :title="$t('BookPage.deleteGenre.header')"
      :content="$t('BookPage.deleteGenre.content') + ' ' + selectedGenre.name"
      :dialog="deleteGenreD"
      @close="deleteGenreD = false"
      @done="deleteGenre"
      :buttons="[$t('Buttons.cancel'), $t('Buttons.delete')]"
    />
    <add-book-dialog
      v-if="addBookDialog"
      @close="addBookDialog = false"
      @done="bookAdded"
      :dialog="addBookDialog"
      :genres="selectGenre"
    />
    <add-book-dialog
      v-if="editBookD"
      @close="editBookD = false"
      @done="editedBook"
      :dialog="editBookD"
      :selectedBook="selectedBook"
      :genres="selectGenre"
    />
    <add-genre-dialog
      v-if="addGenreDialog"
      @close="addGenreDialog = false"
      @done="genreAdded"
      :dialog="addGenreDialog"
    />
    <add-genre-dialog
      v-if="editGenreD"
      @close="editGenreD = false"
      @done="genreEdited"
      :dialog="editGenreD"
      :selectedGenre="selectedGenre"
    />
    <v-card class="mt-5 mx-5">
      <v-card-title v-text="$t('BookPage.header')" />
      <v-card-text>
        <v-row>
          <v-spacer />
          <v-btn
            v-text="this.$t('Buttons.addGenre')"
            class="mr-2"
            @click="addGenreDialog = true"
          />
        </v-row>
        <custom-table
          :items="genres"
          :search="search"
          :headers="headerGenre"
          @deleteGenre="deleteGenreDialog"
          @editGenre="editGenreDialog"
        />
        <v-row class="mt-6">
          <v-col cols="3" sm="3" class="mb-n11">
            <v-select
              :label="$t('TableHeaders.genre')"
              :items="filterGenres"
              v-model="filteredGenre"
            />
          </v-col>
          <v-spacer />
          <v-btn
            v-text="this.$t('Buttons.addBook')"
            class="mr-2"
            @click="addBookDialog = true"
          />
        </v-row>
        <custom-table
          :items="books"
          :search="search"
          :headers="headerBook"
          @delete="deleteBookDialog"
          @edit="editBookDialog"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'
import addBookDialog from './AddBook.vue'
import addGenreDialog from './AddGenre.vue'
export default {
  name: 'book',
  components: {
    CustomTable,
    addBookDialog,
    addGenreDialog,
    ValidationDialog,
  },
  data() {
    return {
      loading: false,
      addBookDialog: false,
      addGenreDialog: false,
      deleteBookD: false,
      editBookD: false,
      deleteGenreD: false,
      editGenreD: false,
      search: '',
      selectedBook: '',
      selectedGenre: '',
      books: [],
      selectGenre: [],
      genres: [],
      filterGenres: [i18n.t('Filter.all')],
      filteredGenre: i18n.t('Filter.all'),
      headerGenre: [
        {
          text: i18n.t('TableHeaders.genre'),
          align: 'start',
          value: 'name',
        },
        {
          align: 'end',
          value: 'actions',
        },
      ],
      headerBook: [
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
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  created() {
    this.initBooks()
    this.initGenre()
  },
  methods: {
    initBooks() {
      this.loading = true
      this.$store
        .dispatch('data/getAllBooks')
        .then(async (resp) => {
          this.books = resp
          this.books.forEach((book) => {
            book.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.delete'),
                function: 'delete',
                icon: 'mdi-delete',
                key: 'delete',
              },
              {
                disabled: false,
                title: i18n.t('Buttons.edit'),
                function: 'edit',
                icon: 'mdi-pencil',
                key: 'edit',
              },
            ]
          })
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    initGenre() {
      this.loading = true
      this.$store
        .dispatch('data/getAllGenres')
        .then((foundGenre) => {
          this.genres = foundGenre
          foundGenre.forEach((genre) => {
            this.selectGenre.push({ value: genre._id, text: genre.name })
          })
          this.genres.forEach((genre) => {
            this.filterGenres.push(genre.name)
            genre.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.delete'),
                function: 'deleteGenre',
                icon: 'mdi-delete',
                key: 'deleteGenre',
              },
              {
                disabled: false,
                title: i18n.t('Buttons.edit'),
                function: 'editGenre',
                icon: 'mdi-pencil',
                key: 'editGenre',
              },
            ]
          })
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    bookAdded() {
      this.addBookDialog = false
      window.location.reload()
    },
    deleteBookDialog(book) {
      this.deleteBookD = true
      this.selectedBook = book
    },
    deleteBook() {
      this.loading = true
      this.$store
        .dispatch('data/deleteBook', {
          bookID: this.selectedBook._id,
        })
        .then(() => {
          this.loading = false
          this.deleteBookD = false
          window.location.reload()
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    editBookDialog(book) {
      this.editBookD = true
      this.selectedBook = book
    },
    editedBook() {
      this.editBookD = false
      window.location.reload()
    },
    genreAdded() {
      this.addGenreDialog = false
      console.log('GENRE ADDEDEDEDEDEDEERD')
      window.location.reload()
    },
    genreEdited() {
      this.editGenreD = false
      window.location.reload()
    },
    editGenreDialog(genre) {
      this.editGenreD = true
      this.selectedGenre = genre
    },
    deleteGenreDialog(genre) {
      this.deleteGenreD = true
      this.selectedGenre = genre
    },
    deleteGenre() {
      this.loading = true
      this.$store
        .dispatch('data/deleteGenre', {
          genreID: this.selectedGenre._id,
        })
        .then(() => {
          this.loading = false
          this.deleteGenreD = false
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
