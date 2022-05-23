<template>
  <div>
    <student v-if="currentUser.role === 'student'" />
    <teacher v-if="currentUser.role === 'teacher'" />
    <dean v-if="currentUser.role === 'dean'" />
  </div>
</template>

<script>
import i18n from '@/i18n'
import student from './student.vue'
import teacher from './teacher.vue'
import dean from './dean.vue'
export default {
  name: 'home',
  components: {
    student,
    teacher,
    dean,
  },
  data() {
    return {}
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
}
</script>
