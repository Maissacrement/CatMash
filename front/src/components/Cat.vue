<template>
  <div class="cat-box">
    <div class="cadre" :class="activeClass" style="background-image:url(https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg);">
      &nbsp;
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Cat extends Vue {
  @Prop() private borderColor!: boolean;
  private activeClass: any;

  constructor() {
    super();
    this.activeClass = {
      'border-color-grey': this.borderColor ? false : true,
      'border-color-white': this.borderColor ? true : false,
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/scss/Cat.scss";
  .border-color-grey {
    border-color: #eceeee;
  }
  .border-color-white {
    border-color: white;
  }
</style>
