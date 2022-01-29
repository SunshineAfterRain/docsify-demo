<!--
 * @Author: Tango
 * @Date: 2022-01-29 14:58:56
 * @LastEditTime: 2022-01-29 15:10:41
 * @LastEditors: Tango
 * @Description:
 * @FilePath: \docsify-demo\docs\vue\index.md
 * 可以输入预定的版权声明、个性签名、空行等
-->

# 常用组件封装

## 弹窗组件

```js


<template>
    <div
        class="selectDialog"
        v-if="visible"
        @touchmove.self.prevent
        @click.self="close"
    >
        <div class="wrapper">
            <div class="header">
                <div class="title">
                    {{ title }}
                </div>
                <div class="close-btn" @click="close"></div>
            </div>
            <div class="modal-content">
                <div class="select-list">
                    <div
                        class="select-item"
                        v-for="item in dataList"
                        :key="item.value"
                        :class="{ active: value.value == item.value }"
                        @click="select(item)"
                    >
                        {{ item.label }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dialogMixin from '../mixin.js';
export default {
    name: 'selectDialog',
    data() {
        return {
            visible: false
        };
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        dataList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        value: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    mixins: [dialogMixin],
    components: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {
        select(item) {
            this.$emit('input', item);
            this.$emit('change', item);
            this.close();
        },
        show() {
            this.visible = true;
        },
        close() {
            this.visible = false;
        }
    }
};
</script>

<style lang="less" scoped>
.selectDialog {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    .wrapper {
        background-color: #ffffff;
        border-radius: 0.24rem 0.24rem 0 0;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .header {
            display: flex;
            padding: 0.4rem;
            text-align: center;
            align-items: center;
            border-bottom: 0.04rem solid #f5f7f9;
            .close-btn {
                width: 0.32rem;
                height: 0.32rem;
                background-image: url('../../../img/close-icon.png');
                background-size: 100% 100%;
            }
            .title {
                flex: 1;
                font-size: 0.32rem;
                color: #222222;
                .sub-title {
                    color: #ccc;
                    font-size: 0.24rem;
                    margin-top: 0.08rem;
                }
            }
            .confirm-btn {
                color: #62a7ff;
                font-size: 0.32rem;
                justify-content: center;
            }
        }
        .modal-content {
            padding: 0 0.3rem;
            .title {
                color: #333;
                font-size: 0.32rem;
                font-weight: bold;
            }
            .select-list {
                .select-item {
                    text-align: center;
                    font-size: 0.28rem;
                    padding: 0.32rem 0;
                    &:not(:last-child) {
                        border-bottom: 1px solid #f5f7f9;
                    }
                    &.active {
                        color: #0f68eb;
                    }
                }
            }
        }
    }
}
</style>
```

## 弹窗组件公共方法 mixin

```js
export default {
  mounted() {},
  methods: {
    // 阻止背景滚动
    stopScroll() {
      let top = document.body.scrollTop || document.documentElement.scrollTop
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.top = `${-1 * top}px`
    },
    // 恢复背景滚动
    recoverScroll() {
      let top = -parseInt(document.body.style.top)
      document.body.style.position = "static"
      document.body.style.top = 0
      window.scrollTo(0, top)
    },
  },
  destroyed() {
    document.body.removeChild(this.$el)
    this.recoverScroll()
  },
  watch: {
    // 箭头弹窗显示隐藏
    visible(val) {
      if (val) {
        //显示的时候把当前实例挂载到body
        this.$nextTick(() => {
          const body = document.querySelector("body")
          if (body.append) {
            body.append(this.$el)
          } else {
            body.appendChild(this.$el)
          }
          // 阻止滚动
          this.stopScroll()
        })
      } else {
        document.body.removeChild(this.$el)
        this.recoverScroll()
      }
    },
  },
}
```

## 封装 echarts 组件例子

```js
<template>
    <div class="chart"></div>
</template>

<script>
import { merge } from 'lodash';
import * as echarts from 'echarts';
import { BASIC_OPTION } from './default_option';
import { COLOR_ARRAY } from '../color';
import ResizeListener from 'element-resize-detector';

export default {
    name: 'ChartLine',
    props: {
        // 正常的业务数据，对应echarts饼图配置中series[0].data
        seriesData: {
            type: Array,
            required: true,
            default: () => []
        },
        // 表示需要特殊定制的配置
        // 一般UI会规定一个统一的设计规范（比如颜色，字体，图例格式，位置等）
        // 但不排除某个图标会和设计规范不同，需要特殊定制样式，所以开放这个配置，增强灵活性
        extraOption: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chart: null
        };
    },
    watch: {
        seriesData: {
            deep: true,
            handler() {
                this.updateChartView();
            }
        }
    },
    mounted() {
        this.chart = echarts.init(this.$el);
        this.updateChartView();
        window.addEventListener('resize', this.handleWindowResize);
        this.addChartResizeListener();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleWindowResize);
    },
    methods: {
        /**
         * 将业务数据加入到基础样式配置中
         * @returns {Object} 完整的echart配置
         */
        assembleDataToOption() {
            return merge(
                {},
                BASIC_OPTION,
                { color: COLOR_ARRAY },
                {
                    series: [{ data: this.seriesData }]
                },
                this.extraOption
            );
        },

        /**
         * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
         */
        addChartResizeListener() {
            const instance = ResizeListener({
                strategy: 'scroll',
                callOnAdd: true
            });

            instance.listenTo(this.$el, () => {
                if (!this.chart) return;
                this.chart.resize();
            });
        },

        /**
         * 更新echart视图
         */
        updateChartView() {
            if (!this.chart) return;

            const fullOption = this.assembleDataToOption();
            console.log(fullOption);
            this.chart.setOption(fullOption, true);
            setTimeout(() => {
                this.chart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0, // 显示第几个series
                    dataIndex: 0 // 显示第几个数据
                });
            }, 500);
        },

        /**
         * 当窗口缩放时，echart动态调整自身大小
         */
        handleWindowResize() {
            if (!this.chart) return;
            this.chart.resize();
        }
    }
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>

//index 组件
<template>
    <Empty v-if="isSeriesEmpty" description="现在还没捕捉到数据噢～" />
    <chart-line v-else v-bind="$props" />
</template>

<script>
import { isEmpty } from 'lodash';
import ChartLine from './echart_line.vue';
import Empty from '../empty/empty.vue';

export default {
    name: 'EchartLine',
    components: { ChartLine, Empty },
    props: ChartLine.props,

    computed: {
        // 针对饼图数据是不是无效的判断
        isSeriesEmpty() {
            return isEmpty(this.seriesData);
        }
    }
};
</script>


// option json
export const BASIC_OPTION = {
    title: {
        text: '',
        subtext: '',
        left: ''
    },
    grid: {
        top: '5%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        extraCssText: 'z-index: 2;',
        axisPointer: {
            type: 'cross',
            snap: true,
            label: {
                show: false
            }
        }
    },
    xAxis: {
        type: 'category',
        axisLabel: { color: '#999999' },
        axisTick: {
            lineStyle: {
                type: 'solid',
                color: 'rgba(51,51,51,0.15)'
            },
            alignWithLabel: true
        },
        axisLine: {
            lineStyle: {
                type: 'solid',
                color: 'rgba(51,51,51,0.15)'
            }
        },
        axisPointer: {
            show: 'true',
            type: 'line',
            lineStyle: {
                color: '#FF9E00',
                type: 'dashed'
            }
        },
        data: []
    },
    yAxis: {
        type: 'value',
        axisTick: { show: false },
        axisLabel: { color: '#999999' },
        splitNumber: 4,
        splitLine: {
            lineStyle: {
                type: 'solid',
                color: 'rgba(51,51,51,0.15)'
            }
        },
        axisLine: { show: false },
        axisPointer: {
            show: 'true',
            type: 'line',

            lineStyle: {
                color: '#FF9E00',
                type: 'dashed'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 10
        }
    ],
    series: [
        {
            data: [],
            type: 'line',

            itemStyle: {},
            emphasis: {
                itemStyle: {
                    symbol: 'circle',
                    color: '#FF9E00',
                    borderColor: '#FF9E00'
                }
            },

            areaStyle: {
                opacity: 0.3,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(91, 143, 249, 1)' // 0% 处的颜色
                        },
                        {
                            offset: 0.5,
                            color: '#fff' // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#fff' // 100% 处的颜色
                        }
                    ],
                    global: false // 缺省为 false
                }
            }
        }
    ]
};
```

## 封装 环形进度条 组件例子

```js
<template>
    <div class="svgcontain">
        <svg width="100%" height="100%">
            <circle
                cx="50%"
                cy="50%"
                :r="radius"
                stroke="#F5F7F9"
                :stroke-width="strokeWidth"
                fill="none"
            ></circle>
            <circle
                cx="50%"
                cy="50%"
                :r="radius"
                stroke="#0F68EB"
                :stroke-width="strokeWidth"
                fill="none"
                class="path"
                stroke-dasharray="0 1069"
            ></circle>
        </svg>
        <div class="number">
            <span class="num">{{ fix2(displayNum) }}</span>
            <span class="unit">%</span>
        </div>
    </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js';
export default {
    name: 'circleProgress',
    data() {
        return {
            len: '',
            // 半径
            radius: 30,
            strokeWidth: 4,
            displayNum: 0
        };
    },
    props: {
        num: {
            type: Number,
            default: 33.33
        }
    },
    components: {},
    computed: {},
    created() {},
    watch: {},
    mounted() {
        this.$nextTick(() => {
            let circle = this.$el.querySelector('.path');
            let contain = this.$el;
            this.radius = contain.clientWidth / 2 - this.strokeWidth;
            let perimeter = 2 * Math.PI * this.radius;
            let percent = this.num / 100;
            if (this.num > 0) {
                circle.setAttribute('stroke-linecap', 'round');
            }
            circle.setAttribute(
                'stroke-dasharray',
                perimeter * percent + ' ' + perimeter * (1 - percent)
            );
            let tween = new TWEEN.Tween(this.$data);

            tween.to({ displayNum: this.num }, 800);
            tween.start();
            tween.onUpdate(() => {});

            function animate() {
                requestAnimationFrame(animate);
                TWEEN.update();
            }
            animate();
        });
    },
    methods: {
        fix2(val) {
            return (val - 0).toFixed(2);
        }
    }
};
</script>

<style lang="less" scoped>
.svgcontain {
    width: 100%;
    height: 100%;
    position: relative;
    .number {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 0;
        white-space: nowrap;
        .num {
            color: #0f68eb;
            font-size: 0.24rem;
            font-weight: bold;
            display: inline-block;
        }
        .unit {
            font-size: 0.2rem;
            color: #0f68eb;
            top: -0.02rem;
            position: relative;
            display: inline-block;
            transform: scale(0.8);
        }
    }
}
.svgcontain svg {
    transform: rotate(-180deg);
}
.path {
    transition: stroke-dasharray 0.8s ease-in-out;
}
</style>

```
