<template>
  <div class="breadcrumbs" v-if="back">
    <a class="text-white" @click="$router.go(-1)">&#8592; Вернуться назад</a>
  </div>
  <div :class="['card', {
    'text-center': center
  }]">
    <h1 class="card-title">
      {{ title }}
      <slot name="header"></slot>
    </h1>
    <div class="card-content">
      <slot/>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    center: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    document.title = `${props.title} | Creative Market`
    return {
      router
    }
  }
}
</script>

<style scoped>
.text-center .card-title {
  justify-content: center;
}
.breadcrumbs {
  margin: 90px 0 30px;
}
.breadcrumbs a {
  cursor: pointer;
}
</style>
