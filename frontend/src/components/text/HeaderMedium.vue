<template>
  <div>
    <div :class="`text-${$vuetify.breakpoint.name}-h5`" v-text="title" />
    <div
      id="divider"
      style="background-color: rgb(150, 150, 150); height: 1px; width: 100%"
    />
    <v-progress-linear
      indeterminate
      rounded
      color="primary"
      :active="loading"
    />
  </div>
</template>

<script>
export default {
  name: 'header-medium',
  props: {
    title: String,
    loading: Boolean,
  },
}
</script>
