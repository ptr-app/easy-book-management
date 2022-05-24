<template>
  <div>
    <v-card class="mt-5 mx-5">
      <v-card-title v-text="$t('Home.Dean.header') + currentUser.name" />
      <v-card-text>
        <custom-table
          :items="employees"
          :search="search"
          :headers="headers"
          :header="$t('Home.Dean.headerTeacher')"
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
  name: 'home-dean',
  components: { HeaderMedium, CustomTable },
  data() {
    return {
      loading: false,
      search: '',
      employees: [{}],
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
          console.log(resp)
          this.employees = resp
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
