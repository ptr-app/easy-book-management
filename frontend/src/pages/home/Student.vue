<template>
  <div>
    <validation-dialog
      :title="$t('Home.Student.returnBook.header')"
      :content="$t('Home.Student.returnBook.content')"
      :dialog="returnBookDialog"
      @close="returnBookDialog = false"
      @done="confirmReturnBook"
      :buttons="[$t('Buttons.cancel'), $t('Buttons.returnBook')]"
    />
    <rent-book-dialog
      v-if="rentBookModal"
      @close="rentBookModal = false"
      @done="rentBook"
      :dialog="rentBookModal"
    />
    <v-card class="mt-5 mx-5">
      <v-card-title v-text="$t('Home.Student.header') + currentUser.name" />
      <v-card-text>
        <v-row>
          <v-spacer />
          <v-btn
            v-text="this.$t('Buttons.rentBook')"
            class="mr-2"
            @click="rentBookModal = true"
          />
        </v-row>
        <custom-table
          :items="books"
          :search="search"
          :headers="header"
          :header="$t('Home.Student.headerBooks')"
          @returnBook="returnBook"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import moment from 'moment'
import HeaderMedium from '../../components/text/HeaderMedium.vue'
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'
import rentBookDialog from './RentBook.vue'
export default {
  name: 'home-student',
  components: { HeaderMedium, CustomTable, ValidationDialog, rentBookDialog },
  data() {
    return {
      loading: false,
      returnBookDialog: false,
      getNewBook: false,
      rentBookDialog: false,
      rentBookModal: false,
      search: '',
      books: [{}],
      selectedBook: {},
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
  },
  methods: {
    initBooks() {
      this.loading = true
      this.$store
        .dispatch('data/getBooksByStudent', this.currentUser._id)
        .then(async (resp) => {
          this.books = resp
          this.books.forEach((book) => {
            book.releaseDate = moment(String(book.releaseDate)).format(
              'DD.MM.YYYY'
            )
            book.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.returnBook'),
                function: 'returnBook',
                icon: 'mdi-clipboard-arrow-left',
                key: 'returnBook',
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
    rentBook() {
      this.rentBookModal = false
      window.location.reload()
    },
    returnBook(book) {
      this.returnBookDialog = true
      this.selectedBook = book
    },
    confirmReturnBook() {
      var rentBookItem = {
        bookID: this.selectedBook._id,
        studentID: this.currentUser._id,
      }
      this.$store
        .dispatch('data/returnBook', rentBookItem)
        .then(() => {
          this.loading = false
          this.returnBookDialog = false
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
