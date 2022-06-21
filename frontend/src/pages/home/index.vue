<template>
  <div>
    <student v-if="currentUser.role === 'student'" />
    <teacher v-if="currentUser.role === 'teacher'" />
    <dean v-if="currentUser.role === 'dean'" />
  </div>
</template>

<script>
import Student from './Student.vue'
import Teacher from './Teacher.vue'
import Dean from './Dean.vue'
export default {
  name: 'home',
  components: {
    Student,
    Teacher,
    Dean,
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
