<template>
  <div>
    <validation-dialog
      :title="$t('StudentPage.deleteStudent.header')"
      :content="$t('StudentPage.deleteStudent.content')"
      :dialog="deleteStudentD"
      @close="deleteStudentD = false"
      @done="deleteStudent"
      :buttons="[$t('Buttons.cancel'), $t('Buttons.delete')]"
    />
    <edit-student-dialog
      v-if="editStudentD"
      @close="editStudentD = false"
      @done="editedStudent"
      :dialog="editStudentD"
      :selectedStudent="selectedStudent"
    />
    <v-card class="mt-5 mx-5">
      <v-card-title v-text="$t('StudentPage.header')" />
      <v-col cols="3" sm="3" class="mb-n11">
        <v-select
          :label="$t('TableHeaders.class')"
          :items="classes"
          v-model="filteredClass"
        />
      </v-col>
      <v-card-text>
        <custom-table
          :items="students"
          :search="search"
          :headers="headerStudent"
          @delete="deleteStudentDialog"
          @edit="editStudentDialog"
          @viewStudent="viewStudent"
        />
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
          <custom-table
            :items="books"
            :search="searchStudent"
            :headers="headerBook"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import moment from 'moment'
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'
import HeaderMedium from '../../components/text/HeaderMedium.vue'
import editStudentDialog from './EditStudent.vue'
export default {
  name: 'student',
  components: {
    CustomTable,
    editStudentDialog,
    ValidationDialog,
    HeaderMedium,
  },
  data() {
    return {
      loading: false,
      deleteStudentD: false,
      editStudentD: false,
      viewStudentDetails: false,
      search: '',
      searchStudent: '',
      selectedStudent: '',
      students: [],
      books: [],
      classes: [i18n.t('Filter.all')],
      filteredClass: i18n.t('Filter.all'),
      filterGenres: [i18n.t('Filter.all')],
      filteredGenre: i18n.t('Filter.all'),
      headerStudent: [
        {
          text: i18n.t('TableHeaders.name'),
          align: 'start',
          value: 'name',
        },
        {
          text: i18n.t('TableHeaders.amountBooks'),
          value: 'bookID.length',
        },
        {
          text: i18n.t('TableHeaders.birthdate'),
          value: 'birthdateString',
        },
        {
          text: i18n.t('TableHeaders.className'),
          value: 'className',
          filter: (value) => {
            if (this.filteredClass === i18n.t('Filter.all')) return true
            return this.filteredClass === value
          },
        },
        {
          text: i18n.t('TableHeaders.schoolName'),
          value: 'schoolName',
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
    this.initStudents()
    this.initClasses()
    this.initGenre()
  },
  methods: {
    initStudents() {
      this.loading = true
      this.$store
        .dispatch('data/getStudentsBySchool')
        .then(async (resp) => {
          this.students = resp
          this.students.forEach((student) => {
            student.birthdateString = moment(String(student.birthdate)).format(
              'DD.MM.YYYY'
            )
            student.dropdownItems = [
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
    },
    initClasses() {
      this.loading = true
      this.$store
        .dispatch('data/getClassBySchool')
        .then(async (resp) => {
          resp.forEach((Class) => {
            this.classes.push(Class.name)
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
    deleteStudentDialog(student) {
      this.deleteStudentD = true
      this.selectedStudent = student
    },
    deleteStudent() {
      this.loading = true
      this.$store
        .dispatch('data/deleteStudent', {
          studentID: this.selectedStudent._id,
        })
        .then(() => {
          this.loading = false
          this.deleteStudentD = false
          window.location.reload()
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    editStudentDialog(student) {
      this.editStudentD = true
      this.selectedStudent = student
    },
    editedStudent() {
      this.editStudentD = false
      window.location.reload()
    },
    viewStudent(student) {
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
  },
}
</script>
