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
      <v-card-text>
        <custom-table
          :items="students"
          :search="search"
          :headers="headers"
          @delete="deleteStudentDialog"
          @edit="editStudentDialog"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'
import editStudentDialog from './EditStudent.vue'
export default {
  name: 'student',
  components: {
    CustomTable,
    editStudentDialog,
    ValidationDialog,
  },
  data() {
    return {
      loading: false,
      deleteStudentD: false,
      editStudentD: false,
      search: '',
      selectedStudent: '',
      students: [],
      headers: [
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
          value: 'birthdate',
        },
        {
          text: i18n.t('TableHeaders.className'),
          value: 'className',
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
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  created() {
    this.initStudents()
  },
  methods: {
    initStudents() {
      this.loading = true
      this.$store
        .dispatch('data/getStudentsBySchool')
        .then(async (resp) => {
          console.log('resp')
          console.log(resp)
          this.students = resp
          this.students.forEach((student) => {
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
            ]
          })
          console.log('Students')
          console.log(this.students)
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
          window.location.reload
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    editStudentDialog(student) {
      this.editStudentD = true
      console.log(student)
      this.selectedStudent = student
    },
    editedStudent() {
      this.editStudentD = false
      window.location.reload
    },
  },
}
</script>
