<template>
  <div>
    <validation-dialog
      :title="$t('ClassPage.editTeacher.header')"
      :content="$t('ClassPage.editTeacher.content')"
      :dialog="selectTeacherDialog"
      @close="selectTeacherDialog = false"
      @done="editTeacher"
      :buttons="[$t('Buttons.cancel'), $t('Buttons.assignTeacher')]"
    />
    <v-dialog v-model="dialog" persistent width="1000">
      <v-card>
        <v-card-title v-text="$t('ClassPage.editTeacher.header')" />
        <v-card-text>
          <v-form ref="form" data-cy="registerForm">
            <v-container>
              <div>
                <custom-table
                  :items="teachers"
                  :search="search"
                  :headers="headers"
                  @editTeacher="newTeacher"
                />
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
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'

export default {
  name: 'edit-teacher-dialog',
  components: {
    CustomTable,
    ValidationDialog,
  },
  data() {
    return {
      loading: false,
      selectedTeacher: {},
      selectTeacherDialog: false,
      search: '',
      teachers: [],
      headers: [
        {
          text: i18n.t('TableHeaders.name'),
          align: 'start',
          value: 'name',
        },
        {
          value: 'actions',
          align: 'end',
          sortable: false,
        },
      ],
    }
  },
  props: {
    dialog: Boolean,
    selectedClass: Object,
  },
  created() {
    this.initializeRoles()
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    initializeRoles() {
      this.loading = true
      this.$store
        .dispatch('data/getEmployeeByRole', 'teacher')
        .then((resp) => {
          resp.forEach((teacher) => {
            teacher.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.assignTeacher'),
                function: 'editTeacher',
                icon: 'mdi-arrow-right',
                key: 'editTeacher',
              },
            ]
            this.teachers.push(teacher)
          })
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    newTeacher(teacher) {
      this.selectedTeacher = teacher
      this.selectTeacherDialog = true
    },
    editTeacher() {
      var teacher = this.selectedTeacher
      this.$store
        .dispatch('data/updateEmployeeID', {
          newEmployeeID: teacher._id,
          oldEmployeeID: this.selectedClass.employeeID,
          classID: this.selectedClass._id,
        })
        .then(() => {
          this.loading = false
          this.$emit('done', this.selectedTeacher)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
