<template>
  <div class="download">
    <img
      :src="back"
      class="back"
      alt=""
      @click="onClickLeft"
    >
    <div class="app-info">
      <img :src="logo" class="logo" alt="">
      <p>心之力</p>
      <img :src="slogan" class="slogan" alt="">
    </div>
    <div class="download__btn"
    >
      <img :src="background" class="bg" alt="bg">
      <div class="device-item android">
        <img :src="android" alt="">
        <a
          href="https://revomedi.cn/xinzhili-android-app"
          target="_blank"
        >Android版下载</a>
      </div>
      <div class="device-item ios">
        <img :src="iPhone" alt="">
        <a
          href="https://itunes.apple.com/cn/app/id1423445984?mt=8"
          target="_blank"
        >iPhone版下载</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NavBar } from 'vant';
import back from './img/back.png';
import logo from './img/logo.png';
import slogan from './img/slogan.png';
import background from './img/background.png';
import bg from './img/bg.png';
import android from './img/android.svg';
import iPhone from './img/iPhone.svg';

@Component({
  components: {
    NavBar,
  },
})
export default class Home extends Vue {
  back:string = back;
  logo:string = logo;
  slogan:string = slogan;
  background:string = background;
  bg:string = bg;
  android:string = android;
  iPhone:string = iPhone;
  onClickLeft():void {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
  .download{
    position: absolute;
    width: 100vmin;
    height: 100vmax;
    background-color: #fff;
    @include flex(column, nowrap, flex-start, center);
    .back{
      position: absolute;
      left: 20px;
      top: 17px;
      z-index: 2;
      @include size(16px);
    }
    .app-info{
      margin-top: 32px;
      background-color: #fff;
      @include flex(column, nowrap, flex-start, center);
      .logo{
        @include size(60px, 67px);
      }
      .slogan{
        width: 200px;
        height: auto;
        z-index: 2;
      }
      p{
        font-size: 13px;
        color: #181818;
        font-weight: bold;
        margin-bottom: 32px;
      }
    }
    .download__btn{
      @include flex(column, nowrap, flex-end, center);
      background: #fff left bottom no-repeat;
      background-size: contain;
      width: 100%;
      height: 100%;
      color: #fff;
      text-align: center;
      position: relative;
      .bg{
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
    .device-item{
      width: 180px;
      height: 50px;
      border: 1px solid #fff;
      border-radius: 27.5px;
      z-index: 1;
      @include flex(row, nowrap, center, center);
      a{
        color: #fff;
      }
      img{
        margin-right: 14px;
      }
      &.android{
        /*order: 0;*/
        margin-bottom: 20px;
      }
      &.ios{
        /*order: 0;*/
        margin-bottom: 30px;
      }
    }
  }
  @media screen and (orientation: landscape) {
    /*横屏 css*/
    .download{
      width: 100vmax;
      .device-item.android{
        margin-bottom: 10px;
      }
      .device-item.ios{
        margin-bottom: 10px;
      }
    }
  }
</style>
