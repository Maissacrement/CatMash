<template>
  <div class="cat-box">
    <div class="cadre" :class="activeClass" v-bind:style="bgImg">
      &nbsp;
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Cat extends Vue {
  @Prop() private borderColor!: boolean;
  @Prop() private urlImg!: string;
  private activeClass: any;
  private bgImg: any;
  private imgStatic: string;
  private urlOfBg: string;

  constructor() {
    super();
    this.imgStatic =
      'https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg';
    this.urlOfBg =
      (this.urlImg.length > 0) ? this.urlImg : this.imgStatic;
    this.activeClass = {
      'border-color-grey': this.borderColor ? false : true,
      'border-color-white': this.borderColor ? true : false,
    };
    this.bgImg = {
      backgroundImage: `url(${this.urlOfBg})`,
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
