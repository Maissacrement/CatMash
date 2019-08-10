<template>
  <div class="home">
    <div class="main">
      <div @click="increment()" class="left">
        <Cat :borderColor="true" />
      </div>
      <div @click="decrement()" class="right">
        <Cat />
      </div>
      <div class="top-out-flow">
        <img src="@/assets/image823.png" class="logo" />
      </div>
      <div class="bottom-out-flow">
        <Print text="Voir les plus beaux chats" />
        <Print
          :text="nbVotes"
          appendText="votes"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Print from '@/components/Print.vue';
import Cat from '@/components/Cat.vue';
import RestProvider from '../providers/rest/rest';

@Component({
  components: {
    Print,
    Cat,
  },
})
export default class Home extends Vue {
  public nbVotes: number;
  private Rest: RestProvider;
  private cats: any[];

  constructor() {
    super();
    this.nbVotes = 0;
    this.Rest = new RestProvider();
    this.cats = [];
    // alert(Rest.getCat());
  }

  public increment(): void {
      this.nbVotes += 1;
      this.Rest.getCats()
        .then((result: any) => {
          this.cats = [...result];
          alert(this.cats);
        }).catch((err: any) => {
          throw new Error(`data no found ${err}`);
        });
  }

  public decrement(): void {
      this.nbVotes -= 1;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 7%;
  padding: 6px 6px 6px 6px;
  .right, .left {
    grid-row-start: 1;
    grid-row-end: span 2;
  }
  .left {
    background-color: #eceeee;
  }
  .right {
    background-color: #f5f5f5;
  }
  .bottom-out-flow {
    padding: 2px;
    position: absolute;
    bottom: 6px;
    background-color: #f5f5f5;
    width: calc(100% - 12px);
    max-width: 300px;
    height: 42px;
    border-width: 6px 6px 0 6px;
    border-radius: 10px 10px 0 0;
    border-color: #eceeee;
    border-style: solid;
    @media (min-width: 300px) {
      left: calc((100% - 300px) / 2);
    }
  }
  .top-out-flow {
    position: absolute;
    max-width: 200px;
    width: calc(100% - 12px);
    @media (min-width: 200px) {
      left: calc((100% - 200px) / 2);
    }
    @media (max-height: 400px) {
      width: 70px;
      left: calc((100% - 70px) / 2);
      /* width: calc(70% - 12px) !important;
      left: calc((70% - 200px) / 2) !important; */
    }
    .logo {
      width: 100%;
    }
  }
}
</style>
