<template>
  <div class="about">
    <h1 style="color: red">This is an about page11</h1>
    <Button @click="handleGetLists">222</Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Cell } from 'vant';
import { apiGet } from '../libs/ajax';

@Component({
  components: {
    Button, Cell,
  },
})
export default class About extends Vue {
  handleGetLists() {
    apiGet({
      url: 'test',
      success(res:any) {
        console.log(res);
      },
    }, this);
  }
}
</script>
