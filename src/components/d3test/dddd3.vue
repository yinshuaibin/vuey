<style scoped="true">
    .m-top {
/*
        border-bottom:1px solid red;
        border-left:1px solid red;
*/
        border-top:1px solid red;
        border-left:1px solid red;
        height: 10px;
        border-top-left-radius: 4px
    }
/*
    div.m-main:hover {
        border-bottom:3px solid red;
        border-left:3px solid red;
        border-top:3px solid red;
    }
*/
    .m-left {
        border-left:1px solid red;
        width: 1px
    }
    .m-bottom {
        border-bottom:1px solid red;
        border-left:1px solid red;
        height: 10px;
        border-bottom-left-radius: 4px
    }
    .m-main {
        position:absolute;
        width: 0px;
        height: 0px;
        cursor: pointer
/*
        border-bottom:1px solid red;
        border-left:1px solid red;
        border-top:1px solid red;
        border-radius: 6px
*/
    }
    div.m-top:hover {
        border-top:3px solid red;
    }
    div.m-left:hover {
        border-left: 3px solid red;
    }
    div.m-bottom:hover {
        border-bottom: 3px solid red;
    }
    .m-top-active {
        border-top:3px solid #f17c67;
        border-left:3px solid #f17c67;
        height: 10px;
        border-top-left-radius: 4px
    }
    .m-left-active {
        border-left:3px solid #f17c67;
    }
    .m-bottom-active {
        border-bottom:3px solid #f17c67;
        border-left:3px solid #f17c67;
        height: 10px;
        border-bottom-left-radius: 4px
    }
</style>
<template>
<div>
    <h1>d3测试页面</h1>
    <svg width="500" height="270">
        <g style="transform: translate(0, 10px)">
            <path :d="line" />
        </g>
    </svg>
    <div>
        <hr>
        <svg ref="oneSvg"></svg>
        <hr>
        <svg ref="twoSvg"></svg>
    </div>
</div>
</template>
<script>
import * as d3 from 'd3'
export default {
  props: {
    rect: {
      type: Object,
      default: function () {
        return { left: 0, top: 0, width: 0, height: 0 }
      }
    },
    startId: {
      type: String
    },
    endId: {
      type: String
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      data1: [99, 71, 78, 25, 36, 92],
      line: '',
      index: [0, 1, 2, 3, 4, 5],
      colorList: ['red', 'blue', 'green', 'yellow', 'black', 'orange'],
      zwidth: 500,
      zheight: 500,
      rectHeight: 60
    }
  },
  mounted () {
    this.calculatePath()
    this.makeZ()
    this.makeZ2()
  },
  methods: {
    getScales () {
      const x = d3.scaleTime().range([0, 430])
      const y = d3.scaleLinear().range([210, 0])
      d3.axisLeft().scale(x)
      d3.axisBottom().scale(y)
      x.domain(d3.extent(this.data1, (d, i) => i))
      y.domain([0, d3.max(this.data1, d => d)])
      return { x, y }
    },
    calculatePath () {
      const scale = this.getScales()
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d))
      this.line = path(this.data1)
    },
    makeZ () {
      // 线性比例尺,用来给柱状图的高度赋值
      var linear = d3.scaleLinear()
        .domain([0, d3.max(this.data1)])
        .range([0, this.zwidth])
      // 序数比例尺,用来给柱状图的颜色赋值
      var ordinal = d3.scaleOrdinal()
        .domain(this.index)
        .range(this.colorList)
      var oneSvg = d3.select(this.$refs.oneSvg)
      oneSvg.attr('width', this.zwidth)// 设定宽度
        .attr('height', this.rectHeight * this.data1.length + 5)// 设定高度
      oneSvg.selectAll('rect').data(this.data1).enter().append('rect')
        .attr('transform', (d, i) => 'translate(20,' + i * this.rectHeight + ')')
        // .attr('x', 20)
        // .attr('y', (d, i) => i * this.rectHeight)
        .attr('width', linear)
        .attr('height', this.rectHeight - 10)
        .attr('fill', ordinal)
    },
    makeZ2 () {
      var linear = d3.scaleLinear().domain([0, d3.max(this.data1)]).range([0, this.zwidth - 100])
      var yScale = d3.scaleOrdinal().domain(d3.range(this.data1.length)).range([0, this.zheight - 100])
      var xAxis = d3.axisBottom(linear)
      var yAxis = d3.axisLeft(yScale)
      var ordinal = d3.scaleOrdinal().domain(this.index).range(this.colorList)
      var twoSvg = d3.select(this.$refs.twoSvg)
      twoSvg.attr('width', this.zwidth).attr('height', this.rectHeight * this.data1.length + 30)
      var g = twoSvg.selectAll('g').data(this.data1).enter().append('g')
        .attr('transform', (d, i) => 'translate(60,' + i * this.rectHeight + ')')

      g.append('rect').attr('width', d => linear(d)).attr('height', d => this.rectHeight - 20)
        .attr('fill', d => ordinal(d))
      g.append('text').attr('x', d => linear(d) + 30).attr('y', this.rectHeight - 10)
        .attr('dy', '-0.3em').attr('fill', d => ordinal(d)).text(d => d).style('font-size', '28px')
      var g2 = twoSvg.append('g').attr('transform', 'translate(60,' + this.data1.length * this.rectHeight + ')')
      g2.call(yAxis).attr('font-size', '18px')
      g2.call(xAxis).attr('font-size', '18px')
    }
  }
}
</script>
