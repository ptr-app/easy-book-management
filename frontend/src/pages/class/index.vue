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
        <custom-table
          :items="classes"
          :search="search"
          :headers="headers"
          @delete="deleteClassDialog"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import CustomTable from '../../components/data/CustomTable.vue'
import ValidationDialog from '../../components/data/ValidationDialog.vue'
import addUserDialog from './AddClass.vue'
export default {
  name: 'class',
  components: { CustomTable, addUserDialog, ValidationDialog },
  data() {
    return {
      loading: false,
      addClassDialog: false,
      deleteClassD: false,
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
        .dispatch('data/getClassBySchool')
        .then(async (resp) => {
          console.log('resp')
          console.log(resp)
          this.classes = resp
          this.classes.forEach((Class) => {
            Class.dropdownItems = [
              {
                disabled: false,
                title: i18n.t('Buttons.delete'),
                function: 'delete',
                icon: 'mdi-delete',
                key: 'delete',
              },
            ]
          })
          console.log('CLASSES')
          console.log(this.classes)
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
          window.location.reload
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
