<template>
  <div class="home">
    <NavBar class="nav" title="首页" />
    <div class="home-content">
      <div class="welcome">
        <h3>hi, 欢迎您</h3>
        <p>欢迎来到<span>【{{ hospitalName }}】</span>,以下入口为您引导看病</p>
      </div>
      <div class="img-content">
        <img class="bg" :src=hospitalBg alt="">
        <div class="note">
          <img :src=hospitalLogo class="note-logo" alt="">
          <div class="note-text">
            <h3>{{ hospitalName }}互联网医院</h3>
            <p>花最少的钱  看最好的医生</p>
          </div>
        </div>
      </div>
      <div class="service">
        <h3 class="service-mark">
          <span class="before" />
          主打服务
          <span class="after"/>
        </h3>
        <ul class="service-list">
          <li
            v-for="service in services"
            :key="service.title"
            class="service-list__item"
            :style="{backgroundImage: `url(${service.icon})`}"
            @click="handleServeClick(service.fn)"
          >
            <h3>{{ service.title }}</h3>
            <p>{{ service.extra }}</p>
          </li>
        </ul>
      </div>
      <div class="footer">
        专业的互联网医院门诊部 让您不再找医生感觉困难啦
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NavBar, Toast } from 'vant';
import outpatient from './img/outpatient_service.png';
import slow from './img/slow_disease.png';
import referral from './img/referral.png';
import introduce from './img/hospital_introduced.png';

@Component({
  components: { NavBar },
})
export default class Home extends Vue {
  get services() {
    return [
      {
        title: '门诊',
        extra: '60s快速回复',
        icon: outpatient,
      },
      {
        title: '慢病管理',
        extra: '自己的贴身管家',
        icon: slow,
        fn: () => {
          this.$router.push({ name: 'app' });
        },
      },
      {
        title: '转诊/会诊',
        extra: '会诊转诊快捷',
        icon: referral,
      },
      {
        title: '医院介绍',
        extra: `${this.hospitalName}名医`,
        icon: introduce,
        fn: () => {
          this.$router.push({ name: 'hospital' });
        },
      },
    ];
  }

  get hospitalName() {
    return this.$store.getters.name;
  }

  get hospitalLogo() {
    return this.$store.getters.logo;
  }

  get hospitalBg() {
    return this.$store.getters.bg;
  }
  created() {
    if (!this.hospitalName) {
      const { id } = this.$route.query;
      if (id) {
        this.$store.dispatch('fetchHospitalInfo', id);
      } else {
        Toast.fail('医院不存在！');
      }
    }
  }
  handleServeClick(fn:any) {
    if (fn) { fn(); }
  }
}
</script>

<style lang="scss" scoped>
  $pic-color: #327EC1;
  .home{
    text-align: left;
    background-color: #fff;
  }
  .home-content{
    padding: 0 15px;
    .welcome{
      color: $main-text-color;
      padding: 14px ;
      h3{
        font-size: 20px;
        line-height: 20px;
        margin-bottom: 13px;
      }
      p{
        font-size: 14px;
        line-height: 14px;
        span{
          color: #1d0000;
          font-weight: bold;
        }
      }
    }
  }
  .img-content{
    width: 100%;
    height: 152px;
    position: relative;
    .bg{
      width: 100%;
      height: 152px;
    }
    .note{
      position: absolute;
      top: 30px;
      left: 8px;
      color: $pic-color;
      @include flex(row, nowrap, flex-start, center);
      &-logo{
        @include size(30px);
        margin-right: 3px;
      }
    }
    .note-text{
      h3{
        font-size: 18px;
      }
      p{
        font-size: 12px;
        margin-top: 3px;
        /*transform: scale(0.5);*/
      }
    }
  }
  .service{
    &-list{
      @include flex(row, wrap, flex-start, flex-start);
      &__item{
        width: 168px;
        height: 120px;
        margin-bottom: 9px;
        overflow: hidden;
        background: #f8fbfe left top no-repeat;
        background-size: cover;
        &:nth-child(1),
        &:nth-child(3) {
          margin-right: 9px;
        }
        > h3 {
          text-indent: 12px;
          color: $main-text-color;
          font-size: 17px;
          margin: 23px 0 6px;
        }
        > p{
          text-indent: 12px;
          font-size: 12px;
          color: $help-text-color;
        }
        > img{

        }
      }
    }
  }
  .service-mark{
    font-size: 17px;
    color: $main-text-color;
    font-weight: bold;
    margin: 34px auto 18px;
    text-align: center;
    .before,
    .after{
      opacity: 0.39;
      display: inline-block;
      width: 30px;
      height: 1px;
      vertical-align: middle;
    }
    .before{
      margin-right: 10px;
      background-image: linear-gradient(-90deg, #414C5E 0%, rgba(65,76,94,0.00) 100%);
    }
    .after{
      margin-left: 10px;
      background-image: linear-gradient(-90deg, rgba(65,76,94,0.00) 0%, #414C5E 100%);
    }
  }
  .footer{
    margin-top: 18px;
    text-align: center;
    font-size: 12px;
    color: #ABACAD;
    padding-bottom: 14px;
  }
</style>
