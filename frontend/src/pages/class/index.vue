<template>
  <div>
    <add-user-dialog
      v-if="addClassDialog"
      @close="addClassDialog = false"
      @done="classAdded"
      :dialog="addClassDialog"
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
        <custom-table :items="classes" :search="search" :headers="headers" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import CustomTable from '../../components/data/CustomTable.vue'
import addUserDialog from './AddClass.vue'
export default {
  name: 'class',
  components: { CustomTable, addUserDialog },
  data() {
    return {
      loading: false,
      addClassDialog: false,
      search: '',
      classes: [{}],
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
          value: 'teacher',
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
    this.initClasses()
  },
  methods: {
    initClasses() {
      this.loading = true
      this.$store
        .dispatch('data/getClassBySchool', {
          employeeID: this.currentUser._id,
        })
        .then(async (resp) => {
          console.log(resp)
          this.classes = resp
          this.classes.teacher = resp.teacherName
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    classAdded() {
      this.addClassDialog = false
      window.location.reload
    },
  },
}
</script>
