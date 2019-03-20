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

interface iState{
  id: string,
  hospital: iHospital
}

interface response{
  [index:string] : any;
}

Vue.use(Vuex);

const plugins = process.env.NODE_ENV === 'production'
  ? [] : [createLogger({ collapsed: true })];
export default new Vuex.Store({
  state: {
    id: '',
    hospital: {
      name: '',
      pictureUrl: bg,
      logoUrl: logo,
      introduction: '暂无医院信息',
    },
  },
  getters: {
    name: (state:iState) => state.hospital.name,
    bg: (state:iState) => state.hospital.pictureUrl,
    logo: (state:iState) => state.hospital.logoUrl,
    info: (state:iState) => state.hospital.introduction,
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    handleSaveHospitalId(state:iState, id: string):void {
      state.id = id;
    },
    handleChangeHospitalInfo(state:iState, data):void {
      state.hospital = Object.assign({}, state.hospital, data);
    },
  },
  actions: {
    async fetchHospitalInfo({ commit }, id = '') {
      try {
        commit('handleSaveHospitalId', id);
        const res:response = await api(`institution/${id}`);
        // console.log(res);
        const data:any = {};
        for (const item of Object.keys(res)) {
          if (res[item]) {
            data[item] = res[item];
          }
        }
        commit('handleChangeHospitalInfo', data);
      } catch (e) {
        // console.log(e.message);
        Toast.fail(e.message);
      }
    },
  },
  /* eslint-disable no-param-reassign */
  plugins,
});
