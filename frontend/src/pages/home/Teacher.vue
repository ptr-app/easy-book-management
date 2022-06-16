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
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import HeaderMedium from '../../components/text/HeaderMedium.vue'
import CustomTable from '../../components/data/CustomTable.vue'
export default {
  name: 'home-teacher',
  components: { HeaderMedium, CustomTable },
  data() {
    return {
      loading: false,
      viewClassDetails: false,
      search: '',
      classes: [{}],
      students: [{}],
      selectedClass: {},
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
          value: 'birthdate',
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
        .dispatch('data/getClassByEmployee', this.user)
        .then(async (resp) => {
          this.classes = resp
          this.classes.forEach((Class) => {
            Class.dropdownItems = [
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
    viewClass(Class) {
      this.loading = true
      this.selectedClass = Class
      this.$store
        .dispatch('data/getStudentsByClass', Class._id)
        .then(async (resp) => {
          this.students = resp
          this.students.forEach((Class) => {
            Class.dropdownItems = [
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
      this.viewClassDetails = true
    },
  },
}
</script>