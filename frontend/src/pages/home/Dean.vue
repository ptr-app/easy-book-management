<template>
  <div>
    <validation-dialog
      :title="$t('Home.Dean.deleteEmployee.header')"
      :content="$t('Home.Dean.deleteEmployee.content')"
      :dialog="deleteEmployeeDialog"
      @close="deleteEmployeeDialog = false"
      @done="deleteEmployee"
      :buttons="[$t('Buttons.cancel'), $t('Buttons.delete')]"
    />
    <v-card class="mt-5 mx-5">
      <v-card-title v-text="$t('Home.Dean.header') + currentUser.name" />
      <v-card-text>
        <v-row>
          <v-col cols="3" sm="3">
            <v-select
              :label="$t('TableHeaders.role')"
              :items="roles"
              v-model="filteredRole"
            />
          </v-col>
          <v-col cols="3" sm="3">
            <v-select
              :label="$t('TableHeaders.class')"
              :items="classes"
              v-model="filteredClass"
            />
          </v-col>
        </v-row>
        <custom-table
          :items="employees"
          :search="search"
          :headers="headers"
          :header="$t('Home.Dean.headerTeacher')"
          @delete="deleteEmployeeD"
          @copy="copy"
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
export default {
  name: 'home-dean',
  components: { HeaderMedium, CustomTable, ValidationDialog },
  data() {
    return {
      loading: false,
      deleteEmployeeDialog: false,
      search: '',
      employees: [{}],
      selectedEmployee: {},
      filteredRole: i18n.t('Filter.all'),
      roles: [i18n.t('Filter.all')],
      filteredClass: i18n.t('Filter.all'),
      classes: [i18n.t('Filter.all')],
      headers: [
        {
          text: i18n.t('TableHeaders.name'),
          align: 'start',
          value: 'name',
        },
        {
          text: i18n.t('TableHeaders.role'),
          value: 'roleName',
          filter: (value) => {
            if (this.filteredRole === i18n.t('Filter.all')) return true
            return this.filteredRole === value
          },
        },
        {
          text: i18n.t('TableHeaders.class'),
          value: 'className',
          filter: (value) => {
            if (this.filteredClass === i18n.t('Filter.all')) return true
            return value.includes(this.filteredClass)
          },
        },
        {
          text: i18n.t('TableHeaders.schoolName'),
          value: 'schoolName',
        },
        {
          text: i18n.t('TableHeaders.birthdate'),
          value: 'birthdateString',
        },
        {
          text: i18n.t('TableHeaders.schoolID'),
          value: 'schoolID',
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
    this.initRoles()
    this.initClasses()
  },
  methods: {
    initEmployees() {
      this.loading = true
      this.$store
        .dispatch('data/getEmployeeBySchool', this.user)
        .then(async (resp) => {
          this.employees = resp
          this.employees.forEach((employee) => {
            employee.roleName = i18n.t('Filter.' + employee.roleName)
            employee.birthdateString = moment(
              String(employee.birthdate)
            ).format('DD.MM.YYYY')
            employee.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.copySchoolID'),
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
            ]
          })
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    initRoles() {
      this.loading = true
      this.$store
        .dispatch('data/getAllRoles')
        .then(async (resp) => {
          resp.forEach((role) => {
            this.roles.push(i18n.t('Filter.' + role.name))
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
    deleteEmployeeD(employee) {
      this.selectedEmployee = employee
      this.deleteEmployeeDialog = true
    },
    deleteEmployee() {
      this.loading = true
      this.$store
        .dispatch('data/deleteEmployee', {
          employeeID: this.selectedEmployee._id,
        })
        .then(() => {
          this.loading = false
          this.deleteEmployeeD = false
          window.location.reload()
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    copy(employee) {
      this.$store.commit('ui/setNotification', {
        display: true,
        code: i18n.t('Home.Dean.copySchoolIDMessage'),
        alertClass: 'success',
      })
      navigator.clipboard.writeText(employee.schoolID)
    },
  },
}
</script>
