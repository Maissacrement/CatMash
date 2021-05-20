<template>
  <p>
    {{ text }} {{ appendText || "" }}
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Print extends Vue {
  @Prop() private text!: string;
  @Prop() private appendText?: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
