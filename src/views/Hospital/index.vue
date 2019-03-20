<template>
  <div class="hospital">
    <NavBar
      title="医院介绍"
      class="nav"
    />
    <img
      :src="back"
      class="back"
      alt=""
      @click="onClickLeft"
    >
    <div class="hospital__content">
      <img class="bg" :src="hospitalBg" alt="">
      <div class="hospital__info">
        <h3 class="title">
          <Icon :name="separated" />
          医院简介
          <span class="after" />
        </h3>
        <p class="detail">{{ hospitalInfo }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NavBar, Icon } from 'vant';
import separated from './img/separated.png';
import back from '@/assets/img/back.png';

@Component({
  components: {
    NavBar, Icon,
  },
})
export default class Home extends Vue {
  separated:string = separated;
  back:string = back;
  get hospitalInfo() {
    return this.$store.getters.info;
  }

  get hospitalBg() {
    return this.$store.getters.bg;
  }

  onClickLeft() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
  .hospital{
    position: absolute;
    height: 100%;
    background-color: #fff;
  }
  .back{
    position: absolute;
    left: 20px;
    top: 17px;
    z-index: 1;
    @include size(16px);
  }
  .hospital__content{
    padding: 0 15px;
  }
  .bg{
    width: 100%;
    height: 152px;
    margin: 15px 0 20px;
  }
  .hospital__info{
  }
  .title{
    text-align: left;
    margin-bottom: 15px;
    position: relative;
    .after{
      position: absolute;
      top: 10px;
      right: 0;
      width: 230px;
      height: 1px;
      margin-left: 14px;
      background: #EBEBEB;
      display: inline-block;
    }
  }
  .detail{
    word-break: break-all;
    font-size: 13px;
    color: $help-text-color;
    letter-spacing: 0;
    text-align: justify;
    line-height: 21px;
  }
</style>
