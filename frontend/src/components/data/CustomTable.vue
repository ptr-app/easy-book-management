<template>
  <div>
    <v-row>
      <v-col cols="6" sm="6">
        <div
          :class="`text-${$vuetify.breakpoint.name}-h5`"
          :style="styleObject()"
          class="text-uppercase pt-5"
          v-if="header"
          v-text="header"
        />
      </v-col>
      <v-col cols="3" sm="3" />
      <v-col cols="3" sm="3">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('TableHeaders.search')"
          single-line
          hide-details
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col col="12" sm="12">
        <v-data-table
          :search="search"
          :custom-filter="customDataTableItemsFilter"
          :headers="headers"
          :items="items"
          :item-class="itemClass"
          :show-select="showSelect"
          v-model="selectedItems"
          class="elevation-1"
          :footer-props="{
            disableItemsPerPage: true,
            itemsPerPageOptions: [],
            itemsPerPageText: '',
          }"
          @click:row="rowClick"
        >
          <v-progress-linear v-slot:progress color="mainColor" indeterminate />
          <template v-if="!mobile" v-slot:header.delete>
            <button @click="deleteSelected">
              <v-icon>{{ 'mdi-delete-outline' }}</v-icon>
            </button>
          </template>
          <template v-if="!mobile" v-slot:item.delete="{ item }">
            <v-checkbox v-model="checked" dense @change="selectItem(item)" />
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip
              top
              v-for="action in item.dropdownItems"
              :key="action.key"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  @click="$emit(action.function, item)"
                  :disabled="action.disabled"
                  class="custom-icon2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ action.icon }}
                </v-icon>
              </template>
              <span v-text="action.title" />
            </v-tooltip>
          </template>
          <template v-slot:no-data v-text="$t('noData')" />
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/**
 * @vue-prop {String} search - search input
 * @vue-prop {Array} items - table input
 * @vue-data {Array} user_fields - table header
 * @vue-data {String} mainColor - stores the main color
 * @vue-data {Boolean}[checked=false] - stores, selected rows data
 * @vue-data {Array} selectedItems - stores all selected items
 * @vue-event {Object} selectItem(item) - selects item and stores item data
 * @vue-event {} deleteSelected() - deletes selected user
 */

export default {
  name: 'custom-table',
  props: {
    search: String,
    column: String,
    header: String,
    rowClickResponse: String,
    showSelect: Boolean,
    disabled: Boolean,
    textButton: Boolean,
    enableRowClick: Boolean,
    items: Array,
    headers: Array,
    buttons: Array,
    itemClass: Function,
  },
  data() {
    return {
      color: '',
      checked: false,
      selectedItems: [],
      mobile: false,
    }
  },
  created() {
    this.textColor = this.isText ? 'brown--text' : 'white--text'
    this.color = this.$vuetify.theme.themes.light.primary
    this.mobile = this.$vuetify.breakpoint.mdAndDown
  },
  methods: {
    styleObject() {
      return {
        color: this.$vuetify.theme.themes.light.primary,
      }
    },
    customDataTableItemsFilter(value, search, items) {
      const wordArray = search
        .toString()
        .toLowerCase()
        .split(' ')
        .filter((x) => x)
      return wordArray.every((word) =>
        JSON.stringify(Object.values(items))
          .toString()
          .toLowerCase()
          .includes(word)
      )
    },
    selectItem(item) {
      if (this.checked) {
        this.selectedItems.push(item.user_id)
        this.checked = false
      } else {
        const index = this.selectedItems.indexOf(item.user_id)
        if (index > -1) {
          this.selectedItems.splice(index, 1)
        }
      }
    },
    deleteSelected() {
      this.$emit('delete', this.selectedItems)
    },
    rowClick(item) {
      if (this.enableRowClick) {
        this.$emit(this.rowClickResponse, item)
      }
    },
  },
}
</script>
