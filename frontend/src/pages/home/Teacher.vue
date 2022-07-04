<template>
  <div>
    <v-card class="mt-5 mx-5">
      <v-card-title v-text="$t('Home.Teacher.header') + currentUser.name" />
      <v-card-text>
        <custom-table
          :items="classes"
          :search="search"
          :headers="headersClass"
          :header="$t('Home.Teacher.headerClass')"
          @viewClass="viewClass"
          @copy="copy"
        />
        <div v-if="viewClassDetails">
          <header-medium
            class="mt-8"
            :title="$t('Home.Teacher.headerClassSpezific') + selectedClass.name"
          />
          <custom-table
            :items="students"
            :search="search"
            :headers="headersStudent"
            @viewStudent="viewStudent"
          />
        </div>
        <div v-if="viewStudentDetails">
          <header-medium class="mt-8" :title="selectedStudent.name" />
          <v-row class="mt-2">
            <v-col cols="3" sm="3" class="mb-n11">
              <v-select
                :label="$t('TableHeaders.genre')"
                :items="filterGenres"
                v-model="filteredGenre"
              />
            </v-col>
          </v-row>
          <custom-table :items="books" :search="search" :headers="headerBook" />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import moment from 'moment'
import HeaderMedium from '../../components/text/HeaderMedium.vue'
import CustomTable from '../../components/data/CustomTable.vue'
export default {
  name: 'home-teacher',
  components: { HeaderMedium, CustomTable },
  data() {
    return {
      loading: false,
      viewClassDetails: false,
      viewStudentDetails: false,
      search: '',
      classes: [],
      students: [],
      books: [],
      selectedClass: {},
      selectedStudent: {},
      filterGenres: [i18n.t('Filter.all')],
      filteredGenre: i18n.t('Filter.all'),
      headersClass: [
        {
          text: i18n.t('TableHeaders.name'),
          align: 'start',
          value: 'name',
        },
        {
          text: i18n.t('TableHeaders.amountStudents'),
          value: 'studentsID.length',
        },
        {
          text: i18n.t('TableHeaders.classID'),
          value: '_id',
        },
        {
          value: 'actions',
          align: 'end',
          sortable: false,
        },
      ],
      headersStudent: [
        {
          text: i18n.t('TableHeaders.name'),
          align: 'start',
          value: 'name',
        },
        {
          text: i18n.t('TableHeaders.birthdate'),
          value: 'birthdateString',
        },
        {
          text: i18n.t('TableHeaders.amountBooks'),
          value: 'bookID.length',
        },
        {
          value: 'actions',
          align: 'end',
          sortable: false,
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
          value: 'releaseDateString',
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
    this.initEmployees()
    this.initGenre()
  },
  methods: {
    initEmployees() {
      this.loading = true
      this.$store
        .dispatch('data/getClassByEmployee', this.user)
        .then(async (resp) => {
          this.classes = resp
          this.classes.forEach((Class) => {
            Class.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.copyClassID'),
                function: 'copy',
                icon: 'mdi-content-copy',
                key: 'copy',
              },
              {
                disabled: false,
                title: i18n.t('Buttons.viewClass'),
                function: 'viewClass',
                icon: 'mdi-magnify',
                key: 'viewClass',
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
        .then((genres) => {
          genres.forEach((genre) => {
            this.filterGenres.push(genre.name)
          })
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    viewClass(Class) {
      this.loading = true
      this.selectedClass = Class
      this.$store
        .dispatch('data/getStudentsByClass', Class._id)
        .then(async (resp) => {
          this.students = resp
          this.students.forEach((student) => {
            student.birthdateString = moment(String(student.birthdate)).format(
              'DD.MM.YYYY'
            )
            student.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.viewStudent'),
                function: 'viewStudent',
                icon: 'mdi-magnify',
                key: 'viewStudent',
              },
            ]
          })
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
      this.viewClassDetails = true
    },
    viewStudent(student) {
      this.loading = true
      this.selectedStudent = student
      this.$store
        .dispatch('data/getBooksByStudent', student._id)
        .then(async (books) => {
          books.forEach((book) => {
            book.releaseDateString = moment(String(book.releaseDate)).format(
              'DD.MM.YYYY'
            )
            this.books.push(book)
          })
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
      this.viewStudentDetails = true
    },
    copy(Class) {
      console.log(Class)
      this.$store.commit('ui/setNotification', {
        display: true,
        code: i18n.t('ClassPage.copyClassIDMessage'),
        alertClass: 'success',
      })
      navigator.clipboard.writeText(Class._id)
    },
  },
}
</script>
