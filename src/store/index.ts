import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { Toast } from 'vant';
import bg from '@/assets/img/default_hospital_bg.png';
import logo from '@/assets/img/default_hospital_logo.png';
import { api } from '../libs/ajax';

interface iHospital{
  name: string;
  pictureUrl: string;
  logoUrl: string;
  introduction: string;
}

interface response{
  [index:string] : any;
}

Vue.use(Vuex);

const plugins = process.env.NODE_ENV === 'production'
  ? [] : [createLogger({ collapsed: true })];
export default new Vuex.Store({
  state: {
    hospital: {
      name: '',
      pictureUrl: bg,
      logoUrl: logo,
      introduction: '暂无医院信息',
    },
  },
  getters: {
    name: (state:{ hospital:iHospital }) => state.hospital.name,
    bg: (state:{ hospital:iHospital }) => state.hospital.pictureUrl,
    logo: (state:{ hospital:iHospital }) => state.hospital.logoUrl,
    info: (state:{ hospital:iHospital }) => state.hospital.introduction,
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    handleChangeHospitalInfo(state:{ hospital:iHospital }, data):void {
      state.hospital = Object.assign({}, state.hospital, data);
    },
  },
  actions: {
    async fetchHospitalInfo({ commit }, id = 'olLDlK') {
      try {
        const res:response = await api(`institution/${id}`);
        const data:any = {};
        for (const item of Object.keys(res)) {
          if (res[item]) {
            data[item] = res[item];
          }
        }
        commit('handleChangeHospitalInfo', data);
      } catch (e) {
        Toast.fail(e);
      }
    },
  },
  /* eslint-disable no-param-reassign */
  plugins,
});
