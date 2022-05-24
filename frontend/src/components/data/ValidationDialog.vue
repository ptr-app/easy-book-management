<template>
  <v-dialog
    persistent
    width="auto"
    max-width="400"
    v-model="dialogVisible"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card>
      <v-card-title class="headline" v-text="title" />
      <v-card-text v-text="content" />
      <v-card-actions data-cy="validationButtons">
        <v-spacer />
        <div v-if="buttons[0]" style="margin-right: 20px">
          <v-btn v-text="buttons[0]" @click="$emit('close')" />
        </div>
        <div v-if="buttons[1]" style="margin-right: 20px">
          <v-btn v-text="buttons[1]" @click="$emit('done')" />
        </div>
        <div v-if="buttons[2]" style="margin-right: 20px">
          <v-btn v-text="buttons[2]" @click="$emit('done2')" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'valiation-dialog',
  props: {
    title: String,
    content: String,
    buttons: Array,
    dialog: Boolean,
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.dialog
      },
      set: function (value) {
        if (!value) {
          this.$emit('close')
        }
      },
    },
  },
}
</script>
