<template>
<!-- main clickable item, rendered as an anchor (<a>) tag -->
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
  	<!-- optional icon section, only rendered if `icon` prop is provided -->
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

	<!-- main text section containing title and optional caption -->
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  // props define the inputs to this component
  props: {
    title: {
      type: String,
      required: true // title is mandatory
    },

    caption: {
      type: String,
      default: '' // optional caption
    },

    link: {
      type: String,
      default: '#' // default link is '#'
    },

    icon: {
      type: String,
      default: '' // optional icon name
    }
  }
})
</script>
