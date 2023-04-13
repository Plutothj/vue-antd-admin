<template>
  <BaseContent>
    <a-row :gutter="[16, 16]">
      <a-col :span="6">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section>
              <a-statistic
                style="color: #fff"
                title="Active Users"
                :value="112893"
              />
            </q-card-section>

            <div ref="container1" class="col-9"></div>
          </q-card-section> </q-card
      ></a-col>
      <a-col :span="6">
        <q-card class="my-card2" flat bordered>
          <q-card-section horizontal>
            <q-card-section>
              <a-statistic
                style="color: #fff"
                title="Active Users"
                :value="112893"
              />
            </q-card-section>

            <div ref="container2" class="col-9"></div>
          </q-card-section> </q-card
      ></a-col>
      <a-col :span="6">
        <q-card class="my-card3" flat bordered>
          <q-card-section horizontal>
            <q-card-section>
              <a-statistic
                style="color: #fff"
                title="Active Users"
                :value="112893"
              />
            </q-card-section>

            <div ref="container3" class="col-9"></div>
          </q-card-section> </q-card
      ></a-col>
      <a-col :span="6">
        <q-card class="my-card4" flat bordered>
          <q-card-section horizontal>
            <q-card-section>
              <a-statistic
                style="color: #fff"
                title="Active Users"
                :value="112893"
              />
            </q-card-section>

            <div ref="container4" class="col-9"></div>
          </q-card-section> </q-card
      ></a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <q-card class="my-card5" flat bordered>
          <div ref="container5"></div>
        </q-card>
      </a-col>
      <a-col :span="12">
        <q-card class="my-card6" flat bordered>
          <div ref="container6"></div>
        </q-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <q-card class="my-card7" flat bordered>
          <div ref="container7"></div>
        </q-card>
      </a-col>
    </a-row>
  </BaseContent>
</template>

<script setup>
import { TinyLine, Bar, Sunburst } from "@antv/g2plot";
import { getSunburstData } from "@/api/home";
import { useRequest } from "vue-request";
import { ref, toRaw, onBeforeUnmount, onMounted } from "vue";
const container1 = ref(null);
const container2 = ref(null);
const container3 = ref(null);
const container4 = ref(null);
const container5 = ref(null);
const container6 = ref(null);
const data = [
  { type: "分类一", values: [76, 100] },
  { type: "分类二", values: [56, 108] },
  { type: "分类三", values: [38, 129] },
  { type: "分类四", values: [58, 155] },
  { type: "分类五", values: [45, 120] },         
  { type: "分类六", values: [23, 99] },
  { type: "分类七", values: [18, 56] },
  { type: "分类八", values: [18, 34] },
];

let timer = ref(null);
const getData = () => {
  // generate an array of random data
  const data = [];

  for (let i = -30; i <= 0; i += 1) {
    data.push(Math.random() + 0.2);
  }
  return data;
};
const initSunburst = async () => {
  let { data } = await getSunburstData();
  let sunburst = new Sunburst(container6.value, {
    data,
    innerRadius: 0.3,
    colorField: "label",
    interactions: [{ type: "element-active" }],
    hierarchyConfig: {
      field: "sum",
    },
  });
  sunburst.render();
};

let initCharts = () => {
  let tinyArea1 = new TinyLine(container1.value, {
    appendPadding: 10,
    height: 120,
    autoFit: true,
    data: getData(),
    smooth: true,
    lineStyle: {
      stroke: "#fff",
    },
  });
  let tinyArea2 = new TinyLine(container2.value, {
    appendPadding: 10,
    height: 120,
    autoFit: true,
    data: getData(),
    smooth: true,
    lineStyle: {
      stroke: "#fff",
    },
  });
  let tinyArea3 = new TinyLine(container3.value, {
    appendPadding: 10,
    height: 120,
    autoFit: true,
    data: getData(),
    smooth: true,
    lineStyle: {
      stroke: "#fff",
    },
  });
  let tinyArea4 = new TinyLine(container4.value, {
    appendPadding: 10,
    height: 120,
    autoFit: true,
    data: getData(),
    smooth: true,
    lineStyle: {
      stroke: "#fff",
    },
  });
  tinyArea1.render();
  tinyArea2.render();
  tinyArea3.render();
  tinyArea4.render();
  timer = setInterval(() => {
    const newData1 = tinyArea1.options.data.slice(1);
    const newData2 = tinyArea2.options.data.slice(1);
    const newData3 = tinyArea3.options.data.slice(1);
    const newData4 = tinyArea4.options.data.slice(1);

    tinyArea1.changeData(newData1);
    tinyArea2.changeData(newData2);
    tinyArea3.changeData(newData3);
    tinyArea4.changeData(newData4);
  }, 5000);
  const barPlot = new Bar(container5.value, {
    appendPadding: 20,
    data: data.reverse(),
    xField: "values",
    yField: "type",
    isRange: true,
    label: {
      position: "middle",
      layout: [{ type: "adjust-color" }],
    },
  });
  barPlot.render();
};

onMounted(async () => {
  await initCharts();
  await initSunburst();
});
onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="less" scoped>
.base-style {
  height: 140px;
  padding: 10px;
}

#colors() {
  background1: linear-gradient(90deg, #68e4bc 0, #4ad0d1 99%);
  background2: linear-gradient(270deg, #fcac94 0, #f3a183 98%);
  background3: linear-gradient(90deg, #f073c8, #ff6a95 99%);
  background4: linear-gradient(90deg, #68ec 0, #4ad 99%);
}

.my-card {
  background: #colors[background1];
  .base-style();
}

.my-card2 {
  background: #colors[background2];
  .base-style();
}

.my-card3 {
  background: #colors[background3];
  .base-style();
}
.my-card4 {
  background: #colors[background4];
  .base-style();
}
.my-card5 {
  margin-top: 20px;
}
</style>
