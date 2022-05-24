<template>
  <div>
    <v-card class="mt-5 mx-5">
      <v-card-title v-text="$t('Home.Student.header') + currentUser.name" />
      <v-card-text>
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
import HeaderMedium from '../../components/text/HeaderMedium.vue'
import CustomTable from '../../components/data/CustomTable.vue'
export default {
  name: 'home-student',
  components: { HeaderMedium, CustomTable },
  data() {
    return {
      loading: false,
      returnBookDialog: false,
      getNewBook: false,
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
    returnBook(book) {
      this.returnBookDialog = true
      this.returnBook = book
    },
  },
}
</script>
