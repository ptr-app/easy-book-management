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
        <custom-table
          :items="employees"
          :search="search"
          :headers="headers"
          :header="$t('Home.Dean.headerTeacher')"
          @delete="deleteEmployeeD"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
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
      headers: [
        {
          text: i18n.t('TableHeaders.name'),
          align: 'start',
          value: 'name',
        },
        {
          text: i18n.t('TableHeaders.role'),
          value: 'roleName',
        },
        {
          text: i18n.t('TableHeaders.class'),
          value: 'className',
        },
        {
          text: i18n.t('TableHeaders.schoolName'),
          value: 'schoolName',
        },
        {
          value: 'actions',
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
  },
  methods: {
    initEmployees() {
      this.loading = true
      this.$store
        .dispatch('data/getEmployeeBySchool', this.user)
        .then(async (resp) => {
          this.employees = resp
          this.employees.forEach((employee) => {
            employee.dropdownItems = [
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
  },
}
</script>
