<template>
  <div>
    <validation-dialog
      :title="$t('ClassPage.deleteClass.header')"
      :content="$t('ClassPage.deleteClass.content')"
      :dialog="deleteClassD"
      @close="deleteClassD = false"
      @done="deleteClass"
      :buttons="[$t('Buttons.cancel'), $t('Buttons.delete')]"
    />
    <add-class-dialog
      v-if="addClassDialog"
      @close="addClassDialog = false"
      @done="classAdded"
      :dialog="addClassDialog"
    />
    <edit-class-dialog
      v-if="editClassD"
      @close="editClassD = false"
      @done="editedClass"
      :dialog="editClassD"
      :selectedClass="selectedClass"
    />
    <edit-teacher-dialog
      v-if="editTeacherD"
      @close="editTeacherD = false"
      @done="editedTeacher"
      :dialog="editTeacherD"
      :selectedClass="selectedClass"
    />
    <v-card class="mt-5 mx-5">
      <v-card-title v-text="$t('ClassPage.header')" />
      <v-card-text>
        <v-row>
          <v-spacer />
          <v-btn
            v-text="this.$t('Buttons.addClass')"
            class="mr-2"
            @click="addClassDialog = true"
          />
        </v-row>
        <custom-table
          :items="classes"
          :search="search"
          :headers="headers"
          @delete="deleteClassDialog"
          @edit="editClassDialog"
          @editTeacher="editTeacherDialog"
          @copy="copy"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'
import addClassDialog from './AddClass.vue'
import editClassDialog from './EditClass.vue'
import editTeacherDialog from './EditTeacher.vue'
export default {
  name: 'class',
  components: {
    CustomTable,
    addClassDialog,
    editClassDialog,
    editTeacherDialog,
    ValidationDialog,
  },
  data() {
    return {
      loading: false,
      addClassDialog: false,
      deleteClassD: false,
      editClassD: false,
      editTeacherD: false,
      search: '',
      selectedClass: '',
      classes: [],
      headers: [
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
          text: i18n.t('TableHeaders.teacher'),
          value: 'teacherName',
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
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  created() {
    this.initClasses()
  },
  methods: {
    initClasses() {
      this.loading = true
      this.$store
        .dispatch('data/getClassBySchool')
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
                title: i18n.t('Buttons.editTeacher'),
                function: 'editTeacher',
                icon: 'mdi-account-convert',
                key: 'editTeacher',
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
    classAdded() {
      this.addClassDialog = false
      window.location.reload()
    },
    deleteClassDialog(Class) {
      this.deleteClassD = true
      this.selectedClass = Class
    },
    deleteClass() {
      this.loading = true
      this.$store
        .dispatch('data/deleteClass', {
          classID: this.selectedClass._id,
        })
        .then(() => {
          this.loading = false
          this.deleteClassD = false
          window.location.reload()
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    editClassDialog(Class) {
      this.editClassD = true
      this.selectedClass = Class
    },
    editedClass() {
      this.editClassD = false
      window.location.reload()
    },
    editTeacherDialog(Class) {
      this.editTeacherD = true
      this.selectedClass = Class
    },
    editedTeacher() {
      this.editTeacherD = false
      window.location.reload()
    },
    copy(Class) {
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
